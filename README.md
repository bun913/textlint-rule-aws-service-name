# textlint-rule-aws-service-name

[![codecov](https://codecov.io/gh/bun913/textlint-rule-aws-service-name/graph/badge.svg?token=DHEBLPSP4O)](https://codecov.io/gh/bun913/textlint-rule-aws-service-name)

Important: **This is not an official AWS service. This is a personal project by a single user.**

textlint rule for AWS product Names.

This is a textlint rule to check for inconsistencies in AWS service and product names.

It detects inconsistencies as shown below (image shows usage with VSCode extension):

![lintImage](https://user-images.githubusercontent.com/73948280/223648022-c5f1b015-3c1c-4456-8792-3f2c03c9bd67.png)

This project is heavily influenced by the following repository:

I would like to express my deep respect to `@37108` who has been developing this mechanism since as early as 2019!

https://github.com/37108/textlint-rule-aws-spellcheck

## Features

### What it can do

- Detect capitalization inconsistencies
    - `Ec2` -> `EC2`
- Detect missing spaces in service names that require them
    - `SecurityHub` -> `Security Hub`
- Detect unnecessary spaces in service names that should not have them
    - `Cloud Front` -> `CloudFront`
- Detect incorrect prefixes between `Amazon` and `AWS`
    - `AWS EC2` -> `Amazon EC2`
    - `Amazon Security Hub` -> `AWS Security Hub`

## For Developers and Contributors

Please refer to this file:

[CONTRIBUTING.md](https://github.com/bun913/textlint-rule-aws-service-name/blob/main/CONTRIBUTING.md)

## Install

Install with [npm](https://www.npmjs.com/):

```
npm install textlint-rule-aws-service-name
```

## Usage

### Using with textlintrc

After installation, add the following to your `.textlintrc.json`:

```json
{
    "rules": {
        "aws-service-name": true
    }
}
```

If you're using yml (yaml) format like `.textlintrc.yml`, write it as follows:

```yml
rules:
  aws-service-name: true
```

### Using with CLI

After installation, you can also run it via CLI as follows:

```
textlint --rule aws-service-name README.md
```

### Using with VSCode

After setting up textlintrc, please install the [extension](https://marketplace.visualstudio.com/items?itemName=taichi.vscode-textlint) by referring to the article below:

https://qiita.com/takasp/items/22f7f72b691fda30aea2

### Important Note

As mentioned in the official textlint GitHub, errors will occur if the installation locations of textlint and the rules differ:

https://github.com/textlint/textlint/blob/master/docs/faq/failed-to-load-textlints-module.md

```bash
# NG
npm i -g textlint
npm i textlint-rule-aws-service-name --save-dev
```

```bash
# OK
npm i -g textlint
npm i -g textlint-rule-aws-service-name
```

### Build

Builds source codes for publish to the `lib` folder.
You can write ES2015+ source codes in `src/` folder.

```
yarn build
```

### Tests

The following is a list of test files to be placed in their respective directories:

- The test/ directory places the files for testing the texlint rules in src/index.ts. (*index.ts)
    - Test textlint rule by [textlint-tester](https://github.com/textlint/textlint-tester).
- specs/ directory places the tests for the processing group to generate the yml files for textlint rules under src/. (*spec.ts)

To test them, run the following command:

```bash
yarn test
# or npm run test
```

You can also test each test file by running the following:

```bash
# Run only the test files under specs/.
yarn jest
# or npm run jest
```

```bash
# run only test files under test/.
yarn testLint
# or npm run testLint
```

## License

MIT © bun913
