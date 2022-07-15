import middy from '@middy/core';

interface Options {
    isWarmingUp?: (event: any) => boolean
    onWarmup?: (event: any) => void
}

const defaults = {
  isWarmingUp: (event) => event.source === 'serverless-plugin-warmup'
};

/**
 *
 * @param opt is custom event properties object to validate if is warming up
 * @returns middy MiddlewareObj
 */
const warmupMiddleware = (opt: Options): middy.MiddlewareObj => {
  const options = {
    ...defaults,
    ...opt
  };
  const warmupMiddlewareBefore = (request) => {
    if (options.isWarmingUp(request.event)) {
      return 'warmup';
    }
  };
  return {
    before: warmupMiddlewareBefore
  };
};
export default warmupMiddleware;
