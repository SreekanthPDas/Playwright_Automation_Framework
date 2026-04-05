import { Page } from '@playwright/test';
import { LoginPage } from '../../pages/auth/LoginPage';
import { DashBoardPage } from '../../pages/dashboard/DashBoardPage';

export class PageManager{

    private readonly page: Page;
    private loginPage?: LoginPage;
    private dashboardPage?: DashBoardPage;

    constructor(page: Page) {
        this.page = page;
    }

    async getLoginPage(): Promise<LoginPage> {
        if(!this.loginPage) {
            this.loginPage = new LoginPage(this.page);
        }       
        return this.loginPage;
    }

    async getDashboardPage(): Promise<DashBoardPage> {
        if(!this.dashboardPage) {
            this.dashboardPage = new DashBoardPage(this.page);
        }       
        return this.dashboardPage;
    }   
}