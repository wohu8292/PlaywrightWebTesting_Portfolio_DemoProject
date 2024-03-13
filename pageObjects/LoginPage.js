class LoginPage{
    constructor(page){
        this.page = page;
        this.signInbutton = page.locator("[value='Login']");
        this.userName = page.locator("#userEmail");
        this.userPassword = page.locator("#userPassword");
    }

    async goTo(){
        await this.page.goto("https://rahulshettyacademy.com/client");
    }

    async validLogin(userName,userPassword){
        await this.userName.fill(userName);
        await this.userPassword.fill(userPassword);
        await this.signInbutton.click();
    }
}

module.exports={LoginPage};     //exports