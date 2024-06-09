# Tasks

Ensure you follow the prerequisites and setup instructions in the [README.md](README.md) file before starting the tasks.

Tasks are assumed to be completed in VSCode with the GitHub Copilot extension installed.
Some tasks use the CLI to run tests or start the app.

## Tasks to be completed by the Dev Persona

### (Optional) TASK-DEV-0: Fix project structure issues

Use GitHub Copilot for TASK-DEV-0 to help fix a project structure issue.

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

From:

```typescript
app.get("/", (req: Request, res: Response) => {
  // TASK DEV-1: Return a JSON response that contains the message "Insurance claims API"
  res.send("TypeScript + Express server is running");
});
```

To:

```typescript
app.get("/", (req: Request, res: Response) => {
  // TASK DEV-1: Return a JSON response that contains the message "Insurance claims API"
  res.status(200).json({ message: "Insurance claims API" });
});
```

Run the Jest tests again and they should pass.

### TASK-DEV-2: Use a better system prompt to parse the conversation by loading the improved prompt from a file

Select the code below in the file `dev-persona/src/index.ts`:

```typescript
// TASK DEV-2: Use a better system prompt to parse the conversation by loading the improved prompt from a file (prompts\parse-prompt.txt).
const systemPrompt = `You are a help AI assistant that parses phone call transcripts containing a conversation between a Caller and an Agent.
   Identify which parts of the conversationion are from the Caller and Agent.
   Separate each part of the conversation on a new line prefixed with either Caller: <text> or Agent: <text>
   Remove leading and trailing whitespace from each line before adding the Caller or Agent prefix.`
```

Open GitHub Copilot Chat and enter this prompt:

* I want to load my system prompt from a file as described in the #selection .  Use that prompt instead of an inline string.

Adjust the code as necessary.

Modify the `xit` to be `it` in the test file `dev-persona\tests\index.test.ts` so that the test case runs.

Run the units tests, they should pass.

Run the API and test it with the REST Client file `dev-persona/claims-processing.http`.

### TASK-DEV-3: Explain the highlighted code

Highlight some code and use copilot to explain:

```typescript
function trimConversation(conversation: string) {
  return conversation.split('\n').map(line => line.trim()).join('\n');
}
```

### TASK-DEV-4: Document code with copilot

Highlight some code and use copilot to document:

```typescript
// TASK DEV-4: Document this code with copilot (highlight the code and use copilot to document).
function trimConversation(conversation: string) {
  return conversation.split('\n').map(line => line.trim()).join('\n');
}
```

### TASK-DEV-5: Ask Copilot Chat for workspace recommendations on additional test cases

Open GitHub Copilot Chat and ask for recommendations on additional test cases:

```typescript
// TASK DEV-5: Open GitHub Copilot Chat and ask:
//    "@workspace, walk me through tests I'm already covering in the project + recommend me other test cases?"
//
// Then insert one of the recommended test cases below (e.g. handling empty conversation string gracefully).
// Implement the code to make the test pass.
```

Implement a test case recommended by Copilot (e.g. handling empty conversation string gracefully).

## Tasks to be completed by the Tester Persona

### TASK-TESTER-1: Playwright - Add a new test case to verify that the current todo counter is updated when a new todo item is added

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
    // TASK-TESTER-1: Add a new test case to verify that the current todo counter is updated when a new TODO item is added.
  });
});
```

**Step 1** - record at cursor position

Record a new test and use GitHub Copilot to help write the test:

* Open file "tester-persona\playwright\tests\demo-todo-app.spec.ts"
* Place cursor after the `TASK-TESTER-1` comment
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

### TASK-TESTER-2 - Cucumber/Ruby - Create a feature for the new Claims API process endpoint

Update the Cucumber feature file in the `tester-persona\cucumber\features` folder called `claims-api.feature`.

Run the cucumber tests from CLI (or from VScode using the Cucumber extension in the **Test Explorer**):

```sh
bundle exec cucumber
```

Open GitHub Copilot chat and use the prompt:

* Help me to create a Cucumber feature in Gherkin syntax using the user story described in #file:user-story.md 

```gherkin
Feature: Claims API processing

  As a claims adjuster,
  I want to use the Claims API to summarise and extract key information from a claim report,
  So that I can quickly assess the claim and make a decision.

  Scenario: Process a claim report
    Given a new REST endpoint at "/process" that accepts a POST request with a "plain/text" body containing the phone conversation
    When the POST request is sent with the following conversation:
      """
      Caller: Hello, I'd like to report a car accident.
      Agent: Sure, what happened?
      Caller: I was driving on Main Street when I hit another car.
      Agent: Was anyone injured?
      Caller: No
      Agent: What caused the accident?
      Caller: The road was slippery.
      """
    Then the response should be in JSON format with "Content-Type: application/json"
    And the response should contain the following keys with their corresponding values:
      | key              | value                          |
      | reason           | Car accident                   |
      | cause            | Slippery road                  |
      | driver_names     | ["John Doe", "Jane Doe"]       |
      | insurance_number | 123456                         |
      | location         | Main Street                    |
      | damages          | ["Front bumper", "Rear bumper"]|
      | summary          | "Two drivers, John and Jane Doe, were involved in a car accident on Main Street. The cause of the accident was a slippery road. The damages were to the front and rear bumpers." |
    And if a field cannot be determined or is unspecified, it should be set to empty string ("")
    And for an array field, if no values can be determined or is unspecified, it should be set to an empty array ([])
