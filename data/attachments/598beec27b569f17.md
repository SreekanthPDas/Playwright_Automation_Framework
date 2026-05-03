# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: auth/Login.spec.ts >> Test to check failure logs
- Location: src/tests/auth/Login.spec.ts:43:5

# Error details

```
TimeoutError: page.goto: Timeout 30000ms exceeded.
Call log:
  - navigating to "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login", waiting until "load"

```

# Test source

```ts
  1  | import { Page, Locator } from '@playwright/test';
  2  | 
  3  | export class LoginPage{
  4  |     private readonly page: Page;
  5  |     private readonly usernameInput: Locator;
  6  |     private readonly passwordInput: Locator;
  7  |     private readonly loginButton: Locator;
  8  |     private readonly errorMessage: Locator;
  9  |     constructor(page: Page) {
  10 |         this.page = page;
  11 |         this.usernameInput = page.getByRole('textbox',{name:'Username'});
  12 |         this.passwordInput = page.getByRole('textbox',{name:'Password'});
  13 |         this.loginButton = page.getByRole('button',{name:'Login'});
  14 |         this.errorMessage = page.getByText(/Invalid/);
  15 |     }
  16 | 
  17 |     async navigate() {
> 18 |         await this.page.goto("/web/index.php/auth/login");
     |                         ^ TimeoutError: page.goto: Timeout 30000ms exceeded.
  19 |         //await this.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  20 |         await this.page.waitForLoadState('networkidle');
  21 |     }   
  22 | 
  23 |     async enterUsername(username: string) {
  24 |     await this.usernameInput.fill(username);
  25 | }
  26 | 
  27 | async enterPassword(password: string) {
  28 |     await this.passwordInput.fill(password);
  29 | }
  30 | 
  31 | async clickLogin() {
  32 |     await this.loginButton.click();
  33 | }
  34 | 
  35 |     async login(username: string, password: string): Promise<void> {
  36 |         await this.enterUsername(username);
  37 |         await this.enterPassword(password);
  38 |         await this.clickLogin();
  39 |         await this.page.waitForLoadState('networkidle');
  40 |     }
  41 | 
  42 |     async getErrorMessage(): Promise<string> {
  43 |         // Check if error message is visible before getting text content
  44 |         if (await this.errorMessage.isVisible()) {
  45 |             return await this.errorMessage.textContent() || '';
  46 |         }
  47 |         return '';
  48 |     }
  49 | 
  50 | }
```