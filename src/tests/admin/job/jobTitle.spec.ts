import { JobTitlePage } from '@pages/admin/job/jobTitle';
import {test, expect} from 'src/fixtures/baseFixture';

test.describe('Admin Job Title Tests', () => {
    test.beforeEach(async ({pageManager}) => {
        const loginPage = await pageManager.getLoginPage();
        const sideMenu = await pageManager.getSideMenu();
        const adminTopMenu = await pageManager.getAdminTopMenu();
        const jobDropDown = await pageManager.getJobDropDown();
        const jobTitlePage = await pageManager.getJobTitlePage();

        await loginPage.navigate();
        await loginPage.login('Admin', 'admin123');
        await sideMenu.clickAdminTab();
        await adminTopMenu.clickJobMenu();
        await jobDropDown.clickJobTitlesOption();
    });

    test.skip('@smoke Admin Job Title Page should be visible', async ({pageManager}) => {
        
        const jobTitlePage = await pageManager.getJobTitlePage();

        // Test implementation here    
        console.log("Admin Job Title Page should be visible");
        await expect (jobTitlePage.verifyJobTitleHeader()).toBeTruthy();
    });

    test.skip('Search if a Jobtitle is already existing', async ({pageManager}) => {
        
        const jobTitlePage = await pageManager.getJobTitlePage();

        // Test implementation here
        console.log("Search if a Jobtitle is already existing");
        expect (await jobTitlePage.searchJobTitleInTable('Pre-Sales Coordinator')).toBeTruthy();
    });
    test('@smoke Add a new Job Title', async ({pageManager,logger}) => {
        
        const jobTitlePage = await pageManager.getJobTitlePage();
        const addJobTitlePage = await pageManager.getAddJobTitlePage();

        // Test implementation here
        logger.info("Search if a Jobtitle is already existing");
        expect (await jobTitlePage.searchJobTitleInTable('Test Job Title')).toBeFalsy();
        logger.info("Job Title does not exist, proceeding to add a new Job Title - Test Job Title");
        await jobTitlePage.clickAddButton();
        const filePath = 'src/test-data/admin/job/15.txt';
        await addJobTitlePage.saveJobTitle('Test Job Title', 'This is a test job description', filePath, 'This is a note for the test job title');
        logger.info("Added a new Job Title");
        expect (await jobTitlePage.searchJobTitleInTable('Test Job Title')).toBeTruthy();
        logger.info("Verified that the new Job Title is added successfully");
    });

});