# Backend - POC

National Library of Medicine API Integration

## Purpose

Created a Node.js application that consumes the National Library of Medicine (NLM) API endpoints to retrieve drug details and drug interactions. Two API endpoints: one for retrieving drug details and another for fetching drug interactions.

## IDE recommendations and setup

- VSCode IDE

## Dev setup

- Install all the dependencies using `npm install`
- To build and run the server use `npm run start`
- To run the unit test use `npm run test`

### Optional

- Default we are using console log we can change into Winstonlogger
- Unit Test: We can using Jest for unit testing

## Build With

- Node - The runtime server framework used
- ExpressJS - minimalist web framework for Node.js
- Axios - For external api integration
- Jest - For writing Unit Tests

## Development

Default port is 2000.

There are 2 API end points :

I have added a curl requests : medicine-api-integration.postman_collection.txt Please use this 
to verify roles and permissions.

- First Api will accept drug name as request params and provide drug information 
- Second api will accept rxcui as request params and provide proprietary information

If you're using VSCode as your IDE, simply hit F5 to run the service.  While the script is running in console you can see tables created and data inserted.