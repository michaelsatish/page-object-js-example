const Page = require('../../page');

module.exports = class Results extends Page {
    constructor(driver) {
        super(driver);
    }

    // Get Branding Headline
    async brandingHeadline() {
        let element = await this.webElement('id', 'pdagDesktopSparkleHeadline');
        return await element.getText();
    }
}