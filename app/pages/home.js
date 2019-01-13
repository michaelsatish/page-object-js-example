const Page = require('../../page');

module.exports = class Home extends Page {
    constructor(driver) {
        super(driver);
    }

    // Search for a product
    // And click on 'Go'
    async searchProduct(productName) {
        let search = await this.webElement('id', 'twotabsearchtextbox');
        await search.sendKeys(productName);

        let submit = await this.webElement('css', 'input[type="submit"][value="Go"]');
        await submit.click();
    }
}