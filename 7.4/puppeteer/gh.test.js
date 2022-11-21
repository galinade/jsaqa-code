let page;

beforeEach(async () => {
  page = await browser.newPage();
  await page.goto("https://github.com/team");
});
afterEach(() => {
  page.close(6000);
});

describe("Github page tests", () => {
  test("The h1 header content", async () => {
    await page.setDefaultNavigationTimeout(6000);
    const firstLink1 = await page.$("header div div a");
    await firstLink1.click();
    await page.waitForSelector("h1");
    const title2 = await page.title();
    expect(title2).toEqual(
      "GitHub for teams · Build like the best teams on the planet · GitHub"
    );
  });

  test("The first link attribute", async () => {
    await page.setDefaultNavigationTimeout(600);
    const actual = await page.$eval("a", (link) => link.getAttribute("href"));
    expect(actual).toEqual("#start-of-content");
  });

  test("The page contains Sign in button", async () => {
    await page.setDefaultNavigationTimeout(6000);
    const btnSelector = ".btn-large-mktg.btn-mktg";
    await page.waitForSelector(btnSelector, {
      visible: true,
    });
    const actual = await page.$eval(btnSelector, (link) => link.textContent);
    expect(actual).toContain("Get started with Team");
  });
});
describe("Github page tests 2", () => {
  beforeEach(async () => {
    page = await browser.newPage();
    await page.goto("https://github.com/pricing");
  });
  test("The h1 header content 2", async () => {
    await page.setDefaultNavigationTimeout(600);
    const firstLink1 = await page.$(
      "body > div.application-main > main > div.p-responsive.container-xl.text-center.mt-7.mt-md-8.mt-lg-9.mb-5.mb-lg-9 > h1"
    );
    await firstLink1.click();
    await page.waitForSelector("h1");
    const title3 = await page.title();
    expect(title3).toEqual("Pricing · Plans for every developer · GitHub");
  });

  test("The first link attribute 2", async () => {
    await page.setDefaultNavigationTimeout(600);
    const actual = await page.$eval("a", (link) => link.getAttribute("href"));
    expect(actual).toEqual("#start-of-content");
  });

  test("The page contains Sign in button 2", async () => {
    await page.setDefaultNavigationTimeout(600);
    const btnSelector = ".btn-muted-mktg.d-block.btn-mktg";
    await page.waitForSelector(btnSelector, {
      visible: true,
    });
    const actual = await page.$eval(btnSelector, (link) => link.textContent);
    expect(actual).toContain("Join for free");
  });
});
