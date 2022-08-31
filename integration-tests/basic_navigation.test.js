const portfinder = require("portfinder");
const puppeteer = require("puppeteer");

const app = require("../meadowlark");

let server = null;
let port = null;

beforeEach(async () => {
    port = await portfinder.getPortPromise();
    server = app.listen(port);
})

afterEach(() => {
    server.close();
})

test("Test routing between home page and about us page", async () => {
    const browser = await puppeteer.launch();
    const page = browser.newPage();
    await page.goto(`http://localhost:${port}`);
    await Promise.all([
        page.waitForNavigation(),
        page.click("[data-test-id='about']")
    ]);
    expect(page.url()).toBe(`http://localhost:${port}/about`);
    await browser.close();
})