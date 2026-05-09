import {Page, Locator} from "@playwright/test";

export class JobTitlePage {
    private readonly page:Page;
    private readonly addButton:Locator;
    private readonly jobTitleTable:Locator;

    constructor(page:Page){
        this.page = page;
        this.addButton = this.page.getByRole('button', { name: 'Add' });
        this.jobTitleTable = this.page.getByRole('table');
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
        this.jobTitleTable.waitFor({ state: 'visible' });
        const rows = await this.jobTitleTable.getByRole('row').all();
        const rowData: string[][] = []; 
        console.log(`Total rows found in the Job Title table: ${rows.length}`);
        for (const row of rows) {
            const cells = await row.getByRole('cell').allTextContents();
            rowData.push(cells.map(cell => cell.trim()));
        }   
        return rowData;
    }

    async searchJobTitleInTable(jobTitle: string):Promise<boolean>{
        // Implementation for searching job title in the table
        console.log(await this.isJobTitleTableVisible());
        const rows = await this.getJobTitleTableRows();
        const found = rows.some(row => row.includes(jobTitle));
        if (!found) {
            console.log(`Job Title "${jobTitle}" not found in the table.`);
            return false;
        }else{  
            console.log(`Job Title "${jobTitle}" found in the table.`);
            return found;
        }
    }

}