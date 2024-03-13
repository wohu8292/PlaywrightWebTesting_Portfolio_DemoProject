const{test, expect} = require("@playwright/test");

test("Parent Window Handle", async({page})=>{
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const userName = page.locator('#username');
    const signIn = page.locator('#signInBtn');
    const dropdown = page.locator('select.form-control');
    await dropdown.selectOption('consult');
    await page.locator('.radiotextsty').last().click();
    await page.locator('#okayBtn').click();
    expect(page.locator('.radiotextsty').last()).toBeChecked();
    await page.locator('#terms').click();
})


test('@Child Window Handle', async({browser})=>{
    const context = await browser.newContext();
    const page = await context.newPage();
    const userName = await page.locator('#username');
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const documentLink = page.locator("[href*='documents-request']");

    const [newPage] = await Promise.all([
        context.waitForEvent('page'),               //Trigger Listener when page is opened.
        documentLink.click(),
    ])

    const text = await newPage.locator(".red").textContent();
    const arrayText = text.split("@");
    const domain = arrayText[1].split(" ")[0];
    console.log(domain);
    await page.locator("#username").fill(domain);
    console.log(await page.locator("#username").textContent());
})