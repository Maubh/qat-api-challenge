<h1 align="center">#  QAT - Challlenge - API Pet Store</h1>

![License Badge](https://img.shields.io/badge/license-MIT-brightgreen)

This repository contains API tests for the Swagger Petstore Sample, utilizing Cypress for functional testing and K6 for performance evaluation. Details about the test cases and additional information on these tests are available in the files [API Test Cases](https://docs.google.com/document/d/1LyM_RDAhTWVEbXo66bLsyZmVbV0WBeek9Gz1JzHQTk0/edit?usp=sharing) and [API Performance Tests](https://docs.google.com/document/d/1c48C7f5ieR8C0-1Uq_2epuvZPrV_U8ElK97FI_lVOjU/edit?usp=sharing).

# How to run the tests
## Prerequisites
You'll need to follow the instructions in this repo [Swagger Petstore Repo](https://github.com/swagger-api/swagger-petstore) to run the Swagger Petstore Sample locally.

## Running the API tests (Cypress)

1. Clone the repository
2. run `npm install` to install all dependencies
3. run `npm run cy:open` to run the API tests
4. run `npm run cy:run` to run the tests in headless mode

If you want to check the mochawesome reports, please follow these steps:
1. run `npm run cy:run` to run the tests in headless mode
2. run `npm run report:merge` to copy the test execution information to a json file
3. run `npm run report:mocha` to generate a html report
4. run `npm run report:clean` to remove the report generated

After runs it, you can view the file `full_report.html` in the `/mochawesome-report` folder.

## Running the API performance tests (K6)
1. run `k6 run index.js` to run the K6 tests
2. It will be generated a file called summary.html with the results of the tests.

## References

[Cypress](https://docs.cypress.io/guides/overview/why-cypress)<br>
[K6](https://k6.io/docs/)<br>
[Swagger Petstore]()

## Author

Made with ❤️ by Maurício Filho 👋🏽 Contact me!

[![Linkedin Badge](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/mauriciofilho) 
[![Gmail Badge](https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:msvasconcelos.filho@gmail.com)

## License
[MIT](https://choosealicense.com/licenses/mit/)
