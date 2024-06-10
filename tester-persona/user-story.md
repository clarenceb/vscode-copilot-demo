# User Story: Claims API processing

## Summary

As a claims adjuster, I want to use the Claims API to summarise and extract key information from a claim report, so that I can quickly assess the claim and make a decision.

The new api endpoint (`/process`) should accept a plain text phone conversation between a caller and an agent in the format:

```
Caller: Hello, I'd like to report a car accident.
Agent: Sure, what happened?
Caller: I was driving on Main Street when I hit another car.
Agent: Was anyone injured?
Caller: No
Agent: What caused the accident?
Caller: The road was slippery.
...etc..
```

It returns a json response with the key information extracted from the conversation.

## Acceptance Criteria

A new REST endpoint should be created at the path `/process` that accepts a POST request with a `plain/text` content type and body containing the phone conversation between a caller and an agent in the format:

```
Caller: Hello, I'd like to report a car accident.
Agent: Sure, what happened?
Caller: I was driving on Main Street when I hit another car.
Agent: Was anyone injured?
Caller: No
Agent: What caused the accident?
Caller: The road was slippery.
...etc..
```

The following information must be extracted from the phone conversation between the caller and agent:

1. Call reason (key: `reason`)
2. Cause of the incident (key: `cause`)
3. Names of all drivers as an array (key: `driver_names`)
4. Insurance number (key: `insurance_number`)
5. Accident location (key: `location`)
6. Car damages as an array (key: `damages`)
7. A short, yet detailed summary (key: `summary`)

Make sure fields 1 to 6 are answered concise fields.
The response should be in JSON format (`Content-Type: application/json`), e.g.:

```json
{
  "reason": "Car accident",
  "cause": "Slippery road",
  "driver_names": ["John Doe", "Jane Doe"],
  "insurance_number": "123456",
  "location": "Main Street",
  "damages": ["Front bumper", "Rear bumper"],
  "summary": "Two drivers, John and Jane Doe, were involved in a car accident on Main Street. The cause of the accident was a slippery road. The damages were to the front and rear bumpers."
}
```

If a field cannot be determined or is unspecified, it should be set to empty string (`""`).
For an array field, if no values can be determined or is unspecified, it should be set to an empty array (`[]`).

## Sample HTTP request

```
POST /process HTTP/1.1
Content-Type: text/plain

Caller: Hello, I'd like to report a car accident.
Agent: Sure, what happened?
Caller: I was driving on Main Street when I hit another car.
Agent: Was anyone injured?
Caller: No
Agent: What caused the accident?
Caller: The road was slippery.
...etc..
```

## Sample HTTP response

```
HTTP/1.1 200 OK
Content-Type: application/json

{
  "reason": "Car accident",
  "cause": "Slippery road",
  "driver_names": ["John Doe", "Jane Doe"],
  "insurance_number": "123456",
  "location": "Main Street",
  "damages": ["Front bumper", "Rear bumper"],
  "summary": "Two drivers, John and Jane Doe, were involved in a car accident on Main Street. The cause of the accident was a slippery road. The damages were to the front and rear bumpers."
}
```
