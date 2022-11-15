const { test, expect } = require("@playwright/test");
const { chromium } = require("playwright");
const { email, password } = require("../user");

test("test Successful authorization", async () => {
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
  await page.goto("https://netology.ru/");

  await page.getByRole("link", { name: "Войти" }).click();
  await expect(page).toHaveURL("https://netology.ru/?modal=sign_in");

  await page.getByPlaceholder("Email").click();

  await page.getByPlaceholder("Email").fill("vhkkn@bk.ru");

  await page.getByPlaceholder("Пароль").click();

  await page.getByPlaceholder("Пароль").fill("bjhg44hh");

  await page.getByTestId("login-submit-btn").click();

  await page.getByTestId("login-error-hint").click();
});

//const { test, expect } = require("@playwright/test");

test("test", async ({ page }) => {
  // Go to https://netology.ru/free/management#/
  await page.goto("https://netology.ru/free/management#/");

  // Click a
  await page.click("a");
  await expect(page).toHaveURL("https://netology.ru/");

  // Click text=Учиться бесплатно
  await page.click("text=Учиться бесплатно");
  await expect(page).toHaveURL("https://netology.ru/free");

  page.click("text=Бизнес и управление");

  // Click text=Как перенести своё дело в онлайн
  await page.click("text=Как перенести своё дело в онлайн");
  await expect(page).toHaveURL(
    "https://netology.ru/programs/kak-perenesti-svoyo-delo-v-onlajn-bp"
  );
});
