import { Page, Locator } from '@playwright/test';

export class LoginPage{
    private readonly page: Page;
    private readonly usernameInput: Locator;
    private readonly passwordInput: Locator;
    private readonly loginButton: Locator;
    private readonly errorMessage: Locator;
    constructor(page: Page) {
        this.page = page;
        this.usernameInput = page.getByRole('textbox',{name:'Username'});
        this.passwordInput = page.getByRole('textbox',{name:'Password'});
        this.loginButton = page.getByRole('button',{name:'Login'});
        this.errorMessage = page.getByText(/Invalid/);
    }

    async navigate() {
        await this.page.goto("/web/index.php/auth/login",{waitUntil: "domcontentloaded",});
        //await this.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        await this.page.waitForLoadState('networkidle');
        console.log("BASE_URL:", process.env.BASE_URL);
    }   

    async enterUsername(username: string) {
    await this.usernameInput.fill(username);
}

async enterPassword(password: string) {
    await this.passwordInput.fill(password);
}

async clickLogin() {
    await this.loginButton.click();
}

    async login(username: string, password: string): Promise<void> {
        await this.enterUsername(username);
        await this.enterPassword(password);
        await this.clickLogin();
        await this.page.waitForLoadState('networkidle');
    }

    async getErrorMessage(): Promise<string> {
        // Check if error message is visible before getting text content
        if (await this.errorMessage.isVisible()) {
            return await this.errorMessage.textContent() || '';
        }
        return '';
    }

}