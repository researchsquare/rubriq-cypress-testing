# rubriq-cypress-testing
This repository contains rubriq e2e tests and it is still in working progress to expand test suites. 

## Getting Started
For this project Node.js is required to be installed on your machine. If not, run
```
brew install node
```

The exact version used in project is 16.16.0

## Start Cypress
To install all dependencies:
```
make init
```

To run tests in **browser**: 
```
make open-customer
make open-orders
   ```

To run tests **headless**:
```
make run-customer
make run-orders
```

To run tests in **Docker**:
```
make docker-customer
make docker-orders
make docker-orders-local
```

It is recommended to run Orders-API suite in Docker. This is environment where Orders-API tests ususally run in Github Actions.


> Makefile is a special format file that helps build and manage project, it simplifies the task of typing the compiling commands.