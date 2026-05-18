class BasePage {
    constructor(page) {
        this.page = page;
    }
    
    async navigate(path = '') {
        await this.page.goto(`https://www.saucedemo.com/${path}`);
    }

    async waitForPageLoad() {
        await this.page.waitForLoadState('networkidle');
    }

    async getPageTitle() {
        return await this.page.title();
    }

    /**
     * Custom click wrapper that ensures visibility first.
     */
    async clickElement(locator) {
        await this.waitForElement(locator);
        await locator.click();
    }

    /**
     * Clear an input field safely before typing into it.
     */
    async typeText(locator, text) {
        await this.waitForElement(locator);
        await locator.fill(''); // Clear existing text
        await locator.fill(text);
    }
}

export default BasePage;