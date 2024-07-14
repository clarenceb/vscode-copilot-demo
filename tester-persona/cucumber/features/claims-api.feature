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
