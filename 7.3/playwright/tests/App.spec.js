const { test, expect } = require("@playwright/test");
const { chromium } = require("playwright");
const { email, password } = require("../user");

test("Successful authorization", async () => {
  const browser = await chromium.launch({
    headless: false,
    slowMo: 5000,
  });
  const page = await browser.newPage();
  await page.goto("https://netology.ru/");
  await page.getByRole("link", { name: "Войти" }).click();
  await expect(page).toHaveURL("https://netology.ru/?modal=sign_in");
  await page.getByPlaceholder("Email").click();
  await page.getByPlaceholder("Email").fill(email);
  await page.getByPlaceholder("Пароль").click();
  await page.getByPlaceholder("Пароль").fill(password);
  await page.getByTestId("login-submit-btn").click();
  await expect(page).toHaveURL("https://netology.ru/profile");
  await page.getByRole("heading", { name: "Мои курсы и профессии" }).click();
  await browser.close();
})();

test("test Unsuccessful authorization", async () => {
  const browser = await chromium.launch({
    headless: false,
    slowMo: 5000,
  });
  const page = await browser.newPage();
  await page.goto("https://netology.ru/");

  await page.getByRole("link", { name: "Войти" }).click();
  await expect(page).toHaveURL("https://netology.ru/?modal=sign_in");

  await page.getByPlaceholder("Email").click();

  await page.getByPlaceholder("Email").fill("vhkkn@bk.ru");

  await page.getByPlaceholder("Пароль").click();

  await page.getByPlaceholder("Пароль").fill("bjhg44hh");

  await page.getByTestId("login-submit-btn").click();
  await expect(page.locator("login-error-hint")).toContainText(
    "Вы ввели неправильно логин или пароль"
  );
  await browser.close();
})();
