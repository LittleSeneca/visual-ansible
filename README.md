# Visual-Ansible

A project for visualizing Ansible playbooks.

## Pre-requisites

- Node.js (v20+)
- Go (v1.21+)

## Installation

Before running the services, you need to install some dependencies.

### For the Backend

Navigate to the `backend` folder and run:

```bash
npm install cors
```

### For the Frontend and Root Project

Navigate to the root project folder and run:

```bash
npm install webpack webpack-cli webpack-dev-server html-webpack-plugin --save-dev
npm install @babel/core @babel/preset-env @babel/preset-react --save-dev
npm install react react-dom
```

## Running the Services

You'll need to start these services in the following order:

1. **Go Service**: Run the Go service from the root of the project folder.
    ```bash
    go run *.go
    ```

2. **Node.js Backend**: Navigate to the `backend` folder within the project folder and run:
    ```bash
    node index.js
    ```

3. **React Frontend**: From the root of the project folder, run:
    ```bash
    npm start
    ```

And there you go! Your project should now be up and running.