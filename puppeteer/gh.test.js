let page;

beforeAll(async () => {
  global.browser = await require("puppeteer").launch();
});

afterAll(async () => {
  await global.browser.close();
});

describe("Github tests", () => {
  beforeEach(async () => {
    page = await global.browser.newPage();
  });

  afterEach(async () => {
    await page.close();
  });

  describe("Github team page tests", () => {
    beforeEach(async () => {
      await page.goto("https://github.com/team");
    });

    test("The h1 header content", async () => {
      const firstLink = await page.$("header div div a");
      await firstLink.click();
      await page.waitForSelector("h1", { timeout: 5000 });
      const title2 = await page.title();
      expect(title2).toEqual(
        "GitHub: Where the world builds software · GitHub"
      );
    }, 10000);

    test("The first link attribute", async () => {
      const actual = await page.$eval("a", (link) => link.getAttribute("href"));
      expect(actual).toEqual("#start-of-content");
    }, 5000);

    test("The page contains Sign in button", async () => {
      const btnSelector = ".btn-large-mktg.btn-mktg";

      await page.waitForSelector(btnSelector, {
        visible: true,
        timeout: 7000,
      });

      const actual = await page.$eval(btnSelector, (link) => link.textContent);
      expect(actual).toContain("Sign up for free");
    }, 7000);
  });

  describe("Github other pages tests", () => {
    test("The h1 header on Features page", async () => {
      await page.goto("https://github.com/features");
      await page.waitForSelector("h1", { timeout: 5000 });
      const header = await page.$eval("h1", (el) => el.textContent.trim());
      expect(header).toEqual("The tools you need to build what you want.");
    }, 10000);

    test("The h1 header on Explore page", async () => {
      await page.goto("https://github.com/explore");
      await page.waitForSelector("h1", { timeout: 5000 });
      const header = await page.$eval("h1", (el) => el.textContent.trim());
      expect(header).toEqual("Explore GitHub");
    }, 10000);

    test("The h1 header on Pricing page", async () => {
      await page.goto("https://github.com/pricing");
      await page.waitForSelector("h1", { timeout: 5000 });
      const header = await page.$eval("h1", (el) => el.textContent.trim());
      expect(header).toContain("Get the complete developer platform.");
    }, 10000);
  });
});
