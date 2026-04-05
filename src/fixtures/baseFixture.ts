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

    logger.info(`Starting test: ${testInfo.title}`);

    await use(logger);

    logger.info(`Finished test: ${testInfo.title}`);

    if (testInfo.status !== testInfo.expectedStatus) {

      const logFile = testInfo.outputPath('test.log');

      fs.writeFileSync(logFile, logger.getLogs());

    }
  }
});