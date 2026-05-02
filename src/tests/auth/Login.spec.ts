import { test } from '../../fixtures/baseFixture';
import { expect } from '@playwright/test';
import { PageManager } from 'src/pageManager/pageManager';
import loginData from '@test-data/auth/login.json';


test('User can login with valid credentials', async ({ page, logger }) => {
    const pageManager = new PageManager(page);
    const loginPage = await pageManager.getLoginPage();
    logger.info('Navigating to login page');
    await loginPage.navigate();
    logger.info('Attempting to login with valid credentials');
    const { username, password } = loginData.validLogin;
    await loginPage.login(username, password);
    const dashboardPage = await pageManager.getDashboardPage();
    await page.waitforTimeout(3000);
    expect(await dashboardPage.timeAtWorkTextIsDisplayed()).toBeTruthy();
    logger.info('Login successful, dashboard page is displayed');
});

test('User cannot login with invalid credentials', async ({ page, logger }) => {
    const pageManager = new PageManager(page);
    const loginPage = await pageManager.getLoginPage();
    logger.info('Navigating to login page');
    await loginPage.navigate();
    const { username, password, expectedErrorMessage } = loginData.invalidLogin;
    await loginPage.login(username, password);
    const dashboardPage = await pageManager.getDashboardPage();
    await page.waitForTimeout(3000);
    expect(await loginPage.getErrorMessage()).toContain(expectedErrorMessage);
    logger.info('Login failed as expected, error message is displayed');
});

test('Sample test to fail to check failure logs', async ({ page, logger }) => {
    const pageManager = new PageManager(page);
    const loginPage = await pageManager.getLoginPage();
    logger.info('Navigating to login page');
    await loginPage.navigate();
    //expect (await loginPage.).toBe('This test is designed to fail');
    //logger.info('This log will be captured even on test failure');
});

test('Test to check failure logs', async ({ page, logger }) => {
    const pageManager = new PageManager(page);
    const loginPage = await pageManager.getLoginPage();
    logger.info('Navigating to user login page');
    await loginPage.navigate();
    expect (await loginPage.getErrorMessage()).toBe('');
    logger.info('Check if this message is captured in the logs on test failure');
});