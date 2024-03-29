// For more information, see https://crawlee.dev/
import { PuppeteerCrawler, RequestList } from 'crawlee';
import { router } from './routes.js';
import preNavigationHooks from './crawler-helper/preNavigationHooks.mjs';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);

require('dotenv').config()

import urls from "../urls.js"

const marka = process.env.marka
const crawler = new PuppeteerCrawler({
    // headless: false,
    // proxyConfiguration: new ProxyConfiguration({ proxyUrls: ['...'] }),
    requestList: await RequestList.open(null, urls.filter(f => f.url.includes(marka)).map(m => { return { url: m.url, userData: { start: true, selector: m.selector, pageSelector: m.pageSelector, selectorHover: m.selectorHover, action: m.action } } })),
    requestHandler: router,
    // Comment this option to scrape the full website.
    // maxRequestsPerCrawl: 10,
    maxConcurrency: 5,
    preNavigationHooks,
});

await crawler.run();

