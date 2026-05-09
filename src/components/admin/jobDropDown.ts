import {Page, Locator} from "@playwright/test";

export class JobDropDown {
    private readonly page:Page;
    private readonly jobTitlesOption:Locator;
    private readonly pageGradesOption:Locator;
    private readonly employmentStatusOption:Locator;
    private readonly jobCategoriesOption:Locator;  
    private readonly workShiftsOption:Locator;
    
    constructor(page:Page){
        this.page = page;
        this.jobTitlesOption = this.page.getByRole('menuitem', { name: 'Job Titles' }); 
        this.pageGradesOption = this.page.getByRole('menuitem', { name: 'Page Grades' });
        this.employmentStatusOption = this.page.getByRole('menuitem', { name: 'Employment Status' });
        this.jobCategoriesOption = this.page.getByRole('menuitem', { name: 'Job Categories' });
        this.workShiftsOption = this.page.getByRole('menuitem', { name: 'Work Shifts' });
    }

    async clickJobTitlesOption():Promise<void>{
        await this.jobTitlesOption.click();
        await this.page.waitForLoadState('networkidle');
    }
    async clickPageGradesOption():Promise<void>{
        await this.pageGradesOption.click();
        await this.page.waitForLoadState('networkidle');
    }
    async clickEmploymentStatusOption():Promise<void>{
        await this.employmentStatusOption.click();
        await this.page.waitForLoadState('networkidle');
    }
    async clickJobCategoriesOption():Promise<void>{
        await this.jobCategoriesOption.click();
        await this.page.waitForLoadState('networkidle');
    }
    async clickWorkShiftsOption():Promise<void>{
        await this.workShiftsOption.click();
        await this.page.waitForLoadState('networkidle');
    }
}
