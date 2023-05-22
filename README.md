# Lighthouse Testing Utility

A program to run multiple Lighthouse tests on a URL, outputting the average & median results.

> Can run 'npm run start' in the root folder to start both client and server concurrently.

A basic frontend lets the user enter a url, the number of lighthouse tests to run (1 to 3), and the screen size to test (mobile or desktop). Clicking 'Submit' makes a POST request to the 'http://localhost:5000/lighthouse/prepTest' endpoint that loads the testing parameters into a custom endpoint, and then a follow-up GET request to 'localhost:5000/lighthouse/runTest' that initiates the tests and opens up an SSE stream to get updates/results.


---

to do:

- add testing
- build out frontend
- connect a db