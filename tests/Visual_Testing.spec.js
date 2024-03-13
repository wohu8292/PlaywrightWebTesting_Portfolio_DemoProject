const{test, expect} = require("@playwright/test");

test("Taking Screenshot", async({page})=>{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#hide-textbox").click();
    await page.screenshot({path: 'screenshot.png'})
    await expect(page.locator("#displayed-text")).toBeHidden();
})

test.only("Screenshot & Visual Comparision", async({page})=>{
    await page.goto("https://www.rediff.com/");
    expect(await page.screenshot()).toMatchSnapshot('landing.png');
})