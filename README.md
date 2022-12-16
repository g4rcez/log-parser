# log-parser

## Development

This project use [NodeJS 18.12.1](https://nodejs.org/dist/v18.12.1/node-v18.12.1-linux-x64.tar.xz) and [Yarn](https://yarnpkg.com/cli/install). I recommend to use [volta](https://volta.sh/) to setup your NodeJS environment.

You need to install the dependencies, just use this command:

```bash
yarn install
```

To use the log-parser, just run

```bash
yarn parser # or if you need to use a different file
yarn parser /path/to/your file
```

Feel free to edit the code!

## Tests

I'm using [Vitest](https://vitest.dev/) as a test runner.


```bash
yarn tests
```
