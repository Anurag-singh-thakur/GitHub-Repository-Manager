# GitHub Repository Manager

A simple Node.js script that allows users to manage their GitHub repositories directly from the terminal. Users can authenticate using a Personal Access Token and choose to make their repositories public or private.

## Features

- Authenticate using GitHub Personal Access Token.
- Fetch and display all repositories (public and private).
- Select repositories to change visibility (public/private).

## Prerequisites

- Node.js installed on your machine.
- A GitHub account with a Personal Access Token (PAT) that has `repo` scope enabled.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Anurag-singh-thakur/GitHub-Repository-Manager.git
   cd GitHub-Repository-Manager
   ```

2. Install the required packages:
   ```bash
   npm install prompt-sync axios
   ```

## Usage

1. Run the script:
   ```bash
   node main.js
   ```

2. Follow the prompts to enter your GitHub username and Personal Access Token.

3. Choose whether to make repositories public or private and select the repositories you want to modify.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the MIT License.