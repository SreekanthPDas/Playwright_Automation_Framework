import { Page,Locator } from "@playwright/test";

export class SideMenu {

    private readonly page:Page;
    private readonly searchTab:Locator;
    private readonly adminTab:Locator;
    private readonly pimTab:Locator;
    private readonly leaveTab:Locator;
    private readonly timeTab:Locator;
    private readonly recruitmentTab:Locator;
    private readonly myInfoTab:Locator;
    private readonly performanceTab:Locator;
    private readonly dashboardTab:Locator;
    private readonly directoryTab:Locator;
    private readonly maintenanceTab:Locator;
    private readonly buzzTab:Locator;

    constructor(page:Page){
        this.page = page;
    this.searchTab = this.page.getByRole('button', { name: 'Search' });
    this.adminTab = this.page.getByRole('link', { name: 'Admin' });
    this.pimTab = this.page.getByRole('link', { name: 'PIM' });
    this.leaveTab = this.page.getByRole('link', { name: 'Leave' });
    this.timeTab = this.page.getByRole('link', { name: 'Time' });
    this.recruitmentTab = this.page.getByRole('link', { name: 'Recruitment' });
    this.myInfoTab = this.page.getByRole('link', { name: 'My Info' });
    this.performanceTab = this.page.getByRole('link', { name: 'Performance' });
    this.dashboardTab = this.page.getByRole('link', { name: 'Dashboard' });
    this.directoryTab = this.page.getByRole('link', { name: 'Directory' });
    this.maintenanceTab = this.page.getByRole('link', { name: 'Maintenance' });
    this.buzzTab = this.page.getByRole('link', { name: 'Buzz' });
    }

    async clickAdminTab():Promise<void>{
        await this.adminTab.click();
    }   
    async clickPimTab():Promise<void>{
        await this.pimTab.click();
    }

    async clickLeaveTab():Promise<void>{
        await this.leaveTab.click();
    }
    async clickTimeTab():Promise<void>{
        await this.timeTab.click();
    }
    async clickRecruitmentTab():Promise<void>{
        await this.recruitmentTab.click();
    }

    async clickMyInfoTab():Promise<void>{
        await this.myInfoTab.click();
    }   
    async clickPerformanceTab():Promise<void>{
        await this.performanceTab.click();
    }
    async clickDashboardTab():Promise<void>{
        await this.dashboardTab.click();
    }
    async clickDirectoryTab():Promise<void>{
        await this.directoryTab.click();
    }   
    async clickMaintenanceTab():Promise<void>{
        await this.maintenanceTab.click();
    }
    async clickBuzzTab():Promise<void>{
        await this.buzzTab.click();
    }
}