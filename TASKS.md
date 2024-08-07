# Tasks

Ensure you follow the prerequisites and setup instructions in the [README.md](README.md) file before starting the tasks.

Tasks are assumed to be completed in VSCode with the GitHub Copilot extension installed.
Some tasks use the CLI to run tests or start the app.

## Tasks to be completed by the Dev Persona

As a new developer on the team, you’ll be making some small changes to the existing Claims API with copilot and writing some unit tests.
You’ll also be using copilot to help you to understand the codebase and make some improvements.

**Note:**

* Make sure [this file](TASKS.md) is not open in VSCode when performing the tasks so that GitHub Copilot is not influenced by what’s in the file.
* Better yet, delete [this file](TASKS.md) from the local repo (but don’t check-in that change) and refer to [TASKS.md](TASKS.md) in your browser from GitHub.

### TASK-DEV-1: Update app route "/" to return a JSON response that contains the message "Insurance claims API"

Run Jest tests in `index.test.ts` from the command-line (or from VScode using the Jest extension in the **Test Explorer**) to see the pending test:

```sh
cd dev-persona
npm test
```

Find the pending test:

```typescript
xit('should return a JSON response with message "Insurance claims API"', async () => {
  ...
});
```
Change `xit` to `it` so that the test can be run. The test will fail.

Update the app route `/` to return a JSON response that contains the message "Insurance claims API".

Select the failing test and open GitHub Copilot Chat with `CTRL+ALT+I`.

* Update my app in **#file:index.ts** so that it passes the tests in the **#selection**

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

Run the Jest tests again and they should now pass.

### TASK-DEV-2: Use a better system prompt to parse the conversation by loading the improved prompt from a file

Update the **TASK-DEV-2** test case from `xit` to `it` so that it runs - it should fail.

```typescript
xit('should be aware of the context of what is being said to properly identify the roles', async () => {
```

The system prompt used in `index.ts` is not very good since OpenAI cannot distinguish between the caller and agent roles.

You can also try this out using the REST Client file `dev-persona/claims-processing.http` to test the API (click on **Send Request** for the request `Raw converation to parse.`).
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

* I want to load my system prompt described in the **#selection** from the file **#file:parse-prompt.txt** instead of using an inline string.  Use the function getSystemPromptFilePath in my **#editor** to help.

Adjust the code as necessary (move the imports to the top and adjust the file path to the prompt file).

It should look similar to the code below:

```typescript
// TASK-DEV-2: Use a better system prompt to parse the conversation by loading the improved prompt from a file (prompts/parse-prompt.txt).

// Define the path to the prompt file
const promptFilePath = getPromptFilePath('parse-prompt.txt');

// Read the file content
const systemPrompt = fs.readFileSync(promptFilePath, 'utf8');
```

Run the units tests, they should now pass.

Run the API (`F5`) and test it with the REST Client file `dev-persona/claims-processing.http`.

### TASK-DEV-3: Explain the highlighted code

Highlight some code (e.g. in the `/parse_conversation` function in `index.ts`):

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

Right-click and select **Copilot** / **Explain This** to get an explanation of what the code is doing.

### TASK-DEV-4: Document code with copilot

Highlight some code (e.g. in the `getSystemPromptFilePath` function in `index.ts`):

```typescript
function getSystemPromptFilePath(promptFileName: string): string {
  let promptFilePath = path.join(process.cwd(), '..', 'prompts', promptFileName);
  if (!fs.existsSync(promptFilePath)) {
    promptFilePath = path.join(__dirname, '..', '..', '..', 'prompts', promptFileName);
  }
  return promptFilePath;
}
```

Right-click and select **Copilot** / **Generate Docs** to create documentation.  If you don't get a good explaination in the doc you can click the regenerate button or use the `/doc` command in the inline chat and add some additional context to help GitHub Copilot generate a better description, e.g. "`/doc` explain what this code does based on how it is run".

### TASK-DEV-5: Ask Copilot Chat for workspace recommendations on additional test cases

Open GitHub Copilot Chat and ask for recommendations on additional test cases:

* **@workspace** walk me through tests I'm already covering in the express node API and then recommend any missing test cases that I can implement.

Choose one of the test cases to implement, e.g. handling an empty conversation:

