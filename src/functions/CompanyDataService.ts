import 'reflect-metadata';
import { loadEnvVariables } from './helpers/env';
import { FUNCTION } from '../models/constants';
import { Commons } from '../commons';
import { ICompanyClient } from '../interfaces/ICompanyClient';
import container from '../awilix.config';
import connection from '../db/database';

const common = new Commons();

export const WrappedCompanyDataService = async (event, context, callback) => {
  loadEnvVariables(event);
  const companyClient: ICompanyClient = container.resolve<ICompanyClient>('companyClient');
  let response = {};
  await connection.sync();
  switch (event.function) {
    case FUNCTION.NEW_COMPANY: {
      response = await companyClient.createCompany(event);
      break;
    }
    case FUNCTION.GET_COMPANY: {
      response = await companyClient.getCompany(event);
      break;
    }
    case FUNCTION.UPDATE_COMPANY: {
      response = await companyClient.updateCompany(event);
      break;
    }
  }
  return common.lambdaSuccess(response);
};

export const CompanyDataService = common.errorHandler(WrappedCompanyDataService);
