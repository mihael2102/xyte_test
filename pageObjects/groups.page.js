const { expect } = require("@playwright/test");
const { log } = require("debug");

class Group {
    constructor(page) {
        this.page = page;

        this.nameTxt = "//input[@name='name']";
        this.createBtn = "//button[@type='submit']";
        this.createGroupBtn = "css=span >> text='Create Group'";
        this.groupsTable = "//*[@role='rowgroup']";
    }

    async createGroup(groupName) {
        await log("create group %s", groupName);
        await this.page.click(this.createGroupBtn);
        await this.page.fill(this.nameTxt, groupName);
        await this.page.click(this.createBtn);
    }

    async verifyGroupCreated(groupName) {
        await log("verify created group in the table");
        const tableRows = await this.page.locator(this.groupsTable);
        await expect(tableRows).toContainText(groupName, { timeout: 15000 });
    }

}
module.exports = Group;