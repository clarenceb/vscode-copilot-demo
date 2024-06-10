# Tasks

Ensure you follow the prerequisites and setup instructions in the [README.md](README.md) file before starting the tasks.

Tasks are assumed to be completed in VSCode with the GitHub Copilot extension installed.
Some tasks use the CLI to run tests or start the app.

## Tasks to be completed by the Dev Persona

As a new developer on the team, you’ll be making some small changes to the existing Claims API with copilot and writing some unit tests.
You’ll also be using copilot to help you to understand the codebase and make some improvements.

**Note:**

* Make sure [this file](TASKS.md) is not open in VSCode when performing the tasks so that GitHub Copilot is not influenced by what’s in the file.


### TASK-DEV-1: Update app route "/" to return a JSON response that contains the message "Insurance claims API"

Run Jest tests in `index.test.ts` from the command-line (or from VScode using the Jest extension in the **Test Explorer**) to see the pending test:

```sh
cd dev-persona
npm test
```

See the pending test:

```typescript
xit('should return a JSON response with message "Insurance claims API"', async () => {
  ...
});
```
Change `xit` to `it` and see that the test fails.

Update the app route `/` to return a JSON response that contains the message "Insurance claims API".

Select the failing test and open GitHub Copilot Chat with `Ctrl+Shift+P` and type `GitHub Copilot: Chat`.

* Update my app in #file:index.ts so that it passes the tests in the #selection

Update your code in `index.ts` from:

```typescript
app.get("/", (req: Request, res: Response) => {
  // TASK-DEV-1: Return a JSON response that contains the message "Insurance claims API"
  res.send("TypeScript + Express server is running");
});
```

To:

```typescript
app.get("/", (req: Request, res: Response) => {
  // TASK-DEV-1: Return a JSON response that contains the message "Insurance claims API"
  res.status(200).json({ message: "Insurance claims API" });
});
```

Run the Jest tests again and they should pass.

### TASK-DEV-2: Use a better system prompt to parse the conversation by loading the improved prompt from a file

Update the TASK-DEV-2 test case from `xit` to `it` so that it runs - it should fail.

```typescript
xit('should be aware of the context of what is being said to properly identify the roles', async () => {
```

The system prompt used in `index.ts` is not very good since OpenAI cannot distinguish between the caller and agent roles.

You can also try this out using the REST Client file `dev-persona/claims-processing.http` to test the API (Send Request `Raw converation to parse.`).
Press `F5` to run the app in VSCode before running the REST Client.

Fix this issue by loading a better system prompt from the file `prompts/parse-prompt.txt`.

Select the code below in the file `dev-persona/src/index.ts`:

```typescript
// TASK-DEV-2: Use a better system prompt to parse the conversation by loading the improved prompt from a file (prompts/parse-prompt.txt).
const systemPrompt = `You are a help AI assistant that parses phone call transcripts containing a conversation between a Caller and an Agent.
  Identify which parts of the conversation are from the Caller and Agent.
  Separate each part of the conversation on a new line prefixed with either Caller: <text> or Agent: <text>
  Remove leading and trailing whitespace from each line before adding the Caller or Agent prefix.`
```

Open GitHub Copilot Chat and enter this prompt:

* I want to load my system prompt described in the #selection from the file #file:parse-prompt.txt instead of using an inline string.  Use the function getSystemPromptFilePath in my #editor to help.

Adjust the code as necessary (move the imports to the top and adjust the file path to the prompt file).

It shoulds look something like this:

```typescript
// TASK-DEV-2: Use a better system prompt to parse the conversation by loading the improved prompt from a file (prompts/parse-prompt.txt).

// Define the path to the prompt file
const promptFilePath = getPromptFilePath('parse-prompt.txt');

// Read the file content
const systemPrompt = fs.readFileSync(promptFilePath, 'utf8');
```

Run the units tests, they should pass.

Run the API and test it with the REST Client file `dev-persona/claims-processing.http`.

### TASK-DEV-3: Explain the highlighted code

Highlight some code and use copilot to explain:

```typescript
const { choices } = await client.getChatCompletions(
      deploymentName,
      messages, {
        temperature: 0.7,
        topP: 0.95,
        maxTokens: 1000,
        frequencyPenalty: 0,
        presencePenalty: 0
      });
```

### TASK-DEV-4: Document code with copilot

