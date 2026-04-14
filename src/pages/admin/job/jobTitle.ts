import {Page, Locator} from "@playwright/test";

export class JobTitlePage {
    private readonly page:Page;
    private readonly addButton:Locator;
    private readonly jobTitleTable:Locator;

    constructor(page:Page){
        this.page = page;
        this.addButton = this.page.getByRole('button', { name: 'Add' });
        this.jobTitleTable = this.page.getByRole('table', { name: 'Job Titles' });
     }

     async verifyJobTitleHeader():Promise<boolean>{
        const headers = await this.getJobTitleTableHeaders();
        return headers.includes('Job Title');
    }   

    async clickAddButton():Promise<void>{
        await this.addButton.click();   
    
    } 
    
    async isJobTitleTableVisible():Promise<boolean>{
        return await this.jobTitleTable.isVisible();
    }

    async getJobTitleTableHeaders():Promise<string[]>{
        const headers = await this.jobTitleTable.locator('thead tr th').allTextContents();
        return headers.map(header => header.trim());
    }

    async getJobTitleTableRows():Promise<string[][]>{
        const rows = await this.jobTitleTable.locator('tbody tr').all();
        const rowData: string[][] = []; 
        for (const row of rows) {
            const cells = await row.locator('td').allTextContents();
            rowData.push(cells.map(cell => cell.trim()));
        }   
        return rowData;
    }
}