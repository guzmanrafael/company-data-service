import { validate, ValidationError } from 'class-validator';
import { MISSING_BODY_ERROR, MISSING_PARAMS_ERROR } from '../models/Constants';
import { plainToClass } from 'class-transformer';

/**
 * Converts plain object to class and validate each property with decorator of 'class-validator'
 * @param classToConvert is the target class for validation
 * @param body is a plain object to be validated
 * @param errorSearch a custom 'error key' that is appended at the beginning of the message if a validation error is found
 * @returns An instance of classToConvert if all validations pass. It throws an error with detailed
 * message for each property that failed validation. 
 */
export async function validateAndConvert(classToConvert: any, body: any, errorSearch?: string): Promise<any> {
  let data = null;
  if (body !== null && body !== undefined) {
    const bodyToTest = JSON.parse(body);
    data = plainToClass(classToConvert, bodyToTest);
    await validate(data, { skipMissingProperties: true, whitelist: true, forbidNonWhitelisted: true }).then((errors: ValidationError[]) => {
      //errors is an array of validation errors
      if (errors.length > 0) {
        let errorString = 'VALIDATION ERROR: ';
        //Iterate through validation errors and build human-readable error string
        for (const errorItem of errors) {
          errorString = errorString + createHumanReadableError(errorItem, errorItem.property, []);
        }
        throw errorSearch ? MISSING_PARAMS_ERROR(`${errorSearch} ${errorString}`) : MISSING_PARAMS_ERROR(`missing_params_error ${errorString}`);
      }
    });
  } else {
    throw MISSING_BODY_ERROR;
  }
  return data;
}

/**
 * This function takes a ValidationError (that comes from 'validate' function of 'class-validator'), a built error string, and an error acumulator that is
 * returned as a message
 * @param error is an instance of ValidationError (from class-validator) that contains, at every layer of the target object, detailed constraints that failed validation with error messages. 
 * @param failedProperty is the value that haven't pass a validation.
 * @param errAccumulator contains the final error message 
 * @returns an array of detailed errors for each property of the target object
 */
const createHumanReadableError = (error: ValidationError, failedProperty: string, errAccumulator: string[]) => {
  if (error.children && error.children.length > 0) {
    //iterate through children errors recursively (that means children of children, and so on) until all are described in errAccumulator
    for (const err of error.children) {
      createHumanReadableError(err, failedProperty + '.' + err.property, errAccumulator);
    }
  } else {
    //Append each error to errAccumulator
    errAccumulator.push(`\n ${failedProperty} ( ${Object.values(error.constraints).join('')} )`);
  }
  return errAccumulator;
};
