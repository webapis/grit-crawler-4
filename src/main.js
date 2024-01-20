// For more information, see https://crawlee.dev/
import { PuppeteerCrawler, ProxyConfiguration, RequestList } from 'crawlee';
import { router } from './routes.js';
import preNavigationHooks from './crawler-helper/preNavigationHooks.mjs';
//const startUrls = ['https://www.koton.com/'];

import urls from "../urls.js"
const crawler = new PuppeteerCrawler({
    //headless: false,
    // proxyConfiguration: new ProxyConfiguration({ proxyUrls: ['...'] }),
    requestList: await RequestList.open(null, urls.map(m => { return { url: m.url, userData: { start: true, selector: m.selector } } })),
    requestHandler: router,
    // Comment this option to scrape the full website.
    // maxRequestsPerCrawl: 500,
    maxConcurrency: 2,
    preNavigationHooks,
});

await crawler.run();
