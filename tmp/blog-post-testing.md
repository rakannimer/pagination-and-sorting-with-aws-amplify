
## Introduction

## Adding Cypress Tests

## Running Tests in CI mode locally

## Setting up CI/CD with Amplify Console

we want to run the tests with a temporary mock api, 
however to create one with amplify mock api and run it in our CI environment we're going to need to : 

1. Run amplify init on the CI server
2. Install Java (required to run `amplify mock api`)

amplify mock api uses Java 
In amplify.yml we add a 
## Java required by mock api 



Amplify now supports mocking our apis. So we can run our api locally and run tests against it or prototype offline. Read more [here](https://aws.amazon.com/blogs/mobile/amplify-framework-local-mocking/)

In this blog post we'll write end-to-end tests to a group chat Amplify app that you can find [here](https://github.com/rakannimer/pagination-and-sorting-with-aws-amplify) and read more about [here](https://dev.to/rakannimer/pagination-sorting-with-aws-amplify-4l37)

1 - Update/install amplify cli to get the local api mocking feature

2 - Setup Cypress