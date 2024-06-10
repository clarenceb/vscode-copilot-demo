import request from 'supertest';
import app from "../src/index";
import fs from 'fs';
import path from 'path';

describe('GET /', () => {
  // TASK DEV-1: Return a JSON response that contains the message "Insurance claims API"
  it('should return a JSON response with message "Insurance claims API"', async () => {
    const res = await request(app).get('/');

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message');
    expect(res.body.message).toEqual('Insurance claims API');
  });
});

describe('POST /parse_conversation', () => {
    it('should return a parsed conversation with multiple lines, prefixed with either Caller: or Agent:', async () => {
        const conversation = `Hi I just had a car accident and wanted to report it. OK, I hope you're alright, what happened?`;
    
        const parsed_conversation = await request(app)
            .post('/parse_conversation')
            .send(conversation);
    
        expect(parsed_conversation.statusCode).toEqual(200);
        expect(trimConversation(parsed_conversation.text)).toEqual(
          trimConversation(`Caller: Hi I just had a car accident and wanted to report it.
            Agent: OK, I hope you're alright, what happened?`));
    });

    // TASK DEV-2: Make this test pass by updating the code in dev-persona/src/index.ts to use a better system prompt.
    xit('should be aware of the context of what is being said to properly identify the roles', async () => {
        const inputFile = path.join(__dirname, '..', '..', 'transcripts', 'claim1.raw.txt');
        const expectedResultsFile = path.join(__dirname, '..', '..', 'transcripts', 'claim1.parsed.txt');
        const rawConversation = fs.readFileSync(inputFile, 'utf8');
        const expectedParsedConversation = fs.readFileSync(expectedResultsFile, 'utf8');

        const parsed_conversation = await request(app)
            .post('/parse_conversation')
            .send(rawConversation);
    
        expect(parsed_conversation.statusCode).toEqual(200);
        expect(trimConversation(parsed_conversation.text)).toEqual(
          trimConversation(expectedParsedConversation));
    });

    // TASK DEV-5: Open GitHub Copilot Chat and ask:
    //    "@workspace, walk me through tests I'm already covering in the project + recommend me other test cases?"
    //
    // Then insert one of the recommended test cases below (e.g. handling empty conversation string gracefully).
    // Implement the code to make the test pass.
    
});

// TASK DEV-3: Explain this code (highlight the code and use copilot to explain).
function trimConversation(conversation: string) {
  return conversation.split('\n').map(line => line.trim()).join('\n');
}
