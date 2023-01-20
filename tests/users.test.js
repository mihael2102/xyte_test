const { test } = require("@playwright/test");
const login = require("../pageObjects/login.page");
const users = require("../pageObjects/users.page");
const userData = require("../testData/userData.json");

test.describe("Users page tests", async () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('/settings/users?page=1');
        const loginPage = new login(page);

        await loginPage.login(userData.username, userData.password);
    });

    test("add new user test", async ({ page }) => {
        const usersPage = new users(page);
        const userName = 'userName_'.concat(Math.random().toString(36).slice(2));
        const email = 'test'.concat(Math.random().toString(36).slice(2)).concat('@test.com');

        await usersPage.addNewUser(userName, email);
        await usersPage.verifyUserCreated(userName);
    });

});