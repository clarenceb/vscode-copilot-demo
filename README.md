# vscode-copilot-demo

GitHub Copilot demo using VScode for tester and developer personas

## Developer Persona

### Pre-requisites

* [Azure](https://azure.microsoft.com/) account and subscription (for Azure OpenAI service)
* [VSCode](https://code.visualstudio.com/) - Windows, Linux, or Mac
* [vscode-jest](https://marketplace.visualstudio.com/items?itemName=Orta.vscode-jest) extension
* [GitHub Copilot](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot) extension (requires a [GitHub account](https://github.com/) and a [GitHub Copilot plan](https://github.com/features/copilot))
* (Optional) Node Version Manager (nvm) - [Windows](https://github.com/coreybutler/nvm-windows), [Linux/MacOS](https://github.com/nvm-sh/nvm)
* Node 18

```sh
nvm install 18
nvm use 18
node --version
# v18.20.3

# If you have issues switching to node 18, you can try the following:
# - Delete the directory C:\Program Files\nodejs
# - nvm use 18
# - nvm current
```

* Azure OpenAI service and model deployment

  - Create an Azure account and subscription
  - Create an OpenAI resource
  - Deploy a model for text completions (e.g. GPT-3.5-turbo)
  - Get the API key and endpoint

* Environment variables file configuration

  - Copy `.env-template` to `.env` and update the values.

### Install the project dependencies

```sh
cd dev-persona/ 
npm install
```

### (Optional) Task DEV-0 Fixing project issues

Use GitHub Copilot for Task DEV-0 to help fix a project structure issue.

* Move the directory `dev-persona/src` to `./src` in the project root
* Run `npm start` to start the project
* See the error message in the console
* Open GitHub Copilot Chat with `Ctrl+Shift+P` and type `GitHub Copilot: Chat` or press `Ctrl+Shift+i`
* Type the following prompt in the chat window:

```
@workspace when I run npm start I get this error:

<paste the entire console output>

--

What's wrong?
```

* Make the suggested changes (move `./src` to `./dev-persona/src`)
* Run `npm start` to start the project
* No error messages should appear in the console

### Unit tests

```sh
npm test
```

* Work through TASK DEV-1 to TASK DEV-5 using GitHub Copilot.

Follow steps in the [`TASKS.md`](./TASKS.md) **TASK DEV-1** to **TASK DEV-5** to complete the tasks.

## Tester Persona

### Pre-requisites

* Install dependencies for Playwright Framework on your local machine:

```sh
npm install -D @playwright/test
npx playwright install
npx playwright install-deps
npm install
```

* [Playwright](https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright) extension for VSCode

### Playwright

Run the Playwright tests from CLI:

```sh
npx playwright test demo-todo-app.spec.ts --workers 1 --headed
npx playwright show-report
```

Run the Playwright tests from VSCode Test Explorer:

* Show **Test Explorer** (click "Testing" icon in the Activity Bar or select "View" / "Testing" from the menu)
* Ensure that the Playwright tests are visible in the Test Explorer by click the ellipsis and checking "Playwright"
* Click "Show Browser" to display browser during test runs from VSCode
* Run the "`demo-todo-app.spec.ts`" test file from Test Explorer

**TASK TESTER-1: Add a new test case to verify that the current TODO counter is updated when a new TODO item is added**

Create a new test and refactor the code to be more readable.

Follow steps in the [`TASKS.md`](./TASKS.md) **TASK TESTER-1**  to complete this task.

Run the Playwright tests from CLI:

```sh
npx playwright test demo-todo-app.spec.ts --workers 1 --headed
```

### Cucumber/Ruby

**TASK TESTER-2: Implement the test scenarios to test the Claims API processing (see: `tester-persona\user-story.md`) using Cucumber and Ruby.**

Create new feature and steps files and refactor the code to be more readable.

Follow steps in the [`TASKS.md`](./TASKS.md) **TASK TESTER-2**  to complete this task.

Run the cucumber tests from CLI:

```sh
bundle exec cucumber
```

## Resources

* https://clemenssiebler.com/posts/using-azure-openai-service-for-processing-claim-calls/
* https://github.com/microsoft/openai-prompt-examples/blob/main/insurance/Information%20extraction%20from%20claim%20phone%20conversations.md
* [Playwright Docs - Getting Started / Installation](https://playwright.dev/docs/intro)
