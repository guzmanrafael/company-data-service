const API_HANDLER: string = 'Handler';
const UNEXPECTED_ERROR_CODE: string = 'EL5009999';
const DYNAMIC_ERROR_CODE: string = 'EL5009999';
const SUCCESSFUL_CODE: string = 'IL2001000';
const WARNING_CODE: string = 'IL1001000';
const SUCCESSFUL_MESSAGE: string = 'Successful operation';

const INFO_LEVEL: string = 'INFO';
const WARNING_LEVEL: string = 'WARNING';
const ERROR_LEVEL: string = 'ERROR';
const WARM_SOURCE :string = 'serverless-plugin-warmup';
const WARM_LAMBDA_MESSAGE: string = 'Lambda function has been warmed up';
const HTTP_SUCCESS_CODE: number = 200;
const MISSING_PARAMS_ERROR = (errorString: string): Error => { return new Error(`Dynamic_Error ${errorString}`); };
const MISSING_BODY_ERROR = new Error('Missing_Body');

export {
  API_HANDLER,
  ERROR_LEVEL,
  HTTP_SUCCESS_CODE,
  INFO_LEVEL,
  SUCCESSFUL_CODE,
  SUCCESSFUL_MESSAGE,
  UNEXPECTED_ERROR_CODE,
  WARNING_LEVEL,
  WARNING_CODE,
  WARM_SOURCE,
  WARM_LAMBDA_MESSAGE,
  DYNAMIC_ERROR_CODE,
  MISSING_PARAMS_ERROR,
  MISSING_BODY_ERROR
};
