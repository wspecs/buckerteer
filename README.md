<!-- prettier-ignore-start -->
# tsm-starter

Utility to generate Typescript nodejs modules.

![npm](https://img.shields.io/npm/v/tsm-starter.svg) ![license](https://img.shields.io/npm/l/tsm-starter.svg) ![github-issues](https://img.shields.io/github/issues/wspecs/tsm-starter.svg)

![nodei.co](https://nodei.co/npm/tsm-starter.png?downloads=true&downloadRank=true&stars=true)

![travis-status](https://img.shields.io/travis/wspecs/tsm-starter.svg)
![stars](https://img.shields.io/github/stars/wspecs/tsm-starter.svg)
![forks](https://img.shields.io/github/forks/wspecs/tsm-starter.svg)

![forks](https://img.shields.io/github/forks/wspecs/tsm-starter.svg)

![](https://david-dm.org/wspecs/tsm-starter/status.svg)
![](https://david-dm.org/wspecs/tsm-starter/dev-status.svg)

## Features

- Utility to generate Typescript nodejs modules.

## Usage

```bash
tsm-starter
> ✔ Name of the package … name-of-the-package
> ✔ Description of the package … Descriptionm for the package
> ✔ License type … MIT
> ✔ What's your name? … Author's Name
> ✔ What's your email? … Author's Email
> ✔ What's your website url? … Author's Url
> ✔ What's your GitHub repo? … Author's GitHub Repo
```

## Install

`npm install --save tsm-starter`

Or as binary

``npm install --g tsm-starter`

## Scripts

 - **npm run build** : `rm -rf dist && tsc && npm run readme`
 - **npm run readme** : `node ./node_modules/.bin/node-readme`
 - **npm run test** : `mocha ./dist/test/*.js`

## Dependencies

Package | Version | Dev
--- |:---:|:---:
[commander](https://www.npmjs.com/package/commander) | ^2.19.0 | ✖
[dot-object](https://www.npmjs.com/package/dot-object) | ^1.7.1 | ✖
[great-logs](https://www.npmjs.com/package/great-logs) | 0.0.4 | ✖
[prompts](https://www.npmjs.com/package/prompts) | ^2.0.1 | ✖
[shelljs](https://www.npmjs.com/package/shelljs) | ^0.8.3 | ✖
[@types/chai](https://www.npmjs.com/package/@types/chai) | ^4.1.3 | ✔
[@types/mocha](https://www.npmjs.com/package/@types/mocha) | ^5.2.0 | ✔
[@types/node](https://www.npmjs.com/package/@types/node) | ^10.0.2 | ✔
[chai](https://www.npmjs.com/package/chai) | ^4.1.2 | ✔
[mocha](https://www.npmjs.com/package/mocha) | ^5.1.1 | ✔
[node-readme](https://www.npmjs.com/package/node-readme) | ^0.1.9 | ✔


## Contributing

Please check the [Contributing Guidelines](contributing.md) for more details. Thanks!

## Author

[Wendly Saintil](https://twitter.com/wendlysaintil)

## License

[MIT](LICENSE)
<!-- prettier-ignore-end -->
