import { runLogger } from './src/utils/logger/runLogger';
import { execSync } from 'child_process';
import { FullConfig } from '@playwright/test';
import fs from 'fs';
import path from 'path';

export default async function globalSetup(config:FullConfig) {

  const env = process.env.TEST_ENV || 'QA';
  const browser = config.projects[0].name;
  const workers = config.workers;
  const branch = process.env.BRANCH_NAME || 'local-branch';
  const commit = process.env.COMMIT_ID || 'local-commit';
  const buildId = process.env.BUILD_ID || 'LOCAL';

  const envData = `
        Environment=${process.env.ENV}
        Browser=${process.env.BROWSER}
        BaseURL=${process.env.BASE_URL}
        Tester=Sreekanth
`;
  //const branch = execSync('git rev-parse --abbrev-ref HEAD').toString().trim()|| 'unknown-branch'   ;
  //const commit = execSync('git rev-parse --short HEAD').toString().trim()|| 'unknown-commit'   ;
//  const buildId = process.env.BUILD_ID || 'LOCAL';

  const startTime = new Date().toLocaleTimeString();

  runLogger.info('=============================');
  runLogger.info('Test Run Started');
  runLogger.info('=============================');
  runLogger.info('');
  runLogger.info(`Environment : ${env}`);
  runLogger.info(`Browser     : ${browser}`);
  runLogger.info(`Workers     : ${workers}`);
  runLogger.info(`Branch      : ${branch}`);
  runLogger.info(`Commit      : ${commit}`);
  runLogger.info(`Build ID    : ${buildId}`);
  runLogger.info(`Start Time  : ${startTime}`);
  runLogger.info('');
  runLogger.info('=============================');

  const resultsDir = path.join(process.cwd(), 'allure-results');

  if (!fs.existsSync(resultsDir)) {
    fs.mkdirSync(resultsDir);
  }

  fs.writeFileSync(
    path.join(resultsDir, 'environment.properties'),
    envData
  );
}