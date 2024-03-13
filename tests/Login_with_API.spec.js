const {test, expect, request}=require("@playwright/test");
const loginPayload = {userEmail: "anshika@gmail.com", userPassword: "Iamking@000"};
let token;

test.beforeAll(async()=>{
    const APIcontext = await request.newContext();
    const Response = await APIcontext.post("https://rahulshettyacademy.com/api/ecom/auth/login", {data: loginPayload});
    await expect(Response.ok()).toBeTruthy();
    const ResponseJson = await Response.json();
    token = ResponseJson.token;
    console.log(token);
})

test('@Web Client App login', async ({ page }) => {
    //js file- Login js, 
    page.addInitScript(value=>{window.localStorage.setItem('token', value);}, token);
    await page.goto("https://rahulshettyacademy.com/client");
    // await page.locator("#userEmail").fill(email);
    // await page.locator("#userPassword").fill("Iamking@000");
    // await page.locator("[value='Login']").click();
    // await page.waitForLoadState('networkidle');
    const productName = 'ZARA COAT 3';
    const products = page.locator(".card-body");
    const titles = await page.locator(".card-body b").allTextContents();
    console.log(titles); 

    const count = await products.count();
    for (let i = 0; i < count; ++i) {
       if (await products.nth(i).locator("b").textContent() === productName) {
          //add to cart
          await products.nth(i).locator("text= Add To Cart").click();
          break;
       }
    }
  
    await page.locator("[routerlink*='cart']").click();
    //await page.pause();
    await page.locator("text=Checkout").click();
  
    await page.locator("[placeholder*='Country']").pressSequentially("ind");
  
    const dropdown = page.locator(".ta-results");
    await dropdown.waitFor();
    const optionsCount = await dropdown.locator("button").count();
    for (let i = 0; i < optionsCount; ++i) {
       const text = await dropdown.locator("button").nth(i).textContent();
       if (text === " India") {
          await dropdown.locator("button").nth(i).click();
          break;
       }
    }
  
    await page.locator(".action__submit").click();
    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
    const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log(orderId);
  
    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();
    const rows = await page.locator("tbody tr");
  
  
    for (let i = 0; i < await rows.count(); ++i) {
       const rowOrderId = await rows.nth(i).locator("th").textContent();
       if (orderId.includes(rowOrderId)) {
          await rows.nth(i).locator("button").first().click();
          break;
       }
    }
    const orderIdDetails = await page.locator(".col-text").textContent();
    expect(orderId.includes(orderIdDetails)).toBeTruthy();
  
 });