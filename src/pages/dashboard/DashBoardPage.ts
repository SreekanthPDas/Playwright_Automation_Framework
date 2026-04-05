import {Page,Locator} from '@playwright/test';

export class DashBoardPage {
  readonly page: Page;
  readonly timeAtWorkText: Locator;
  readonly iElement: Locator;
  readonly myActionsText: Locator;

  constructor(page: Page) {
    this.page = page;
    this.timeAtWorkText = page.getByText('Time at Work', { exact: true });
    this.iElement = page.locator(`.oxd-icon`);
    this.myActionsText = page.getByText('My Actions');
  }

  async timeAtWorkTextIsDisplayed(): Promise<boolean> {
    return await this.timeAtWorkText.isVisible();
  }

  async clickIelement(): Promise<void> {
    await this.iElement.click();
  }

  async clickMyactionstext(): Promise<void> {
    await this.myActionsText.click();
  }

}
      
