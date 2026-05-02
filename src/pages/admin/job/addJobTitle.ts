import {Page, Locator} from '@playwright/test';
import { expect } from 'src/fixtures/baseFixture';

export class addJobTitlePage {
    private readonly page:Page;
    private readonly jobTitleInput:Locator;
    private readonly jobDescriptionInput:Locator;
    private readonly jobSpecificationInput:Locator;
    private readonly noteInput:Locator;
    private readonly saveButton:Locator
    private readonly cancelButton:Locator;

    constructor(page:Page){
        this.page = page;
        this.jobTitleInput = this.page.locator("//label[contains(text(),'Job Title')]/parent::*/following-sibling::div//input");
        this.jobDescriptionInput = this.page.getByRole('textbox', { name: 'Type description here' });
        this.jobSpecificationInput = this.page.getByRole('button', { name: 'Choose File' })
        this.noteInput = this.page.getByRole('textbox', { name: 'Add note' });
        this.saveButton = this.page.getByRole('button', { name: 'Save' });
        this.cancelButton = this.page.getByRole('button', { name: 'Cancel' });
     }

        async enterJobTitleDetails(jobTitle: string, jobDescription: string, jobSpecification: string, note: string):Promise<void>{ 
            await this.jobTitleInput.fill(jobTitle);
            await this.jobDescriptionInput.fill(jobDescription);
            await this.jobSpecificationInput.setInputFiles(jobSpecification);
            await this.noteInput.fill(note);
        }

        async clickSaveButton():Promise<void>{
            this.saveButton.click()
            //await this.page.waitForLoadState('networkidle');
            //await this.page.locator('.spinner, .loading').waitFor({ state: 'hidden' });
            await expect (this.page.locator("//div[@role='table']")).toBeVisible({ timeout: 10000 }); // Wait for the table to be visible after saving
            await this.page.waitForTimeout(3000); // Additional wait to ensure the table is fully loaded
            const html = await this.page.content();
            console.log('page-source', {
            body: html,
            contentType: 'text/html',
            });
        }
        async clickCancelButton():Promise<void>{
            await this.cancelButton.click();    
        }

        async saveJobTitle(jobTitle: string, jobDescription: string, jobSpecificationFilePath: string, note: string):Promise<void>{
            await this.enterJobTitleDetails(jobTitle, jobDescription, jobSpecificationFilePath, note);
            await this.clickSaveButton();
        }

    }