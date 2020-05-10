const puppeteer = require('puppeteer');

//  Scrap from Pinterest
const scrapPinterest = async keyword => {
    try {
        const browser = await puppeteer.launch({
            headless: true,
            args: [
                '--no-sandbox',
                'disable-setuid-sandbox',
            ]
        });
        const page = await browser.newPage();
        await page.setDefaultNavigationTimeout(0);
        // await page.setViewport({ width: 2800, height: 3800 })
        await page.goto(`https://www.pinterest.com/search/pins/?q=${keyword}`, {
            waitUntil: 'load',
            timeout: 0
        });

        const urls = await page.evaluate(() => {
            let results = [];
            let items = document.querySelectorAll('.GrowthUnauthPinImage a');

            for (let item of items) {
                results.push({
                    imgSrc: item.firstChild.src,
                    imgLink: item.href
                });
            }
            return results;
        })
        browser.close();
        return urls;
    } catch (err) {
        return err.message
    }
}

//  Scrap from Behance
const scrapBehance = async keyword => {
    try {
        const browser = await puppeteer.launch({
            headless: true,
            args: [
                '--no-sandbox',
                'disable-setuid-sandbox',
            ]
        });
        const page = await browser.newPage();
        await page.setDefaultNavigationTimeout(0);
        // await page.setViewport({ width: 2800, height: 3800 })
        await page.goto(`https://www.behance.net/search?field=ui%2Fux&search=${keyword}`, {
            waitUntil: 'load',
            timeout: 0
        });

        const urls = await page.evaluate(() => {
            let results = [];
            let items = document.querySelectorAll('.qa-cover-wrapper');

            for (let item of items) {
                results.push({
                    imgSrc: item.querySelector('img').src,
                    imgLink: item.querySelector('a').href
                });
            }
            return results;
        })
        browser.close();
        return urls;
    } catch (err) {
        return err.message
    }
}

//  Scrap from dribble-mobile
const scrapDribbbleMobile = async keyword => {
    try {
        const browser = await puppeteer.launch({
            headless: true,
            args: [
                '--no-sandbox',
                'disable-setuid-sandbox',
            ]
        });
        const page = await browser.newPage();
        await page.setDefaultNavigationTimeout(0);
        // await page.setViewport({ width: 2800, height: 3800 })
        await page.goto(`https://dribbble.com/search/shots/popular/mobile?q=${keyword}`, {
            waitUntil: 'load',
            timeout: 0
        });

        const urls = await page.evaluate(() => {
            let results = [];
            let items = document.querySelectorAll('.shot-thumbnail');

            for (let item of items) {
                results.push({
                    imgSrc: item.querySelector('img').src,
                });
            }
            return results;
        })
        browser.close();
        return urls;
    } catch (err) {
        return err.message
    }
}

//  Scrap from dribble-color
const scrapDribbbleColor = async color => {
    try {
        const browser = await puppeteer.launch({
            headless: true,
            args: [
                '--no-sandbox',
                'disable-setuid-sandbox',
            ]
        });
        const page = await browser.newPage();
        await page.setDefaultNavigationTimeout(0);
        // await page.setViewport({ width: 2800, height: 3800 })
        await page.goto(`https://dribbble.com/shots/popular/mobile?color=${color}`, {
            waitUntil: 'load',
            timeout: 0
        });

        const urls = await page.evaluate(() => {
            let results = [];
            let items = document.querySelectorAll('.shot-thumbnail');

            for (let item of items) {
                results.push({
                    imgSrc: item.querySelector('img').src,
                });
            }
            return results;
        })
        browser.close();
        return urls;
    } catch (err) {
        return err.message
    }
}


module.exports = {
    scrapPinterest,
    scrapBehance,
    scrapDribbbleMobile,
    scrapDribbbleColor,
}