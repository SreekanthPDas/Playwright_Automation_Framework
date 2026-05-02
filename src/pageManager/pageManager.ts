import { Page } from '@playwright/test';
import { LoginPage } from '../pages/auth/LoginPage';
import { DashBoardPage } from '../pages/dashboard/DashBoardPage';
import { SideMenu } from 'src/components/SideMenu';
//Admin related pages and components
import { AdminTopMenu } from 'src/components/admin/adminTopMenu';
import { JobDropDown } from 'src/components/admin/jobDropDown';
import { JobTitlePage } from '@pages/admin/job/jobTitle';
import { addJobTitlePage } from '@pages/admin/job/addJobTitle';
import { AddEmployeePage } from '@pages/PIM/AddEmployee';
import { PIMTopMenu } from 'src/components/PIM/PIMTopMenu';
import { AddEmployeeDetailsPage } from '@pages/PIM/addEmployeeDetails';

export class PageManager{
    private readonly page: Page;
    private loginPage?: LoginPage;
    private dashboardPage?: DashBoardPage;
    private sideMenu?: SideMenu;
    private adminTopMenu?: AdminTopMenu;
    //Admin Job related pages and components
    private jobDropDown?: JobDropDown;
    private jobTitlePage?: JobTitlePage;
    private addJobTitlePage?: addJobTitlePage;
    //PIM related pages and components can be added here
    private pimTopMenu?: PIMTopMenu;
    private addEmployeePage?: AddEmployeePage;
    private addEmployeeDetailsPage?: AddEmployeeDetailsPage;

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
    
    async getSideMenu(): Promise<SideMenu> {
        if(!this.sideMenu) {
            this.sideMenu = new SideMenu(this.page);
        }
        return this.sideMenu;
    }

    async getAdminTopMenu(): Promise<AdminTopMenu> {
        if(!this.adminTopMenu) {
            this.adminTopMenu = new AdminTopMenu(this.page);
        }
        return this.adminTopMenu;
    }

    async getJobDropDown(): Promise<JobDropDown> {
        if(!this.jobDropDown) {
            this.jobDropDown = new JobDropDown(this.page);
        }
        return this.jobDropDown;
    }

    async getJobTitlePage(): Promise<JobTitlePage> {
        if(!this.jobTitlePage) {
            this.jobTitlePage = new JobTitlePage(this.page);
        }
        return this.jobTitlePage;
    }

    async getAddJobTitlePage(): Promise<addJobTitlePage> {
        if(!this.addJobTitlePage) {
            this.addJobTitlePage = new addJobTitlePage(this.page);
        }
        return this.addJobTitlePage;
    }
    //PIM related page getters can be added here
    async getPIMTopMenu(): Promise<PIMTopMenu> {
        if(!this.pimTopMenu) {
            this.pimTopMenu = new PIMTopMenu(this.page);
        }
        return this.pimTopMenu;
    }

    async getAddEmployeePage(): Promise<AddEmployeePage> {
        if(!this.addEmployeePage) {
            this.addEmployeePage = new AddEmployeePage(this.page);
        }
        return this.addEmployeePage;
    }

    async getAddEmployeeDetailsPage(): Promise<AddEmployeeDetailsPage> {
        if(!this.addEmployeeDetailsPage) {
            this.addEmployeeDetailsPage = new AddEmployeeDetailsPage(this.page);
        }   
        return this.addEmployeeDetailsPage;
    }
}