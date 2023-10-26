const puppeteer = require("puppeteer");
const chai = require("chai");
const expect = chai.expect;
const { Given, When, Then, Before, After } = require("cucumber");
const {
  clickElement,
  getText,
  getAttribute,
  getClass,
} = require("../../lib/commands.js");
const { setDefaultTimeout } = require("cucumber");
setDefaultTimeout(60 * 1000);
const button = "body > main > section > button";

Before(async function () {
  const browser = await puppeteer.launch({ headless: false, slowMo: 50 });
  const page = await browser.newPage();
  this.browser = browser;
  this.page = page;
});

After(async function () {
  if (this.browser) {
    await this.browser.close();
  }
});

Given("user is on {string} page", async function (string) {
  return await this.page.goto(`https://qamid.tmweb.ru/client${string}`, {
    setTimeout: 20000,
  });
});

When("user selects a session {string} and a seat with the status Standart", async function (string) {
    await clickElement(this.page, " body > nav > a:nth-child(4)");
    await clickElement(this.page, "body > main > section:nth-child(2) > div.movie-seances__hall > ul > li > a");
    const actual1 = await getText(this.page, "h2");
    expect(actual1).contain("Терминатор-заржавел");
    const place1 = "body > main > section > div.buying-scheme > div.buying-scheme__wrapper > div:nth-child(2) > span:nth-child(2)";
    if(await getClass(this.page, place1, "buying-scheme__chair_taken")){
      const actual = await getAttribute(this.page, button, "disabled");
      expect(actual).to.equal(true);
    };
    const status1 = await getClass(this.page, place1, "buying-scheme__chair_standart");
    expect(status1).to.equal(true);
    return await clickElement(this.page, place1); 
  }
);

Then("user sees an active button", async function () {
  const actual = await getAttribute(this.page, button, "disabled");
  expect(actual).to.equal(false);
});

When("user selects a session {string} and a seat with the status VIP", async function (string) {
  await clickElement(this.page, " body > nav > a:nth-child(2)");
  await clickElement(this.page, "body > main > section:nth-child(1) > div.movie-seances__hall > ul > li > a");
  const title = await getText(this.page, "h2");
  expect(title).contain("Зверополис");
  const place1 = "body > main > section > div.buying-scheme > div.buying-scheme__wrapper > div:nth-child(1) > span:nth-child(2)";
  if(await getClass(this.page, place1, "buying-scheme__chair_taken")){
    const actual = await getAttribute(this.page, button, "disabled");
    expect(actual).to.equal(true);
  }
  const status1 = await getClass(this.page, place1, "buying-scheme__chair_vip");
  expect(status1).to.equal(true);
  await this.page.click(place1);
}
);

When("user selects a session {string} and didn't choose a place", async function (string) {
  await clickElement(this.page, " body > nav > a:nth-child(3)");
  await clickElement(this.page, "body > main > section:nth-child(3) > div:nth-child(3) > ul > li > a");
  const actual1 = await getText(this.page, "h2");
  expect(actual1).contain("Унесенные ветром");
  await clickElement(this.page, button);
}
);

Then("user sees an inactive button", async function () {
  const actual = await getAttribute(this.page, button, "disabled");
  expect(actual).to.equal(true);
});