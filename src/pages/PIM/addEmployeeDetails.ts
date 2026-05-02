import {Page,Locator} from "@playwright/test";
export class AddEmployeeDetailsPage {
    private readonly page:Page;
    private readonly firstNameInput:Locator;
    private readonly lastNameInput:Locator;
    private readonly employeeIdInput:Locator;
    private readonly drivingLicenseInput:Locator;
    private readonly drivingLiceneseExpiryDateInput:Locator;
    private readonly nationalityInput:Locator;
    private readonly maritalStatusInput:Locator;
    private readonly dateOfBirthInput:Locator;
    private readonly genderMaleOption:Locator;
    private readonly genderFemaleOption:Locator;
    private readonly saveButton:Locator;

    constructor(page:Page){
        this.page = page;
        this.firstNameInput = this.page.getByRole('textbox', { name: 'First Name' });
        this.lastNameInput = this.page.getByRole('textbox', { name: 'Last Name' });
        this.employeeIdInput = this.page.locator("//*[contains(text(),'Employee Id')]/parent::div/following-sibling::div//input");
        this.drivingLicenseInput = this.page.locator("//*[contains(text(),'License')]/parent::div/following-sibling::*/input");
        this.drivingLiceneseExpiryDateInput = this.page.getByPlaceholder( 'yyyy-dd-mm' ).first();
        //this.nationalityInput = this.page.getByRole('list', { name: 'Nationality' });
        this.nationalityInput = this.page.locator("//*[contains(text(),'Nationality')]/parent::div/following-sibling::div");
        this.maritalStatusInput = this.page.locator("//*[contains(text(),'Marital Status')]/parent::div/following-sibling::div");
        //this.dateOfBirthInput = this.page.getByPlaceholder( 'yyyy-dd-mm' ).nth(2);
        this.dateOfBirthInput = this.page.locator("(//*[@class='oxd-icon bi-calendar oxd-date-input-icon'])[2]");   
        this.genderMaleOption = this.page.locator("//input[@type='radio' and @value=1]");
        this.genderFemaleOption = this.page.locator("//input[@type='radio' and @value=2]");
        this.saveButton = this.page.getByRole('button', { name: 'Save' });
     }  

     async enterEmployeeDetails(drivingLicense: string, drivingLicenseExpiry: string,nationality: string, maritalStatus: string, dateOfBirth: string, gender: 'Male' | 'Female'):Promise<void>{
        await this.drivingLicenseInput.click();
        await this.drivingLicenseInput.fill(drivingLicense);
        await this.drivingLiceneseExpiryDateInput.fill(drivingLicenseExpiry);
        
        await this.selectDropdownOption(this.nationalityInput, nationality);
        await this.selectDropdownOption(this.maritalStatusInput, maritalStatus);
        //await this.dateOfBirthInput.click();
        await this.selectDateOfBirth(dateOfBirth);
        await this.page.keyboard.press('Tab');
        if (gender === 'Male') {
            await this.genderMaleOption.scrollIntoViewIfNeeded();
            await this.genderMaleOption.click();
        } else {
            await this.genderFemaleOption.scrollIntoViewIfNeeded();
            await this.genderFemaleOption.click();
        }

        await this.page.waitForTimeout(3000);
    }

        async selectDropdownOption(dropdown: Locator, optionText: string): Promise<void> {
            await dropdown.click();
            const option = this.page.getByRole('option', { name: optionText });
            await option.click();
            await this.page.waitForLoadState('networkidle');
        }
        
        async clickSaveButton():Promise<void>{
            await this.saveButton.click();
            await this.page.waitForLoadState('networkidle');    
        }

        async selectDateOfBirth(dateOfBirth: string): Promise<void> {
            await this.dateOfBirthInput.click();
            const year = dateOfBirth.split('-')[0];
            const month = dateOfBirth.split('-')[1];
            const day = dateOfBirth.split('-')[2];
            const currentYear = new Date().getFullYear();
            const currentMonth = new Date().getMonth() + 1; // Months are zero-based
            await this.page.getByText(currentYear.toString()).first().click();
            await this.page.getByText(year).click();
            await this.selectMonthOnCalendar(this.page.getByText('May'), 'December');
            await this.page.locator('.oxd-calendar-date').getByText(day).click();
            await this.page.waitForLoadState('networkidle');
        }

        async selectMonthOnCalendar(dropDown:Locator, month: string): Promise<void> {
            await dropDown.click();
            const monthOption = this.page.getByText(month);
            await monthOption.click();
            await this.page.waitForLoadState('networkidle');
        }

    }