Highlight some code and use copilot to document (if you don't get a good explaination in the doc you can click the regenerate button):

```typescript
// TASK-DEV-4: Document the function below with copilot (highlight the code and use copilot to document).

function getSystemPromptFilePath(promptFileName: string): string {
  let promptFilePath = path.join(process.cwd(), '..', 'prompts', promptFileName);
  if (!fs.existsSync(promptFilePath)) {
    promptFilePath = path.join(__dirname, '..', '..', '..', 'prompts', promptFileName);
  }
  return promptFilePath;
}
```

### TASK-DEV-5: Ask Copilot Chat for workspace recommendations on additional test cases

Open GitHub Copilot Chat and ask for recommendations on additional test cases:

```typescript
// TASK-DEV-5: Open GitHub Copilot Chat and ask:
//    "@workspace walk me through tests I'm already covering in the express node API and then recommend any missing test cases that I can implement."
//
// Then insert one of the recommended test cases below (e.g. handling empty conversation string gracefully).
// Implement the code to make the test pass.
```

### (Optional) TASK-DEV-6: Fix project structure issues

Use GitHub Copilot for TASK-DEV-6 to help fix a project structure issue.

* Move the directory `dev-persona/src` to `./src` in the project root
* Change to the `dev-persona` directory (`cd dev-persona/`)
* Run `npm run start` to start the project
* See the error message in the console
* Open GitHub Copilot Chat with `Ctrl+Shift+P` and type `GitHub Copilot: Chat`
* Type the following prompt in the chat window:

```
@workspace when I run `npm run start` I get this error:

<paste the entire console output>

--

What's wrong?
```

* Make the suggested changes (move `./src` to `./dev-persona/src`)
* Run `npm start` to start the project
* No error messages should appear in the console

Implement a test case recommended by Copilot (e.g. handling empty conversation string gracefully).

## Tasks to be completed by the Tester Persona

As a tester on the team, you’ll be leading the development and testing of a new feature on the Claims API.
You’ll work closely with a developer to implement necessary changes in the Claims API to ensure your acceptance tests pass.

**Note:**

* Make sure [this file](TASKS.md) is not open in VSCode when performing the tasks so that GitHub Copilot is not influenced by what’s in the file.

### TASK-TESTER-1: Cucumber/Ruby - Create a feature for the new Claims API process endpoint

Update the Cucumber feature file in the `tester-persona\cucumber\features` folder called `claims-api.feature`.

Run the cucumber tests from CLI (or from VScode using the Cucumber extension in the **Test Explorer**):

```sh
cd tester-persona/cucumber
bundle exec cucumber
```

Review the user story in the file [`tester-persona/user-story.md`](./tester-persona/user-story.md).

Open **GitHub Copilot chat** and enter the prompt:

* @workspace Help me to create a Cucumber feature in Gherkin syntax to test the main acceptance criteria in the user story described in #file:user-story.md 

Sample Cucumber feature:

```gherkin
Feature: Claims API processing

  As a claims adjuster,
  I want to use the Claims API to summarise and extract key information from a claim report,
  So that I can quickly assess the claim and make a decision.

  Scenario: Process a claim report
    Given I have a claim report in plain text format
    When I send a POST request to "/process" with the claim report
    Then I should receive a 200 status code
    And the response should be in JSON format
    And the response should contain the following keys:
      | reason          |
      | cause           |
      | driver_names    |
      | insurance_number|
      | location        |
      | damages         |
      | summary         |
    And the "reason" should be a string
    And the "cause" should be a string
    And the "driver_names" should be an array
    And the "insurance_number" should be a string
    And the "location" should be a string
    And the "damages" should be an array
    And the "summary" should be a string
```

Refactor the Cucumber feature to look like this:

```gherkin
Feature: Claims API processing

  As a claims adjuster,
  I want to use the Claims API to summarise and extract key information from a claim report,
  So that I can quickly assess the claim and make a decision.

  Scenario: Process a claim report
    Given I have a claim report "claim1.raw.txt" in plain text format
    When I send a POST request to "/process" with the claim report
    Then I should receive a 200 status code
    And the response should be in JSON format
    And the response should include header "content-type" with value "application/json"
    And the response should contain the following keys:
      | reason          |
      | cause           |
      | driver_names    |
      | insurance_number|
      | location        |
      | damages         |
      | summary         |
    And the "reason" should be a string
    And the "cause" should be a string
    And the "driver_names" should be an array
    And the "insurance_number" should be a string
    And the "location" should be a string
    And the "damages" should be an array
    And the "summary" should be a string
```

Open GitHub Copilot chat and ask:

* @workspace create me the required cucumber steps in ruby in the file #file:claims_steps.rb to implement the claims processing cucumber feature. Assume the rest api endpoint http://localhost:3000/process already exists.

Sample output for `claims_steps.rb` file:

```ruby
# step_definitions/claims_steps.rb

# TASK-TESTER-1: Claims API /process endpoint
# 
# Claims API test steps to go in here.
# - REST API calls will use Faraday ruby gem
# - JSON parsing will use JSON ruby gem
# - Test assertions will use RSpec ruby gem

require 'faraday'
require 'json'
require 'rspec'

Given('I have a claim report {string} in plain text format') do |file_name|
    @file_path = File.join(File.dirname(__FILE__), '..', '..', '..', '..', 'transcripts', file_name)
    @claim_report = File.read(@file_path)
end
  
When('I send a POST request to {string} with the claim report') do |url|
    conn = Faraday.new(url: 'http://localhost:3000')
    @response = conn.post do |req|
        req.url '/process'
        req.headers['Content-Type'] = 'text/plain'
        req.body = @claim_report
    end
end

Then('I should receive a {int} status code') do |status_code|
    expect(@response.status).to eq(status_code)
end

Then('the response should be in JSON format') do
    @json_response = JSON.parse(@response.body)
    expect(@json_response).to be_a(Hash)
end

Then('the response should include header {string} with value {string}') do |header, value|
    expect(@response.headers[header]).to eq(value)
end

Then('the response should contain the following keys:') do |table|
    keys = table.raw.flatten
    keys.each do |key|
        expect(@json_response).to have_key(key)
    end
end

Then('the {string} should be a string') do |key|
    expect(@json_response[key]).to be_a(String)
end

Then('the {string} should be an array') do |key|
    expect(@json_response[key]).to be_a(Array)
end
```

Run the cucumber tests to see that they fail:

```sh
# Terminal 1
cd dev-persona
npm run dev

# Terminal 2
cd tester-persona/cucumber
bundle exec cucumber
```

Open the code file `dev-persona/src/index.ts` to implement of the `/process` endpoint:

Use GitHub Copilot Chat to assist you:

* @workspace help me create the required cucumber steps in ruby in the file #file:claims_steps.rb to implement the claims processing cucumber feature #file:claims-api.feature.  Assume the rest api endpoint http://localhost:3000/process already exists.

Sample code:

```typescript
app.post("/process", async (req: Request, res: Response) => {
  const conversationToProcess = req.body;

  const systemPrompt = `You are a help AI assistant that parses phone call transcripts containing a conversation between a Caller and an Agent.
    Identify which parts of the conversationion are from the Caller and Agent.
    Separate each part of the conversation on a new line prefixed with either Caller: <text> or Agent: <text>
    Remove leading and trailing whitespace from each line before adding the Caller or Agent prefix.`;

  const messages = [
    { role: "system", content: systemPrompt },
    { role: "user", content: conversationToProcess }
  ];

  const deploymentName = process.env.AZURE_OPENAI_API_DEPLOYMENT as string;

  try {
    const { choices } = await client.getChatCompletions(
      deploymentName,
      messages, {
        temperature: 0.7,
        topP: 0.95,
        maxTokens: 1000,
        frequencyPenalty: 0,
        presencePenalty: 0
      });
    const parsedConversation = JSON.parse(choices[0]?.message?.content ?? "{}");
    res.status(200).json(parsedConversation);
  } catch (error) {
    console.error("[server]: Error parsing conversation", error);
    res.status(500).send(`Error parsing conversation: ${JSON.stringify(error)}`);
  }
});
```

Update the system prompt to load from the file `prompts/parse-prompt.txt`:

```typescript
const systemPromptFilePath = getSystemPromptFilePath('process-prompt.txt');
const systemPrompt = fs.readFileSync(systemPromptFilePath, 'utf8');
```

Add the following line under the `app.use(...)` lines:

```typescript
app.use('/process', bodyParser.text({ type: '*/*' }));
```

Run the Cucumber tests again to see if they pass.  Repeat the process until all tests pass.

Update the step defition for checking the header:

```ruby
Then('the response should include header {string} with value {string}') do |header, value|
    expect(@response.headers[header]).to include(value)
end
```

Finally, test the endpoint using the REST Client file `tester-persona/claims-processing.http`.

### (Optional) TASK-TESTER-2: Playwright - Add a new test case to verify that the current todo counter is updated when a new todo item is added

Run the Playwright tests from CLI:

```sh
npx playwright test demo-todo-app.spec.ts --workers 1 --headed
npx playwright show-report
```

Or run the Playwright tests from VSCode Test Explorer:

* Show **Test Explorer** (click "Testing" icon in the Activity Bar or select "View" / "Testing" from the menu)
* Ensure that the Playwright tests are visible in the Test Explorer by click the ellipsis and checking "Playwright"
* Click "Show Browser" to display browser during test runs from VSCode
* Run the "`demo-todo-app.spec.ts`" test file from Test Explorer

Create a new test for the `Counter` feature and refactor the code to be more readable.

**Starting code**:

```typescript
test.describe('Counter', () => {
  test('should update the todo counter when an item is added', async ({ page }) => {
    // TASK-TESTER-2: Add a new test case to verify that the current todo counter is updated when a new TODO item is added.
  });
});
```

**Step 1** - record at cursor position

Record a new test and use GitHub Copilot to help write the test:

* Open file "tester-persona\playwright\tests\demo-todo-app.spec.ts"
* Place cursor after the `TASK-TESTER-2` comment
* Click "Record at cursor" in the Playwright testing toolbar
* Browse to `https://demo.playwright.dev/todomvc/#/`
* Click "What needs to be done?"
* Type "Buy milk" and press Enter
* Click "Assert text" from the testing toolbar
* Select the item count label
* Enter "1 item" and click the check mark to accept
* Click "What needs to be done?"
* Type "Buy bread" and press Enter
* Click "Assert text" from the testing toolbar
* Select the item count label
* Enter "2 items" and click the check mark to accept
* End the test recording by clicking the record circle

You should get code similar to the following:

```typescript
test.describe('Counter', () => {
  test('should update the todo counter when an item is added', async ({ page }) => {
    // TASK-TESTER-1: Add a new test case to verify that the current todo counter is updated when a new TODO item is added.
    await page.goto('https://demo.playwright.dev/todomvc/#/');
    await page.getByPlaceholder('What needs to be done?').click();
    await page.getByPlaceholder('What needs to be done?').fill('Buy milk');
    await page.getByPlaceholder('What needs to be done?').press('Enter');
    await expect(page.locator('body')).toContainText('1 item');
    await page.getByPlaceholder('What needs to be done?').click();
    await page.getByPlaceholder('What needs to be done?').fill('Buy bread');
    await page.getByPlaceholder('What needs to be done?').press('Enter');
    await expect(page.locator('body')).toContainText('2 items');
  });
});
```

* Refactor test code to be more readable and maintable

**Step 2** - refactor code to reduce repetition

Using GitHub Copilot inline assistance, highlight the code and type:

* refactor code to reduce repetition

```typescript
test.describe('Counter', () => {
  test('should update the todo counter when an item is added', async ({ page }) => {
    await page.goto('https://demo.playwright.dev/todomvc/#/');

    const newTodo = page.getByPlaceholder('What needs to be done?');
    const todoCounter = page.locator('body');

    await addTodoItem(page, newTodo, 'Buy milk');
    await expect(todoCounter).toContainText('1 item');

    await addTodoItem(page, newTodo, 'Buy bread');
    await expect(todoCounter).toContainText('2 items');
  });
});

async function addTodoItem(page: Page, newTodo: any, item: string) {
  await newTodo.click();
  await newTodo.fill(item);
  await newTodo.press('Enter');
}
```

**Step 3** - update to check the todo counter using the test id attribute "todo-count"

Using GitHub Copilot inline assistance, highlight the code and type:

* update to check the todo counter using the test id attribute "todo-count"

```typescript
test.describe('Counter', () => {
  test('should update the todo counter when an item is added', async ({ page }) => {
    await page.goto('https://demo.playwright.dev/todomvc/#/');

    const newTodo = page.getByPlaceholder('What needs to be done?');
    const todoCounter = page.getByTestId('todo-count');

    await addTodoItem(page, newTodo, 'Buy milk');
    await expect(todoCounter).toContainText('1 item');

    await addTodoItem(page, newTodo, 'Buy bread');
    await expect(todoCounter).toContainText('2 items');
  });
});

async function addTodoItem(page: Page, newTodo: any, item: string) {
  await newTodo.click();
  await newTodo.fill(item);
  await newTodo.press('Enter');
}
```

**Step 4** - add a Page Object Model to represent this page

Using GitHub Copilot inline assistance, highlight the code and type:

* add a Page Object Model to represent this page

```typescript
class TodoPage {
  private page: Page;
  private baseUrl: string;

  constructor(page: Page, baseUrl: string) {
    this.page = page;
    this.baseUrl = baseUrl;
  }

  async navigateTo() {
    await this.page.goto(this.baseUrl);
  }

  async addTodoItem(item: string) {
    const newTodo = this.page.getByPlaceholder('What needs to be done?');
    await newTodo.click();
    await newTodo.fill(item);
    await newTodo.press('Enter');
  }

  async getTodoCounterText() {
    const todoCounter = await this.page.getByTestId('todo-count');
    return await todoCounter.textContent();
  }
}

test.describe('Counter', () => {
  test('should update the todo counter when an item is added', async ({ page }) => {
    const baseUrl = 'https://demo.playwright.dev/todomvc/#/';
    const todoPage = new TodoPage(page, baseUrl);

    await todoPage.navigateTo();

    await todoPage.addTodoItem('Buy milk');
    expect(await todoPage.getTodoCounterText()).toContain('1 item');

    await todoPage.addTodoItem('Buy bread');
    expect(await todoPage.getTodoCounterText()).toContain('2 items');
  });
});
```

**Step 5** - update to default to the baseurl without me having tor pass it in

Using GitHub Copilot inline assistance, highlight the code and type:

* update to default to the baseurl without me having tor pass it in

```typescript
class TodoPage {
  private page: Page;
  private baseUrl: string;

  constructor(page: Page) {
    this.page = page;
    this.baseUrl = 'https://demo.playwright.dev/todomvc/#/';
  }

  async navigateTo() {
    await this.page.goto(this.baseUrl);
  }

  async addTodoItem(item: string) {
    const newTodo = this.page.getByPlaceholder('What needs to be done?');
    await newTodo.click();
    await newTodo.fill(item);
    await newTodo.press('Enter');
  }

  async getTodoCounterText() {
    const todoCounter = await this.page.getByTestId('todo-count');
    return await todoCounter.textContent();
  }
}

test.describe('Counter', () => {
  test('should update the todo counter when an item is added', async ({ page }) => {
    const todoPage = new TodoPage(page);

    await todoPage.navigateTo();

    await todoPage.addTodoItem('Buy milk');
    expect(await todoPage.getTodoCounterText()).toContain('1 item');

    await todoPage.addTodoItem('Buy bread');
    expect(await todoPage.getTodoCounterText()).toContain('2 items');
  });
});
```

**Step 6** - update todo page object model to verify count via its own method

Using GitHub Copilot inline assistance, highlight the code and type:

* update todo page object model to verify count via its own method

```typescript
class TodoPage {
  private page: Page;
  private baseUrl: string = 'https://demo.playwright.dev/todomvc/#/';

  constructor(page: Page) {
    this.page = page;
  }

  async navigateTo() {
    await this.page.goto(this.baseUrl);
  }

  async addTodoItem(item: string) {
    const newTodo = this.page.getByPlaceholder('What needs to be done?');
    await newTodo.click();
    await newTodo.fill(item);
    await newTodo.press('Enter');
  }

  async getTodoCounterText() {
    const todoCounter = await this.page.getByTestId('todo-count');
    return await todoCounter.textContent();
  }

  async verifyTodoCounter(expectedCount: number) {
    const counterText = await this.getTodoCounterText();
    expect(counterText).toContain(`${expectedCount} item${expectedCount === 1 ? '' : 's'}`);
  }
}

test.describe('Counter', () => {
  test('should update the todo counter when an item is added', async ({ page }) => {
    const todoPage = new TodoPage(page);

    await todoPage.navigateTo();

    await todoPage.addTodoItem('Buy milk');
    await todoPage.verifyTodoCounter(1);

    await todoPage.addTodoItem('Buy bread');
    await todoPage.verifyTodoCounter(2);
  });
});
```
