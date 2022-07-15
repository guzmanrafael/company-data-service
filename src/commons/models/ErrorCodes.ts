import {
  ERROR_LEVEL,
  INFO_LEVEL,
  WARNING_LEVEL,
  SUCCESSFUL_CODE,
  SUCCESSFUL_MESSAGE,
  WARNING_CODE
} from './Constants';
import { Notification } from './ErrorNotification';

export const SUCCESSFUL_NOTIFICATION: Notification = {
  code: SUCCESSFUL_CODE,
  level: INFO_LEVEL,
  message: SUCCESSFUL_MESSAGE,
  timestamp: new Date()
};
export const WARNING_NOTIFICATION: Notification = {
  code: WARNING_CODE,
  level: WARNING_LEVEL,
  message: '',
  timestamp: new Date()
};
export const ErrorCodes = {

  GenericErrors: [
    {
      statusCode: 400,
      errorCode: 'EL4001001',
      errorSearch: 'missing_params_error',
      message: '',
      level: ERROR_LEVEL
    }
  ],
  CompanyHandler: [
    {
      statusCode: 409,
      errorCode: 'EL4095040',
      errorSearch: 'company_already_exists',
      message: 'A Company with the given RFC already exists',
      level: ERROR_LEVEL
    }
  ],
  SpecificCompanyHandler: [
    {
      statusCode: 404,
      errorCode: 'EL4045041',
      errorSearch: 'company_not_exists',
      message: 'Company does not exist',
      level: ERROR_LEVEL
    }
  ]
};
