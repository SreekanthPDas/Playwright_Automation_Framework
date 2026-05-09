import { test as base, Fixtures } from '@playwright/test';
import fs from 'fs';
import { TestLogger } from '../utils/logger/testLogger';
import { runLogger } from '../utils/logger/runLogger';
import { LoginPage } from '@pages/auth/LoginPage';
import { DashBoardPage } from '@pages/dashboard/DashBoardPage';
import { SideMenu } from 'src/components/SideMenu';
import { AdminTopMenu } from 'src/components/admin/adminTopMenu';
import { JobDropDown } from 'src/components/admin/jobDropDown';
import { JobTitlePage } from '@pages/admin/job/jobTitle';
import { addJobTitlePage } from '@pages/admin/job/addJobTitle';
import { PageManager } from '@pageManager/pageManager';

type TestFixtures = {
  logger: TestLogger;
  pageManager: PageManager;
};

export const test = base.extend<TestFixtures>({
   pageManager: async ({ page }, use) => {
    const pageManager = new PageManager(page);
    await use(pageManager);
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

export const expect = test.expect;