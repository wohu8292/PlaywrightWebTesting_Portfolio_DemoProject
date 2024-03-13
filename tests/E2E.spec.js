const{test, expect} = require("@playwright/test");
const{POManager} = require("../pageObjects/POManager");
const dataSet = JSON.parse(JSON.stringify(require("../testData/example_Data.json")));
//npx playwright test tests/E2E.spec.js --debug

for(const data of dataSet){
test(`Client App Login for ${data.productName}`, async({page})=>{
    const poManager = new POManager(page);

    // const email = "anshika@gmail.com";
    // const password = "Iamking@000";
    // const productName = "Zara Coat 4";

    //login page
    const loginpage = poManager.getLoginPage();
    await loginpage.goTo();
    await loginpage.validLogin(data.username, data.password);

    //product catalogue page
    const productcatalogue = poManager.getProductCataloguePage();
    await productcatalogue.searchProduct(data.productName);
    await productcatalogue.navigateToCart();

    //cart page
    const cartPage = poManager.getCartPage();
    await cartPage.VerifyProductIsDisplayed(data.productName);
    await cartPage.Checkout();

    //order review page
    const orderReviewPage = poManager.getOrderReviewPage();
    await orderReviewPage.searchCountryAndSelect("ind", "India");
    const orderID = await orderReviewPage.SubmitAndGetOrderId();
    console.log(orderID);

    //order history page
    const orderhistorypage = poManager.getOrderHistoryPage();
    await productcatalogue.navigateToOrder();
    await orderhistorypage.searchOrderAndSelect(orderID);
    expect(orderID.includes(await orderhistorypage.getOrderId())).toBeTruthy();
})}