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