```

Refactor the Cucumber feature to look like this:

```gherkin
Feature: Claims API processing

  As a claims adjuster,
  I want to use the Claims API to summarise and extract key information from a claim report,
  So that I can quickly assess the claim and make a decision.

  Scenario: Process a claim report
    Given a parsed claims transcript contained in file "claim1.parsed.txt"
    When the transcript is processed
    Then the response should have content type "application/json"
    And the response should contain the following keys with their corresponding values:
      | key              | value                            |
      | reason           | "car accident"                   |
      | cause            | ""                               |
      | driver_names     | ["Sarah Standl", "John Radley"]  |
      | insurance_number | "546452"                         |
      | location         | "I-18 freeway"                   |
      | damages          | ["headlights", "airbags"]        |
      | summary          | "accident"                       |
```

Open GitHub Copilot chat and ask:

* "@workspace create me the required cucumber steps in ruby in the file #file:claims_steps.rb to implement the claims processing cucumber feature. Assume the rest api endpoint /process exists."

Sample output for `claims_steps.rb` file:

```ruby
require 'faraday'
require 'json'
require 'rspec'

Given('a parsed claims transcript contained in file {string}') do |file_name|
  @file_path = File.join(File.dirname(__FILE__), '..', '..', '..', '..', 'transcripts', file_name)
  @transcript = File.read(@file_path)
end

When('the transcript is processed') do
  conn = Faraday.new(url: 'http://localhost:3000')
  @response = conn.post do |req|
    req.url '/process'
    req.headers['Content-Type'] = 'text/plain'
    req.body = @transcript
  end

  @processed_transcript = JSON.parse(@response.body)
end

Then('the response should have content type {string}') do |content_type|
  expect(@response.headers['Content-Type']).to include(content_type)
end

And('the response should contain the following keys with their corresponding values:') do |table|
  table.hashes.each do |row|
    expected_key = row['key']
    expected_value = JSON.parse(row['value'])

    if expected_value.is_a?(String)
        expect(@processed_transcript[expected_key]).to include(expected_value)
    else
        expected_value.each do |value|
            expect(@processed_transcript[expected_key].join(",")).to include(value)
        end
    end
  end
end
```

Open the code file `dev-persona/src/index.ts` to implement of the `/process` endpoint:

Use GitHub Copilot to assist you.

Sample code:

```typescript
app.post("/process", async (req: Request, res: Response) => {
  // TASK TESTER-2: Implement the /process endpoint to process a conversation using the Azure OpenAI API.

  const conversationToProcess = req.body;

  const promptsDir = process.env.PROMPTS_DIR as string;
  const systemPrompt = fs.readFileSync(`${promptsDir}/process-prompt.txt`, 'utf8');

  const messages = [
    { role: "system", content: systemPrompt },
    { role: "user", content: conversationToProcess }
  ];

  const deploymentName = process.env.AZURE_OPENAI_API_DEPLOYMENT as string;

  try {
    const { choices } = await client.getChatCompletions(deploymentName, messages);
    const processedConversation = choices[0]?.message?.content ?? "<unable to process conversation>";
    const parsedConversation = JSON.parse(processedConversation);
    res.status(200).json(parsedConversation);
  } catch (error) {
    console.error("[server]: Error processing conversation", error);
    res.status(500).json({ error: `Error processing conversation: ${JSON.stringify(error)}` });
  }
});
```

Add the following line under the `app.use(...)` lines:

```typescript
app.use('/process', bodyParser.text({ type: '*/*' }));
```
