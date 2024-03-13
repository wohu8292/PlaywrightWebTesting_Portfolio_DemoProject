const { CartPage } = require("./CartPage");
const {LoginPage} = require("./LoginPage");
const { OrdersHistoryPage } = require("./OrderHistoryPage");
const { OrdersReviewPage } = require("./OrderReviewPage");
const {ProductCatalogue} = require("./ProductCatalogue");


class POManager{
    constructor (page){
        this.page = page;
        this.loginpage = new LoginPage(this.page);
        this.productcataloguepage = new ProductCatalogue(this.page); 
        this.cartpage = new CartPage(this.page);
        this.orderreviewpage = new OrdersReviewPage(this.page);
        this.orderhistorypage = new OrdersHistoryPage(this.page);
    }

    getLoginPage(){
        return this.loginpage;
    }

    getProductCataloguePage(){
        return this.productcataloguepage;
    }

    getCartPage(){
        return this.cartpage;
    }

    getOrderReviewPage(){
        return this.orderreviewpage;
    }

    getOrderHistoryPage(){
        return this.orderhistorypage;
    }
}

module.exports = {POManager};