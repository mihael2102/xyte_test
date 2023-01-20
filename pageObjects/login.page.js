const { expect } = require("@playwright/test");
const { log } = require("debug");

class Login {
    constructor(page) {
        this.page = page;

        this.emailTxt = "//input[@name='email']";
        this.passwordTxt = "//input[@name='password']";
        this.signInBtn = "//button[@type='submit']";
    }

    async login(userName, password) {
        await log("login with user: %s", userName);
        await this.page.fill(this.emailTxt, userName);
        await this.page.fill(this.passwordTxt, password);
        await this.page.click(this.signInBtn);
    }
}
module.exports = Login;