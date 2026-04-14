import { JobTitlePage } from '@pages/admin/job/jobTitle';
import {test, expect} from 'src/fixtures/baseFixture';

test.describe('Admin Job Title Tests', () => {

    test('Admin Job Title Page should be visible', async ({loginPage, dashboardPage, sideMenu, adminTopMenu, jobDropDown, jobTitlePage}) => {
        // Test implementation here
        await loginPage.navigate();
        await loginPage.login('Admin', 'admin123');
        await sideMenu.clickAdminTab();
        await adminTopMenu.clickJobMenu();
        await jobDropDown.clickJobTitlesOption();
        console.log("Admin Job Title Page should be visible");
        await expect (jobTitlePage.verifyJobTitleHeader()).toBeTruthy();
    });


});