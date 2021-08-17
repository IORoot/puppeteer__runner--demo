var runner = (function () {

    const puppeteer = require('puppeteer-core');
    let puppeteer_settings = { 
        headless: true, 
        devtools: false,
        executablePath: "/usr/bin/google-chrome-stable",
        args: ['--no-sandbox']
    }
    let browser;
    let page;

    const pages = {
        target:               'https://www.bbc.co.uk/news',
    };


    // ┌──────────────────────────────────────────────────────────┐
    // │                                                          │
    // │                       Run Function                       │
    // │                                                          │
    // └──────────────────────────────────────────────────────────┘
    function publicRun(){

        (async () => {


            /**
             * New puppeteer
             */
            try {
                console.log('Launch Puppeteer');
                browser = await puppeteer.launch(puppeteer_settings);
            } catch (err) {
                console.log('Error launching puppeteer : ' + err);
                return;
            } 


            /**
             * New Browser
             */
            try {
                console.log('create browser');
                const context = browser.defaultBrowserContext();
            } catch (err) {
                console.log('Error creating browser : ' + err);
                return;
            } 


            
            /**
             * New Page goto target page and take screenshot
             */
            try {
                console.log('create page');
                page = await browser.newPage();
                await page.setDefaultNavigationTimeout(30000);
                await page.setViewport({ width: 1200, height: 800 });
            } catch (err) {
                console.log('Error creating page : ' + err);
                return;
            } 


            /**
             * Visit target Page.
             */
            try {
                await page.waitForTimeout(1000);
                console.log('Visiting Target Page');
                page.goto(pages.target, {waitUntil: 'domcontentloaded'});
                await page.screenshot({path: './screenshot.png'})
            } catch (err) {
                console.log('Error visiting Target Page : ' + err);
                return;
            } 
            

            
            /**
             * Done
             */
            try {
                console.log('Done');
                await page.waitForTimeout(1000);
                await browser.close();
            } catch (err) { 
                console.log('Error closing the browser : ' + err);
                return;
            }
        
        })();

    }


    // ┌──────────────────────────────────────────────────────────┐
    // │                                                          │
    // │                        Make Public                       │
    // │                                                          │
    // └──────────────────────────────────────────────────────────┘
    return {    
        run: publicRun,
    };

})();
module.exports = { runner };

runner.run();