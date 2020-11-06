# node-logger
Simple NodeJS logger using Pino.

## Install

```
$ yarn add @aliencreations/node-logger
```

## Usage
Please refer to [the pino documentation](http://getpino.io/#/docs/api?id=options) for the `optionalPinoConfig` 
referenced below. 

```js

const applicationMetaData = { 
  appName       : config.appName, 
  someOtherMeta : 'goes here' 
};

const optionalPinoConfig = {
  redact : ['key', 'path.to.key', 'stuff.thats[*].secret']
};

const logger = require('@aliencreations/node-logger')(applicationMetaData, optionalPinoConfig);

logger.info('some log here');

```
---
## Changelog

##### 1.0.0
  - Initial commit.
