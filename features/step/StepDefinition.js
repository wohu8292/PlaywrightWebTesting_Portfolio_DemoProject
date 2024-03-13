const playwright = require('@playwright/test');
const {expect} = require("@playwright/test");	
const{POManager} = require("../../pageObjects/POManager");
const{Given, When, Then} = require('@cucumber/cucumber')
//npx cucumber-js --tags "@Regression" --format html:cucumber-report.html --exit

Given('a login to Ecommerce application with {string} and {string}', {timeout: 100*1000}, async function (username, password) {
    //login page
    const loginpage = this.poManager.getLoginPage();
    await loginpage.goTo();
    await loginpage.validLogin(username, password);
});

When('add {string} to Cart', async function (productName) {
    //product catalogue page
    this.productcatalogue = this.poManager.getProductCataloguePage();
    await this.productcatalogue.searchProduct(productName);
    await this.productcatalogue.navigateToCart();
});

Then('Verify {string} is displayed in the cart', async function (productName) {
    //cart page
    const cartPage = this.poManager.getCartPage();
    await cartPage.VerifyProductIsDisplayed(productName);
    await cartPage.Checkout();
});

When('Enter valid details and place the order', async function () {
    //order review page
    const orderReviewPage = this.poManager.getOrderReviewPage();
    await orderReviewPage.searchCountryAndSelect("ind", "India");
    this.orderID = await orderReviewPage.SubmitAndGetOrderId();
    console.log(this.orderID);
});

Then('Verify order in present in the order history', async function () {
    //order history page
    const orderhistorypage = this.poManager.getOrderHistoryPage();
    await this.productcatalogue.navigateToOrder();
    await orderhistorypage.searchOrderAndSelect(this.orderID);
    expect(this.orderID.includes(await orderhistorypage.getOrderId())).toBeTruthy();
});