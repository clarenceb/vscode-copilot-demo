# vscode-copilot-demo

GitHub Copilot demo using VScode for tester and developer personas.

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
  - Create an OpenAI resource (NOTE: this is the only resource in the demo that will incur costs)
  - Deploy a model for text completions (e.g. GPT-3.5-turbo)
  - Get the API key and endpoint

* Environment variables file configuration

  - Copy `.env-template` to `.env` and update the values.

### Install the project dependencies

```sh
cd dev-persona/ 
npm install
```

### Dev persona tasks

* Work through TASK-DEV-1 to TASK-DEV-6 using GitHub Copilot.

Follow steps in the [`TASKS.md`](./TASKS.md) **TASK-DEV-0** to **TASK-DEV-5** to complete the tasks.

## Tester Persona

### Pre-requisites

For **TASK-TESTER-1**:

* Install [Ruby language](https://www.ruby-lang.org/en/downloads/) and then bundler gem:

```sh
ruby -v
# ruby 3.3.2 (2024-05-30 revision e5a195edf6) [x64-mingw-ucrt]
gem install bundler
cd tester-persona/
bundle install
```

* Install [Cucumber](https://marketplace.visualstudio.com/items?itemName=CucumberOpen.cucumber-official) extension for VSCode
* Install [Ruby LSP](https://marketplace.visualstudio.com/items?itemName=Shopify.ruby-lsp) extension for VSCode

For **TASK-TESTER-2** (Optional):

* Install dependencies for Playwright Framework on your local machine:

```sh
npm install -D @playwright/test
npx playwright install
npx playwright install-deps
npm install
```

* Install [Playwright](https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright) extension for VSCode

### Tester persona tasks

* Work through TASK-TESTER-1 to TASK-TESTER-2 using GitHub Copilot.

Follow steps in the [`TASKS.md`](./TASKS.md) **TASK-TESTER-1** to **TASK-TESTER-2** to complete the tasks.

## Resources

* [Using Azure OpenAI Service for processing claim calls](https://clemenssiebler.com/posts/using-azure-openai-service-for-processing-claim-calls/) - insipiration for most of this demo
* [Information extraction from claim phone conversations](https://github.com/microsoft/openai-prompt-examples/blob/main/insurance/Information%20extraction%20from%20claim%20phone%20conversations.md) - OpenAI prompt examples for Insurance
* [Playwright Docs - Getting Started / Installation](https://playwright.dev/docs/intro)
* [Cucumber](https://cucumber.io/docs/cucumber/) - Cucumber reference documentation
* [Cucumber-Ruby](https://github.com/cucumber/cucumber-ruby) - GitHub repository for Cuucmber-Ruby with examples
* [Bundler](https://bundler.io/) - Bundler documentation
* [Ruby](https://www.ruby-lang.org/en/documentation/) - Ruby documentation