* **@workspace** help me implement a unit test for handling an empty conversation in the test file #file:index.test.ts and show me how to implement the code to pass the test in #file:index.ts 

If your suggested test and implementation returns a HTTP 200, you can ask GitHub Copilot to fix it in the existing chat:

* I want a HTTP 400 bad request to be return for an empty conversation not a HTTP 200, please rewrite the code above.

Open `index.test.ts` then hover over the suggested **Test Implementation** and click **Apply in Editor** (`CTRL + ENTER`).

```typescript
// TASK DEV-5: Open GitHub Copilot Chat and ask:
//    "@workspace walk me through tests I'm already covering in the express node API and then recommend any missing test cases that I can implement."
//
// Then insert one of the recommended test cases below (e.g. handling empty conversation string gracefully).
// Implement the code in `index.ts` to make the test pass.

it('should handle empty conversation string gracefully', async () => {
    const emptyConversation = ``;

    const response = await request(app)
        .post('/parse_conversation')
        .send(emptyConversation);

    expect(response.statusCode).toEqual(400);
    expect(response.text).toEqual('Conversation cannot be empty');
});
```

Run the tests and you should get a failure since the implementation does not yet return HTTP 400 for an empty conversation.

Open `index.ts` then hover over the suggested **Code Implementation** and click **Apply in Editor** (`CTRL + ENTER`).

The code should be added at the top of the `/parse_conversation` function:

```typescript
app.post("/parse_conversation", async (req: Request, res: Response) => {
  const conversationToParse = req.body;

  // Check if the conversation string is empty
  if (!conversationToParse.trim()) {
    return res.status(400).send('Conversation cannot be empty');
  }
  ...
```

Re-run the tests and they should now pass since HTTP 400 is being returned for an empty conversation.

### (Optional) TASK-DEV-6: Fix project structure issues

Use GitHub Copilot for TASK-DEV-6 to help fix a project structure issue.

* Move the directory `dev-persona/src` to `./src` in the project root
* Change to the `dev-persona` directory (`cd dev-persona/`)
* Run `npm run start` to start the project
* See the error message in the console
* Open GitHub Copilot Chat with `CTRL+ALT+I`
* Type the following prompt in the chat window:

```
@workspace when I run `npm run start` I get this error:

<paste the entire console output>

--

What's wrong?
```

* Make the suggested changes (move `./src` to `./dev-persona/src`)
* Run `npm run start` to start the project
* No error messages should appear in the console

## Tasks to be completed by the Tester Persona

As a tester on the team, you’ll be leading the development and testing of a new feature on the Claims API.
You’ll work closely with a developer to implement necessary changes in the Claims API to ensure your acceptance tests pass.

**Note:**

* Make sure [this file](TASKS.md) is not open in VSCode when performing the tasks so that GitHub Copilot is not influenced by what’s in the file.
* Better yet, delete [this file](TASKS.md) from the local repo (but don’t check-in that change) and refer to [TASKS.md](TASKS.md) in your browser from GitHub.

### TASK-TESTER-1: Cucumber/Ruby - Create a feature for the new Claims API process endpoint

Review the user story in the file [`tester-persona/user-story.md`](./tester-persona/user-story.md).

Open **GitHub Copilot chat** and enter the prompt:

* **@workspace** Help me to create a Cucumber feature in Gherkin syntax to test the happy path for the main acceptance criteria in the user story described in **#file:user-story.md**. At the top of the feature before the scenario, add a description (As a... I want to... So that...).

Sample Cucumber feature:

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
	And the response body should contain the following keys with their respective types:
	  | Key               | Expected Type |
	  | reason            | String        |
	  | cause             | String        |
	  | driver_names      | Array         |
	  | insurance_number  | String        |
	  | location          | String        |
	  | damages           | Array         |
