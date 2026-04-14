import { Locator, Page } from "@playwright/test";
export class AdminTopMenu {

    private readonly page:Page;
    private readonly userManagementMenu:Locator;
    private readonly jobMenu:Locator;
    private readonly organizationMenu:Locator;
    private readonly qualificationsMenu:Locator;
    private readonly nationalitiesMenu:Locator;
    private readonly corporateBrandingMenu:Locator;
    private readonly configurationMenu:Locator;

    constructor(page:Page){
        this.page = page;
        this.userManagementMenu = this.page.getByLabel('Topbar Menu').getByText('User Management');
        this.jobMenu = this.page.getByLabel('Topbar Menu').getByText('Job');
        this.organizationMenu = this.page.getByLabel('Topbar Menu').getByText('Organization');
        this.qualificationsMenu = this.page.getByLabel('Topbar Menu').getByText('Qualifications');
        this.nationalitiesMenu = this.page.getByLabel('Topbar Menu').getByText('Nationalities');
        this.corporateBrandingMenu = this.page.getByLabel('Topbar Menu').getByText('Corporate Branding');
        this.configurationMenu = this.page.getByLabel('Topbar Menu').getByText('Configuration');
    }   

    async clickUserManagementMenu():Promise<void>{
        await this.userManagementMenu.click();
    }
    async clickJobMenu():Promise<void>{
        await this.jobMenu.click();
    }
    async clickOrganizationMenu():Promise<void>{
        await this.organizationMenu.click();
    }
    
    async clickQualificationsMenu():Promise<void>{
        await this.qualificationsMenu.click();
    }
    async clickNationalitiesMenu():Promise<void>{
        await this.nationalitiesMenu.click();
    }       

    async clickCorporateBrandingMenu():Promise<void>{
        await this.corporateBrandingMenu.click();
    }
    async clickConfigurationMenu():Promise<void>{
        await this.configurationMenu.click();
    }   

}