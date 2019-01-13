const {By, until} = require('selenium-webdriver');


module.exports = class Page {
    
    // All Pages on the application will extend this class
    // This is to abstract the wait from the pages

    constructor(driver, timeout=5000) {
        this.driver = driver;
        this.timeout = timeout;
    }

    // Return the By object based locator strategy from Pages
    // Throw Exception in the event of invalid locator strategy
    _decodeLocator(locatorBy, locatorValue) {
        if(locatorBy == 'id') {
            return By.id(locatorValue);
        }
        else if(locatorBy == 'name') {
            return By.name(locatorValue);
        }
        else if(locatorBy == 'class') {
            return By.className(locatorValue);
        }
        else if(locatorBy == 'link') {
            return By.linkText(locatorValue);
        }
        else if(locatorBy == 'plink') {
            return By.partialLinkText(locatorValue);
        }
        else if(locatorBy == 'css') {
            return By.css(locatorValue);
        }
        else if(locatorBy == 'xpath') {
            return By.xpath(locatorValue);
        }
        else {
            throw 'Invalid Locator';
        }
    }

    // Find and return webelement
    async webElement(locatorBy, locatorValue) {
        
        // Wait till the element is located in the dom
        const element = await this.driver.wait(
            until.elementLocated(this._decodeLocator(locatorBy, locatorValue)), this.timeout
        );
        
        // Then wait till the element is visible
        await this.driver.wait(
            until.elementIsVisible(element), this.timeout
        );

        return element;
    }

    // Find and return webelements
    async webElements(locatorBy, locatorValue) {
        
        // Wait till the elements is located in the dom
        const elements = await this.driver.wait(
            until.elementsLocated(this._decodeLocator(locatorBy, locatorValue)), this.timeout
        );
 
        return elements;
    }
}