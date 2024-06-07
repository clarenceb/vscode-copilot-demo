import request from 'supertest';
import app from "../src/index";

describe('GET /', () => {
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
        expect(parsed_conversation.text).toEqual(
          trimConversation(`Caller: Hi I just had a car accident and wanted to report it.
            Agent: OK, I hope you're alright, what happened?`));
    });

    // TASK 2: Make this test pass by updating the code in dev-persona/src/index.ts to use a better system prompt.
    xit('should be aware of the context of what is being said to properly identify the roles', async () => {
        const conversation = `I was driving on the I-18 and I hit another car. Are you OK? Yeah, I'm just a little shaken up. That's understandable. Can you give me your full name?`;

        const parsed_conversation = await request(app)
            .post('/parse_conversation')
            .send(conversation);
    
        expect(parsed_conversation.statusCode).toEqual(200);
        expect(parsed_conversation.text).toEqual(
          trimConversation(`Caller: I was driving on the I-18 and I hit another car.
            Agent: Are you OK?
            Caller: Yeah, I'm just a little shaken up.
            Agent: That's understandable. Can you give me your full name?`));
    });
});

// TASK 3: Explain this code (highlight the code and use copilot to explain).
// TASK 4: Document this code with copilot (highlight the code and use copilot to document).
function trimConversation(conversation: string) {
  return conversation.split('\n').map(line => line.trim()).join('\n');
}
