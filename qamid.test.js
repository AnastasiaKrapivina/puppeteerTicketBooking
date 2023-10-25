const { clickElement, putText, getText, getAttribute, getClass } = require("./lib/commands.js");
const { generateName, generateNumber } = require("./lib/util.js");

let page;

beforeEach(async () => {
  page = await browser.newPage();
  await page.setDefaultNavigationTimeout(0);
  await page.goto("https://qamid.tmweb.ru/client/index.php");
});

afterEach(() => {
  page.close();
});

test("Opening the page 'ИДЁМВКИНО'", async () => {
  const actual = await getText(page, "h1");
  expect(actual).toContain("Идёмвкино");
});

test("Booking class tickets Standart", async () => {
  await clickElement(page, " body > nav > a:nth-child(4)");
  await clickElement(page, "body > main > section:nth-child(2) > div.movie-seances__hall > ul > li > a");
  const actual1 = await getText(page, "h2");
  expect(actual1).toContain("Терминатор-заржавел");
  await clickElement(page, "body > main > section > div.buying-scheme > div.buying-scheme__wrapper > div:nth-child(2) > span:nth-child(2)");
  const button = "body > main > section > button";
  const actual = await getAttribute(page, button, "disabled");
  expect(actual).toBe(false);
});

test.only("Booking class tickets VIP", async () => {
  await clickElement(page, " body > nav > a:nth-child(2)");
  await clickElement(page, "body > main > section:nth-child(1) > div.movie-seances__hall > ul > li > a");
  const title = await getText(page, "h2");
  expect(title).toContain("Зверополис");
  const place1 = "body > main > section > div.buying-scheme > div.buying-scheme__wrapper > div:nth-child(1) > span:nth-child(2)";
  // await page.waitForSelector(place1);
  // const status1 = await page.$eval(place1, (link) => link.classList.contains("buying-scheme__chair_vip"));
  const status1 = await getClass(page, place1, "buying-scheme__chair_vip");
  expect(status1).toBe(true);
  await page.click(place1);
  const button = "body > main > section > button";
  // await page.waitForSelector(button);
  // const actual = await page.$eval(button, (link) => link.hasAttribute("disabled"));
  const actual = await getAttribute(page, button, "disabled");
  expect(actual).toBe(false); 
});
