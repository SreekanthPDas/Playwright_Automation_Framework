import { runLogger } from './src/utils/logger/runLogger';

export default async function globalTeardown() {

  const endTime = new Date().toLocaleTimeString();

  runLogger.info('');
  runLogger.info(`End Time : ${endTime}`);
  runLogger.info('Test Run Finished');
  runLogger.info('=============================');

}