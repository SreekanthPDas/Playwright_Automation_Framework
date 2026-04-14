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

type TestFixtures = {
  logger: TestLogger;
  loginPage:LoginPage;
  dashboardPage: DashBoardPage;
  sideMenu: SideMenu;
  adminTopMenu: AdminTopMenu;
  jobDropDown: JobDropDown;
  jobTitlePage: JobTitlePage;
};

export const test = base.extend<TestFixtures>({
  loginPage: async({page}, use)=>{
    await use(new LoginPage(page));
  },
  dashboardPage: async({page}, use)=>{
    await use(new DashBoardPage(page));
  },
  sideMenu: async({page}, use)=>{
    await use(new SideMenu(page));
  },
  adminTopMenu: async({page}, use)=>{
    await use(new AdminTopMenu(page));
  },
  jobDropDown: async({page}, use)=>{
    await use(new JobDropDown(page));
  },
  jobTitlePage: async({page}, use)=>{
    await use(new JobTitlePage(page));
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