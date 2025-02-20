const prompt = require("prompt-sync")();
const axios = require("axios");

async function main() {
  const username = prompt("Enter your GitHub username: ");
  const token = prompt("Enter your GitHub Personal Access Token: ", {
    echo: "*",
  });
  const repos = await fetchAllRepos(username, token);
  if (repos.length === 0) {
    console.log("No repositories found.");
    return;
  }
  const action = prompt(
    "Do you want to make the repositories (1) Public or (2) Private? Enter 1 or 2: "
  );

  const filteredRepos = filterReposByAction(repos, action);
  if (filteredRepos.length === 0) {
    console.log(
      `No ${
        action === "1" ? "public" : "private"
      } repositories found to change visibility.`
    );
    return;
  }

  const selectedRepos = await selectReposToChangeVisibility(
    filteredRepos,
    action
  );
  await changeRepoVisibility(selectedRepos, username, token, action);
}

async function fetchAllRepos(username, token) {
  try {
    const response = await axios.get("https://api.github.com/user/repos", {
      auth: { username, password: token },
      params: { per_page: 100 },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error(
        "Error fetching repositories:",
        error.response.status,
        error.response.data
      );
    } else if (error.request) {
      console.error("No response received:", error.request);
    } else {
      console.error("Error setting up the request:", error.message);
    }
    throw error;
  }
}

function filterReposByAction(repos, action) {
  return repos.filter((repo) =>
    action === "1" ? repo.private : !repo.private
  );
}

async function selectReposToChangeVisibility(repos, action) {
  const actionText = action === "1" ? "public" : "private";
  console.log(
    `Select repositories to make ${actionText} (comma-separated numbers):`
  );
  repos.forEach((repo, index) => {
    console.log(`${index + 1}: ${repo.name}`);
  });

  const selectedIndices = prompt(
    `Enter the numbers of the repositories you want to make ${actionText}: `
  );
  const selected = selectedIndices
    .split(",")
    .map((num) => repos[parseInt(num) - 1])
    .filter(Boolean);
  return selected;
}

async function changeRepoVisibility(repos, username, token, action) {
  const isMakingPublic = action === "1";
  for (const repo of repos) {
    await axios.patch(
      `https://api.github.com/repos/${username}/${repo.name}`,
      {
        private: !isMakingPublic,
      },
      {
        auth: { username, password: token },
      }
    );
    console.log(`Made ${repo.name} ${isMakingPublic ? "public" : "private"}.`);
  }
}

main().catch((err) => console.error(err));
