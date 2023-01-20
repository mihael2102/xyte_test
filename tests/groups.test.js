const { test } = require("@playwright/test");
const login = require("../pageObjects/login.page");
const groups = require("../pageObjects/groups.page");
const userData = require("../testData/userData.json");

test.describe("Groups page tests", async () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('/settings/groups?page=1');
        const loginPage = new login(page);

        await loginPage.login(userData.username, userData.password);
    });

    test("create group test", async ({ page }) => {
        const groupsPage = new groups(page);
        const groupName = 'groupName'.concat(Math.random().toString(36).slice(2));

        await groupsPage.createGroup(groupName);
        await groupsPage.verifyGroupCreated(groupName);
    });

});