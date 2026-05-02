import {Page,Locator} from "@playwright/test";

export class PIMTopMenu {
    private readonly page:Page;
    private readonly configurationsMenu:Locator;
    private readonly employeeListMenu:Locator;
    private readonly addEmployeeMenu:Locator;
    private readonly reportsMenu:Locator;

    constructor(page:Page){
        this.page = page;
        this.configurationsMenu = this.page.getByLabel('Topbar Menu').getByText('Configuration');
        this.employeeListMenu = this.page.getByLabel('Topbar Menu').getByText('Employee List');
        this.addEmployeeMenu = this.page.getByLabel('Topbar Menu').getByText('Add Employee');
        this.reportsMenu = this.page.getByLabel('Topbar Menu').getByText('Reports');
    }

    async clickConfigurationsMenu():Promise<void>{
        await this.configurationsMenu.click();
    }
    async clickEmployeeListMenu():Promise<void>{
        await this.employeeListMenu.click();
    }
    async clickAddEmployeeMenu():Promise<void>{
        await this.addEmployeeMenu.click();
    }
    async clickReportsMenu():Promise<void>{
        await this.reportsMenu.click();
    }
    
}