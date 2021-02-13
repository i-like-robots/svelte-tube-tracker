# Svelte Tube tracker

See the [about section](#about) to find out more about the app or jump to the [getting started](#getting-started) to run the website on your machine.

---

-   [About](#about)
-   [Getting started](#getting-started)
-   [Troubleshooting](#troubleshooting)

---

## About

### Requirements

To get started on working with the app, you'll need to make sure you have the following software tools installed.

1. [Git](https://git-scm.com/)
2. [Node.js](https://nodejs.org/en/) (version 14 or higher is required)
3. [npm](http://npmjs.com/)

Please note that this project has only been tested in Mac and Linux environments. If you are on a Mac you may find it easiest to install the [Command Line Tools](https://developer.apple.com/download/more/) package which includes Git.

### Project setup

1. Clone the Git repository and change to the new directory that has been created:

    ```bash
    git clone git@github.com:i-like-robots/svelte-tube-tracker
    cd svelte-tube-tracker
    ```

2. Install all of the project dependencies using npm:

    ```bash
    npm install
    ```

3. Copy the `.env` example file and enter the required secrets such as API keys:

    ```bash
    cp .env.example .env && open .env
    ```

4. You can now start and visit the running application using the [Vercel CLI](https://vercel.com/docs/cli):

    ```bash
    npx vercel dev
    ```
