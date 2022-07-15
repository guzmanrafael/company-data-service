import * as dotenv from 'dotenv';
import * as path from 'path';
import { LOCAL_STAGE } from '../../models/constants';

export function loadEnvVariables(event: any) {
  //Load the env file just once per run
  if (process.env.ENV_LOADED !== 'true') {
    process.env.IS_OFFLINE = String(!!event.isOffline);
    process.env.ENVIROMENT = event.env;
    const envPath = path.join(
      __dirname,
      '..',
      '..',
      'enviroment/.env.' + (event.env ?? LOCAL_STAGE) //Defaults to local config
    );
    dotenv.config({
      path: envPath
    });
    process.env.ENV_LOADED = 'true';
  }
}
