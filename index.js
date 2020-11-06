'use strict';

const serializeError = require('serialize-error');

const wrappedSerializer = (...args) => {
  return serializeError(...args);
};

const addCustomFunctionsToLoggerChildToUseCorrectLoggerInstanceInThis = loggerChild => {
  loggerChild.perfStart      = function perfStart(msg) {
    this.info({ msg, performanceTimer : 'START' });
  };
  loggerChild.perfEndSuccess = function perfEndSuccess(msg) {
    this.info({ msg, performanceTimer : 'END (SUCCESS)' });
  };
  loggerChild.perfEndFail    = function perfEndFail(msg) {
    this.info({ msg, performanceTimer : 'END (FAIL)' });
  };
  loggerChild.err            = function err(err) {
    this.error({ err });
  };
};

/**
 * Logger util, currently wraps pino.
 * @see http://getpino.io/#/docs/api
 * @param {Object} meta
 * @param {Object} clientPinoConfig
 * @returns {*}
 */
module.exports = (meta, clientPinoConfig = {}) => {
  const maybePretty = process.env.NODE_LOGGER_PRETTY === 'true' ? { prettyPrint : { colorize : true, levelFirst : true } } : {};

  const pinoConf = {
    ...maybePretty,
    ...{ serializers : { err : wrappedSerializer } },
    ...clientPinoConfig,
  };

  const logger      = require('pino')(pinoConf);
  const loggerChild = logger.child(meta);

  addCustomFunctionsToLoggerChildToUseCorrectLoggerInstanceInThis(loggerChild);

  return loggerChild;
};
