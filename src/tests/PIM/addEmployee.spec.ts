import {test, expect} from '../../fixtures/baseFixture';
import { PIMTopMenu } from '../../components/PIM/PIMTopMenu';
import { get } from 'node:http';
import { getTimeStamp } from '@utils/generalUtils';

test.describe('PIM Module Tests', () => {

    test.beforeEach(async ({pageManager}) => {
        const loginPage = await pageManager.getLoginPage();
        const sideMenu = await pageManager.getSideMenu();
        await loginPage.navigate();
        await loginPage.login('Admin', 'admin123');
        await sideMenu.clickPimTab();

    });

    test('Add a new Employee', async ({pageManager,logger}) => {
        logger.info('Starting test: Add a new Employee');
        const pimTopMenu = await pageManager.getPIMTopMenu();
        const addEmployeePage = await pageManager.getAddEmployeePage();
        await pimTopMenu.clickAddEmployeeMenu();
        await addEmployeePage.saveEmployee('Meesha', 'Vaasu' + getTimeStamp());
        const employeeId = await addEmployeePage.getEmployeeId();
        logger.info(`New employee created with ID: ${employeeId}`);
        console.log(`New employee created with ID: ${employeeId}`);

        //Complete Filling the Employee Details page and save the employee, then verify employee is created successfully by checking the employee id is generated and not empty
        const employeeDetailsPage = await pageManager.getAddEmployeeDetailsPage();
        await employeeDetailsPage.enterEmployeeDetails('DL189759', '2034-12-23', 'Indian', 'Married', '1990-05-15', 'Male');
        await employeeDetailsPage.clickSaveButton();    
        expect(employeeId).not.toBe('');
    });

});