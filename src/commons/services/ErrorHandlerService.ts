import { ErrorCodes } from '../models/ErrorCodes';
import { API_HANDLER, UNEXPECTED_ERROR_CODE, ERROR_LEVEL } from '../models/Constants';

export class ErrorHandlerService {
  handleError(request) {
    console.error(request.error);
    return this.searchError(
      request.context.functionName,
      request.error.message,
      request.event
    );
  }

  searchError(lambda: string, errorMessage: string, event) {
    try {
      console.debug('> Error received in ErrorHandlerService');
      console.debug('Function name:', lambda);
      console.debug('Error message:', errorMessage);
      console.debug('Original event:', event);

      let errorFound = ErrorCodes.GenericErrors.find((errorCode) =>
        errorMessage.includes(errorCode.errorSearch)
      );

      if (!errorFound) {
        errorFound = ErrorCodes[lambda].find((errorCode) =>
          errorMessage.includes(errorCode.errorSearch)
        );
      }

      let finalMessageError = errorMessage.includes('Dynamic_Error') ? errorMessage.replace('Dynamic_Error', '') : errorFound.message;
      finalMessageError = finalMessageError.includes(errorFound?.errorSearch) ? finalMessageError.replace(errorFound?.errorSearch, '') : finalMessageError;
      console.debug('errorFound', errorFound);

      if (lambda.includes(API_HANDLER)) {
        return this.formatApiError(
          errorFound.statusCode,
          errorFound.errorCode,
          errorFound.level,
          finalMessageError
        );
      } else {
        return this.formatLambdaError(
          errorFound.statusCode,
          errorFound.errorCode,
          finalMessageError
        );
      }
    } catch (error) {
      const UNEXPECTED_ERROR: string =
        'Unexpected error on ' + lambda + ':' + errorMessage.replace('Dynamic_Error', '');
      console.error(UNEXPECTED_ERROR);

      if (lambda.includes(API_HANDLER)) {
        return this.formatApiError(
          500,
          UNEXPECTED_ERROR_CODE,
          ERROR_LEVEL,
          UNEXPECTED_ERROR
        );
      }

      return this.formatLambdaError(
        500,
        UNEXPECTED_ERROR_CODE,
        UNEXPECTED_ERROR
      );
    }
  }

  formatApiError(
    statusCode: number,
    code: string,
    level: string,
    error: string
  ) {
    return {
      statusCode: statusCode,
      headers: {
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': '*'
      },
      body: JSON.stringify({
        data: {},
        notification: {
          code: code,
          level: level,
          message: error,
          timestamp: new Date()
        }
      })
    };
  }

  formatLambdaError(statusCode: number, code: string, error: string) {
    return {
      statusCode: statusCode,
      body: JSON.stringify({
        code: code,
        message: error
      })
    };
  }
}
