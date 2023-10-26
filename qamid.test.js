const { clickElement, getText, getAttribute, getClass } = require("./lib/commands.js");

let page;
const button = "body > main > section > button";

beforeEach(async () => {
  page = await browser.newPage();
  await page.setDefaultNavigationTimeout(0);
  await page.goto("https://qamid.tmweb.ru/client/index.php");
});

afterEach(() => {
  page.close();
});

describe("Positive tests", () => {
test("Booking class tickets Standart", async () => {
  await clickElement(page, " body > nav > a:nth-child(4)");
  await clickElement(page, "body > main > section:nth-child(2) > div.movie-seances__hall > ul > li > a");
  const actual1 = await getText(page, "h2");
  expect(actual1).toContain("Терминатор-заржавел");
  const place1 = "body > main > section > div.buying-scheme > div.buying-scheme__wrapper > div:nth-child(2) > span:nth-child(2)";
  if(await getClass(page, place1, "buying-scheme__chair_taken")){
    const actual = await getAttribute(page, button, "disabled");
    expect(actual).toEqual(true);
  };
  const status1 = await getClass(page, place1, "buying-scheme__chair_standart");
  expect(status1).toEqual(true);
  await clickElement(page, place1); 
  const actual = await getAttribute(page, button, "disabled");
  expect(actual).toEqual(false);
});

test("Booking class tickets VIP", async () => {
  await clickElement(page, " body > nav > a:nth-child(2)");
  await clickElement(page, "body > main > section:nth-child(1) > div.movie-seances__hall > ul > li > a");
  const title = await getText(page, "h2");
  expect(title).toContain("Зверополис");
  const place1 = "body > main > section > div.buying-scheme > div.buying-scheme__wrapper > div:nth-child(1) > span:nth-child(2)";
  if(await getClass(page, place1, "buying-scheme__chair_taken")){
    const actual = await getAttribute(page, button, "disabled");
    expect(actual).toEqual(true);
  }
  const status1 = await getClass(page, place1, "buying-scheme__chair_vip");
  expect(status1).toEqual(true);
  await page.click(place1);  
  const actual = await getAttribute(page, button, "disabled");
  expect(actual).toEqual(false); 
});
});

describe("Negative tests", () => {
  test("Booking tickets without selecting seats", async () => {
    await clickElement(page, " body > nav > a:nth-child(3)");
    await clickElement(page, "body > main > section:nth-child(3) > div:nth-child(3) > ul > li > a");
    const actual1 = await getText(page, "h2");
    expect(actual1).toContain("Унесенные ветром");
    await clickElement(page, button);
    const actual = await getAttribute(page, button, "disabled");
    expect(actual).toEqual(true);
  });
});