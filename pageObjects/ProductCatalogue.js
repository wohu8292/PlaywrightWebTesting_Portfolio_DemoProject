const { expect } = require("@playwright/test");

class ProductCatalogue{

    constructor(page){
        this.page = page;
        this.products = page.locator(".card-body");
        this.productText = page.locator(".card-body b");
        this.toast = page.locator("#toast-container");
        this.cart = page.locator("[routerlink*='cart']")
        this.order = page.locator(".btn.btn-custom[routerlink='/dashboard/myorders']")
    }

    async searchProduct(productName){
        await this.page.waitForLoadState('networkidle');
        const titles = await this.productText.allTextContents();
        const count = await this.products.count();
        for (let i = 0; i < count; ++i) {
           if (await this.products.nth(i).locator("b").textContent() === productName) {
              //add to cart
              await this.products.nth(i).locator("text= Add To Cart").click();
              await expect(this.toast).toBeHidden();
              break;
           }
        }
    }

    async navigateToCart(){
        await this.cart.click();
    }

    async navigateToOrder(){
        await this.order.click();
    }
}

module.exports = {ProductCatalogue};