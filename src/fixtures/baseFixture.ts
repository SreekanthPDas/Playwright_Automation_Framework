import { test as base, Fixtures } from '@playwright/test';
import fs from 'fs';
import { TestLogger } from '../utils/logger/testLogger';
import { runLogger } from '../utils/logger/runLogger';
import { LoginPage } from '@pages/auth/LoginPage';
import { DashBoardPage } from '@pages/dashboard/DashBoardPage';

type TestFixtures = {
  logger: TestLogger;
  loginPage:LoginPage;
  dashboardPage: DashBoardPage;
};

export const test = base.extend<TestFixtures>({
  loginPage: async({page}, use)=>{
    await use(new LoginPage(page));
  },
  dashboardPage: async({page}, use)=>{
    await use(new DashBoardPage(page));
  },
  logger: async ({}, use, testInfo) => {

    const logger = new TestLogger();
    logger.info("================================");
    logger.info(`Starting test: ${testInfo.title}`);
    logger.info(`File       : ${testInfo.file}`);
    logger.info(`Line       : ${testInfo.line}`);
    await use(logger);
    logger.info(`Finished test: ${testInfo.title} with status: ${testInfo.status}`);
    logger.info(`================================`);

    if (testInfo.status !== testInfo.expectedStatus) {
      logger.error(`TEST FAILED : ${testInfo.title}`);
      const logFile = testInfo.outputPath('error.log');

      fs.writeFileSync(logFile, logger.getLogs());

    }
    
  }
});