import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';
import path from 'path';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
const envName = process.env.ENV;
const envPath = path.resolve(__dirname, `.env.${envName}`);
console.log(`Loading env file: ${envPath} (ENV=${envName})`);
dotenv.config({ path: envPath, override: true });
/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './src/tests',
  /* Run tests in files in parallel */
  fullyParallel: false,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    [process.env.CI ? 'dot' : 'list'],
    ['allure-playwright', { outputFolder: 'allure-results' }]
  ],
  //Global setup and teardown
  globalSetup: require.resolve('./globalSetup'),
  globalTeardown: require.resolve('./globalTeardown'),
  /* Timeout settings */
  timeout: 60 * 1000, // 60 seconds for each test
  expect: {
    timeout: 5000 // 5 seconds for each expect assertion
  },
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    baseURL: process.env.BASE_URL,// || 'https://opensource-demo.orangehrmlive.com',
      
    /* Run in Headed mode. */
    headless: !!process.env.CI,
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    /*Collect screenshots and videos when test fails and retrying the failed test. See https://playwright.dev/docs/video#record-video-only-on-failure */
    screenshot: 'only-on-failure',
    video: 'retry-with-video',
    /*Timeout for each action like `click()`, `fill()`, etc. */
    actionTimeout: 30 * 1000, // 30 seconds 
    /* Navigation timeout */ 
    navigationTimeout: 60 * 1000 // 30 seconds
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    /*
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    */
    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
