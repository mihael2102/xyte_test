const { expect } = require("@playwright/test");
const { log } = require("debug");

class User {
    constructor(page) {
        this.page = page;

        this.nameTxt = "//input[@name='name']";
        this.emailTxt = "//input[@name='email']";
        this.createBtn = "//button[@type='submit']";
        this.addNewUserBtn = "css=span >> text='Add New User'";
        this.groupsTable = "//*[@role='rowgroup']";
        this.emailValidationMsg = "//*[text()='email address is not valid']";
        this.addUserHeader = "//h5[@class='modal-title']";
    }

    async addNewUser(userName, email, create) {
        await log("add new user: %s", userName);
        await this.page.click(this.addNewUserBtn);
        await this.page.fill(this.nameTxt, userName);
        await this.page.fill(this.emailTxt, email);
        if(create) {
            await this.page.click(this.createBtn);
        }
    }

    async verifyUserCreated(userName) {
        await log("verify created user in the table");
        const tableRows = await this.page.locator(this.groupsTable);
        await expect(tableRows).toContainText(userName, { timeout: 15000 });
    }

    async verifyEmailValidationMsg() {
        await log("verify Email field validation message appears");
        await this.page.click(this.addUserHeader);
        await this.page.waitForSelector(this.emailValidationMsg, {state: "visible"});
    }

}
module.exports = User;