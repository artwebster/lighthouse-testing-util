# Lighthouse Testing Utility

A lightweight program to run multiple Lighthouse tests on a URL, outputting the median results.

> Can run 'npm run start' in the root folder to start both client and server concurrently.

A basic frontend lets the user enter a url, the number of Lighthouse tests to run (1 to 10), and the screen size to test (mobile or desktop).

![screenshot1](/client/public/screenshots/lighthouse-runner-v2-1.jpg?raw=true)

Clicking 'Submit' makes a POST request to the 'http://localhost:5000/lighthouse/prepTest' endpoint that loads the testing parameters into a custom endpoint, and then a follow-up GET request to 'localhost:5000/lighthouse/runTest' that initiates the tests and opens up an SSE stream to get updates/results.

![screenshot1](/client/public/screenshots/lighthouse-runner-v2-2.jpg?raw=true)

While both the average and median results are calculated and returned, currently only the median results are displayed.

---

to do:

- add testing
- convert front-end to Typescript
- connect a db
