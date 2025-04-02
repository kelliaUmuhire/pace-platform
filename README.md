# Project Setup Guide

This README provides a step-by-step guide to set up and run the project.

## Prerequisites

Before you begin, ensure you have the following installed on your system:
- [Node.js](https://nodejs.org/) (version 22.14.0 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) (depending on the package manager you prefer)
- [Git](https://git-scm.com/) (for cloning the repository)

## Steps to Set Up the Project

1. **Clone the Repository**  
    Open your terminal and run the following command to clone the repository:
    ```bash
    git clone https://github.com/kelliaUmuhire/pace-platform.git
    ```

2. **Navigate to the Project Directory**  
    Change into the project directory:
    ```bash
    cd pace-platform
    ```

3. **Install Dependencies**  
    Install the required dependencies using npm or yarn:
    ```bash
    npm install
    ```
    Or, if you prefer yarn:
    ```bash
    yarn install
    ```

4. **Set Up Environment Variables**  
    Create a `.env` file in the root directory of the project and configure the required environment variables. Refer to the `.env.example` file for the list of variables needed:
    ```bash
    cp .env.example .env
    ```
    Open the `.env` file and update the values as needed.

5. **Start the Development Server**  
    Start the development server with the following command:
    ```bash
    npm start
    ```
    Or, if using yarn:
    ```bash
    yarn start
    ```

7. **Access the Application**  
    Open your browser and navigate to `http://localhost:3000` to access the application.

## Additional Notes

- **Linting**: To check for linting issues, use:
  ```bash
  npm run lint
  ```
  Or:
  ```bash
  yarn lint
  ```

- **Building for Production**: To build the project for production, use:
  ```bash
  npm run build
  ```
  Or:
  ```bash
  yarn build
  ```

## Troubleshooting

If you encounter any issues during setup, consider the following:
- Ensure all prerequisites are installed and up-to-date.
- Verify that the `.env` file is correctly configured.
- Check the project's documentation or open an issue in the repository for further assistance.