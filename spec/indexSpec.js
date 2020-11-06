const logger = require('../index.js')({ appName : 'test', other : 'value' }, {});

describe('logger', () => {
  it('logs nested errors', () => {
    spyOn(logger, 'err');

    const err = new Error('test error');
    err.debug = {
      originalError : new Error('original error')
    };
    logger.err(err);
    expect(logger.err).toHaveBeenCalledWith(err);
  });
});