```

Your version may look different due to the non-deterministic nature of using GenAI to assist writing code. Feel free to tweak the generated feature / scenario with follow-up prompts

Hover over the suggested changes and click **Apply in Editor** (`CTRL` + `ENTER`) to apply the changes into the empty `tester-persona\cucumber\features\claims-api.feature` file (or just copy and paste them into your feature file and edit it by hand).

Open GitHub Copilot Chat and ask for help with implementing the cucumber steps in Ruby:

* **@workspace** help me create the required cucumber steps in ruby in the file **#file:claims_steps.rb** to implement the claims processing cucumber feature **#file:claims-api.feature**.  Assume the rest api endpoint http://localhost:3000/process already exists.

Sample output for `claims_steps.rb` file (after some refactoring):

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

# Add the following step definitions to claims_steps.rb to implement the Claims API processing feature

Given('I have a claim report {string} in plain text format') do |filename|
  @claim_report = File.read(File.join(__dir__, "../../../../transcripts", filename))
  expect(@claim_report).not_to be_empty
end

When('I send a POST request to {string} with the claim report') do |path|
  @response = Faraday.post("http://localhost:3000#{path}") do |req|
    req.headers['Content-Type'] = 'text/plain'
    req.body = @claim_report
  end
end

Then('I should receive a {int} status code') do |status_code|
  expect(@response.status).to eq(status_code)
end

And('the response should be in JSON format') do
  @json_response = JSON.parse(@response.body)
  expect(@json_response).to be_a(Hash)
end

And('the response should include header {string} with value {string}') do |header, value|
  expect(@response.headers[header]).to include(value)
end

And('the response body should contain the following keys with their respective types:') do |table|
  # table is a Cucumber::MultilineArgument::DataTable
  table.hashes.each do |row|
    expect(@json_response).to have_key(row['Key'])
    case row['Expected Type']
    when 'String'
      expect(@json_response[row['Key']]).to be_a(String)
    when 'Array'
      expect(@json_response[row['Key']]).to be_a(Array)
    else
      raise "Unsupported type: #{row['Expected Type']}"
    end
  end
end
```

Run the Claims API and the cucumber tests in separate windows to see that the tests fail:

```sh
# Terminal 1
cd dev-persona
npm run dev

# Terminal 2
cd tester-persona/cucumber
bundle exec cucumber
```

The cucumber tests should fail with a HTTP 404 since the `/process` endpoint does not exist.  We have not implemented the `/process` endpoint in the Claims API.

Open the code file `dev-persona/src/index.ts` to implement of the `/process` endpoint:

Use GitHub Copilot Chat to assist you:

* **@workspace** help me implement the POST /process endpoint in my api **#file:index.ts** keeping a similar style to the existing /parse_conversation endpoint. Use the requirements described in the user story **#file:user-story.md** to guide you. Assume that the Azure OpenAI chat completions endpoint produces a JSON formatted string with the required keys when the **#file:process-prompt.txt** file is used as grounding. So, just convert that to a json object. 

Sample code:

```typescript
app.post("/process", async (req: Request, res: Response) => {
  const conversationToProcess = req.body;

  // Check if the conversation string is empty
  if (!conversationToProcess.trim()) {
    return res.status(400).send('Conversation cannot be empty');
  }

  // Load the system prompt for processing the conversation from the file
  const systemPromptFilePath = getSystemPromptFilePath('process-prompt.txt');
  const systemPrompt = fs.readFileSync(systemPromptFilePath, 'utf8');
  
  const messages = [
    { role: "system", content: systemPrompt },
    { role: "user", content: conversationToProcess }
  ];

  const deploymentName = process.env.AZURE_OPENAI_API_DEPLOYMENT as string;

  try {
    // Use Azure OpenAI to process the conversation
    const { choices } = await client.getChatCompletions(
      deploymentName,
      messages, {
        temperature: 0.7,
        topP: 0.95,
        maxTokens: 1000,
        frequencyPenalty: 0,
        presencePenalty: 0
      });
    
    // Assuming the Azure OpenAI returns a JSON formatted string, parse it
    const processedConversation = JSON.parse(choices[0]?.message?.content ?? "{}");

    // Return the processed conversation as JSON
    res.status(200).json(processedConversation);
  } catch (error) {
    console.error("[server]: Error processing conversation", error);
    res.status(500).send(`Error processing conversation: ${JSON.stringify(error)}`);
  }
});
```
**Important:** Add the following line under the `app.use(...)` lines:

```typescript
app.use('/process', bodyParser.text({ type: '*/*' }));
```

Run the Cucumber tests again to see if they pass.  If not, make any required changes and repeat the process until all tests pass.

After making your changes, test the `/process` endpoint to see the results interactively.
Use `claims-processing.http` (requires REST Client extension) to execute the `/process` request.

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
