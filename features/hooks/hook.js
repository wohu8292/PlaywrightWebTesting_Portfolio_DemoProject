const playwright = require('@playwright/test');
const{POManager} = require("../../pageObjects/POManager");
const{Before, AfterStep, Status} = require('@cucumber/cucumber')


Before(async function() {
        // bring context
        const browser = await playwright.chromium.launch({
            headless: false
        });
        
        const context = await browser.newContext();
        this.page = await context.newPage();
        this.poManager = new POManager(this.page);
});


AfterStep(async function({result}){
    if(result.status === Status.FAILED){
        await this.page.screenshot({path: "cucumber_failed_page.png"});
    }
});