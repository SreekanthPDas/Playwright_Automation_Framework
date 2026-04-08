import { test as base, Fixtures } from '@playwright/test';
import fs from 'fs';
import { TestLogger } from '../utils/logger/testLogger';
import { runLogger } from '../utils/logger/runLogger';

type TestFixtures = {
  logger: TestLogger;
};

export const test = base.extend<TestFixtures>({

  logger: async ({}, use, testInfo) => {

    const logger = new TestLogger();
    logger.info("================================");
    logger.info(`Starting test: ${testInfo.title}`);
    logger.info(`FILE       : ${testInfo.file}`);
    logger.info(`LINE       : ${testInfo.line}`);
    
    await use(logger);
    logger.info(`Test status: ${testInfo.status}`);
    logger.info(`Finished test: ${testInfo.title}`);
    logger.info(`================================`);

    if (testInfo.status !== testInfo.expectedStatus) {
      logger.error(`TEST FAILED : ${testInfo.title}`);
      const logFile = testInfo.outputPath('error.log');

      fs.writeFileSync(logFile, logger.getLogs());

    }
    logger.info(`TEST END : ${testInfo.title}`);
  }
});