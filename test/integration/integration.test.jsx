import puppeteer from 'puppeteer';

describe('App test', () => {

    let browser;
    beforeAll(async () => {
        browser = await puppeteer.launch({
            headless: true,
            args: [
                '--no-sandbox',
                '--disable-web-security'
            ]
        });
    });

    test('renders', async() => {
        const page = await browser.newPage();
        await page.goto('http://localhost:3000');

        const elementsCount = await page.evaluate(() => {
            const collection = document.getElementsByTagName("search-box");
            return collection.length;
        });

        expect(elementsCount).toBe(3);

        const inputValue = await page.evaluate(() => {
            const searchBoxComponent = document.getElementsByTagName("search-box")[0];
            return searchBoxComponent.getElementsByTagName("input")[0].value;

        });

        expect(inputValue).toBe('preact');

    })

    afterAll(async () => {
        await browser.close();
    })
});
