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

### [Task 0 - Optional] Fixing project issues

Use GitHub Copilot for Task 0 to help fix a project structure issue.

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

* Work through Tasks 1 to 5 using GitHub Copilot.

## Tester Persona

## Agenda

```
(20 mins) Demo 2 - Deep dive on the testing persona (day in the life, scenarios) - Clarence
  * (10 min) Dev Persona: Unit/integration testing - pro-code (Ruby, Java, JS, etc.)
    * Scenario - I am assigned a bug to fix
    * Generate tests from code
    * Explain code - I need to fix a bug in an area that I'm unfamiliar with
    * Create documentation (functions, modules, etc.)
    * @workspace, walk me through tests I'm already covering in the project + recommend me other test cases?
  * (10 min) Tester Persona: BDD - functional or acceptance testing (Cucumber + Ruby) - Gherkin, Steps, Page Model
    * Expand requirements/user story into acceptance criteria
    * Map generic acceptance criteria to BDD (e.g. Gherkin syntax for cucumber)
    * Create documentation
    * Refactoring test code - e.g. DRY/refactoring, extract Page Models, etc.
```

## Resources

* https://clemenssiebler.com/posts/using-azure-openai-service-for-processing-claim-calls/
* https://github.com/microsoft/openai-prompt-examples/blob/main/insurance/Information%20extraction%20from%20claim%20phone%20conversations.md
