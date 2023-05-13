# Lighthouse Testing Utility

A program to run multiple Lighthouse tests on a URL, outputting the average & median results.

Currently have to make a POST request to http://localhost:5000/api/lighthouse.

Example request body:

```json
{
  "url": "https://www.testurl.com/",
  "runs": 3,
  "desktop": true
}
```

| Field   | Type    | Description                                          |
| ------- | ------- | ---------------------------------------------------- |
| url     | string  | url to test                                          |
| runs    | number  | number of times to run the Lighthouse test           |
| desktop | boolean | true for testing a desktop display, false for mobile |

---

to do:

- add SSE
- add testing
- build out frontend
- connect a db
