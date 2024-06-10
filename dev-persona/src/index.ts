// src/index.js

/**
 * Insurance Claims API:
 * - All requests and responses are in JSON format unless otherwise stated.
 * - Assume default Accept header is application/json unless otherwise stated.
 */

import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { OpenAIClient, AzureKeyCredential } from "@azure/openai";
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';

dotenv.config();

const app: Express = express();
const port = process.env.PORT ?? 3000;
const client = new OpenAIClient(
  process.env.AZURE_OPENAI_API_ENDPOINT as string,
  new AzureKeyCredential(process.env.AZURE_OPENAI_API_KEY as string));

app.use(express.json());
app.use('/parse_conversation', bodyParser.text({ type: '*/*' }));

/**
 * Return a JSON response that contains the message "Insurance claims API"
 * @param req - The request object
 * @param res - The response object
 */
app.get("/", (req: Request, res: Response) => {
  // TASK DEV-1: Return a JSON response that contains the message "Insurance claims API"
  res.send("TypeScript + Express server is running");
});

/**
 * Parse the plain text claims conversation:
 * - It should accept a POST request with raw text (text/plain) and return text/plain with the parsed conversion.
 * - The parsed conversation using Azure OpenAI completions endpoint (gpt35-turbo model) and the result should be in the format:
 *   Caller: <what the caller said>
 *   Agent: <what the agent said>
 *   Caller: <what the caller said next>
 *   Agent: <what the agent said next>
 *   (and so on until the end of the transcript)
 * - The final message could be from the caller or the agent.  E.g. Caller: Thank you for your help.
 * - Retain and punctuation, including fullstops, commas, etc.
 * @param req - The request object
 * @param res - The response object
 */
app.post("/parse_conversation", async (req: Request, res: Response) => {
  const conversationToParse = req.body;

  // TASK DEV-2: Use a better system prompt to parse the conversation by loading the improved prompt from a file (prompts\parse-prompt.txt).
  const systemPrompt = `You are a help AI assistant that parses phone call transcripts containing a conversation between a Caller and an Agent.
    Identify which parts of the conversationion are from the Caller and Agent.
    Separate each part of the conversation on a new line prefixed with either Caller: <text> or Agent: <text>
    Remove leading and trailing whitespace from each line before adding the Caller or Agent prefix.`
  
  const messages = [
    { role: "system", content: systemPrompt },
    { role: "user", content: conversationToParse }
  ];

  const deploymentName = process.env.AZURE_OPENAI_API_DEPLOYMENT as string;

  try {
    // TASK DEV-3: Explain this code (highlight the code and use copilot to explain).
    const { choices } = await client.getChatCompletions(
      deploymentName,
      messages, {
        temperature: 0.7,
        topP: 0.95,
        maxTokens: 1000,
        frequencyPenalty: 0,
        presencePenalty: 0
      });
    const parsedConversation = choices[0]?.message?.content ?? "<unable to parse conversation>";
    res.status(200).send(parsedConversation);
  } catch (error) {
    console.error("[server]: Error parsing conversation", error);
    res.status(500).send(`Error parsing conversation: ${JSON.stringify(error)}`);
  }
});

// TASK-TESTER-1: Create a new api endpoint (`/process`) to extract key information from a parsed conversation.

// Avoid starting app when running tests since Supertest will start the server
if (process.env['NODE_ENV'] !== 'test') {
  app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
  });
}

// TASK-DEV-4: Document the function below with copilot (highlight the code and use copilot to document).

function getSystemPromptFilePath(promptFileName: string): string {
  let promptFilePath = path.join(process.cwd(), '..', 'prompts', promptFileName);
  if (!fs.existsSync(promptFilePath)) {
    promptFilePath = path.join(__dirname, '..', '..', '..', 'prompts', promptFileName);
  }
  return promptFilePath;
}

export default app;
