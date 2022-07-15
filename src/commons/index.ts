import { SUCCESSFUL_NOTIFICATION, WARNING_NOTIFICATION } from './models/ErrorCodes';
import { HTTP_SUCCESS_CODE, WARM_LAMBDA_MESSAGE, WARM_SOURCE } from './models/Constants';
import middy from '@middy/core';
import warmupMiddleware from './middlewares/warmUpMiddleware';
import { ErrorHandlerService } from './services/ErrorHandlerService';

export class Commons {
  public warmLambdaFunction(event: any, context: any) {
    if (event.source === WARM_SOURCE) {
      return context.succeed(WARM_LAMBDA_MESSAGE);
    }
  }

  public apiWarning(payload, warningMessage: string, statusCode: number = HTTP_SUCCESS_CODE) {
    return {
      statusCode,
      headers: {
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': '*'
      },
      body: JSON.stringify({
        data: payload,
        notification: this.warningNotification(warningMessage)
      })
    };
  }

  public apiSuccess(payload, statusCode: number = HTTP_SUCCESS_CODE) {
    return {
      statusCode,
      headers: {
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': '*'
      },
      body: JSON.stringify({
        data: payload,
        notification: this.successfulNotification()
      })
    };
  }

  public lambdaSuccess(payload) {
    return {
      statusCode: HTTP_SUCCESS_CODE,
      body: JSON.stringify(payload)
    };
  }

  public errorHandler(baseHandler) {
    const isWarmingUp = (event) => event.isWarmingUp === true;
    const handled = middy(baseHandler).use(warmupMiddleware({ isWarmingUp }));
    handled.onError(async (request) => {
      const errorH = new ErrorHandlerService();
      return errorH.handleError(request);
    });
    return handled;
  }

  public successfulNotification() {
    SUCCESSFUL_NOTIFICATION.timestamp = new Date();
    return SUCCESSFUL_NOTIFICATION;
  }

  public warningNotification(message: string) {
    WARNING_NOTIFICATION.message = message;
    WARNING_NOTIFICATION.timestamp = new Date();
    return WARNING_NOTIFICATION;
  }
}
export { validateAndConvert } from './services/ClassValidationService';
