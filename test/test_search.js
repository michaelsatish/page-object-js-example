const webdriver = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const assert = require('chai').assert;

// Import Pages
const Home = require('../app/pages/home');
const Results = require('../app/pages/results')

// Chrome Options
let options = new chrome.Options();
options.addArguments('--start-maximized');

// Url and disable webdriver promise manager
const url = 'https://www.amazon.com/';
webdriver.promise.USE_PROMISE_MANAGER = false;

// Test
describe('Test Amazon Search Functionality', function() {
    let driver;
    let home;
    let results;

    beforeEach(async function() {
        driver = await new webdriver.Builder().forBrowser('chrome').setChromeOptions(options).build();
        await driver.get(url);
        
        // Initialize Pages
        home = new Home(driver);
        results = new Results(driver);
    });

    afterEach(async function() {
        await driver.quit();
    });

    it('Search for legos and assert on lego store text', async function() {
        home.searchProduct('legos');
        const headline = await results.brandingHeadline()
        assert.equal(
            headline,
            'Shop the Official LEGO Store for the Perfect Gift'
        );
    });
});