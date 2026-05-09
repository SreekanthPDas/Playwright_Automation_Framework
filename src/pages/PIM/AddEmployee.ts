import {Page, Locator} from '@playwright/test';

export class AddEmployeePage{
    private readonly page:Page;
    private readonly firstNameInput:Locator;
    private readonly lastNameInput:Locator;
    private readonly employeeIdInput:Locator;
    private readonly saveButton:Locator;
    private readonly cancelButton:Locator;

    constructor(page:Page){
        this.page = page;
        this.firstNameInput = this.page.getByRole('textbox', { name: 'First Name' });
        this.lastNameInput = this.page.getByRole('textbox', { name: 'Last Name' });
        this.employeeIdInput = this.page.locator("//*[contains(text(),'Employee Id')]/parent::div/following-sibling::div//input");
        this.saveButton = this.page.getByRole('button', { name: 'Save' });
        this.cancelButton = this.page.getByRole('button', { name: 'Cancel' });
     }

        async enterEmployeeDetails(firstName: string, lastName: string):Promise<void>{
            await this.firstNameInput.fill(firstName);
            await this.lastNameInput.fill(lastName);
        }

        async clickSaveButton():Promise<void>{
            await this.saveButton.click();
            await this.page.waitForLoadState('networkidle');
        }
        async clickCancelButton():Promise<void>{
            await this.cancelButton.click();
        }
        async saveEmployee(firstName: string, lastName: string):Promise<void>{
            await this.enterEmployeeDetails(firstName, lastName);
            await this.page.waitForTimeout(1000);
            await this.clickSaveButton();
            await this.page.waitForLoadState('networkidle');
        }

        async getEmployeeId():Promise<string>{
            return await this.employeeIdInput.inputValue();
        }

}