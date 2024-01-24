// For more information, see https://crawlee.dev/
import { PuppeteerCrawler, ProxyConfiguration, RequestList,Dataset } from 'crawlee';
import { router } from './routes.js';
import preNavigationHooks from './crawler-helper/preNavigationHooks.mjs';
import { createRequire } from 'module';
import importLinkData from '../utils/importData.js'
const require = createRequire(import.meta.url);

require('dotenv').config()

import urls from "../urls.js"

const marka = process.env.marka
const crawler = new PuppeteerCrawler({
    //headless: false,
    // proxyConfiguration: new ProxyConfiguration({ proxyUrls: ['...'] }),
    requestList: await RequestList.open(null, urls.filter(f=>f.url.includes(marka)).map(m => { return { url: m.url, userData: { start: true, selector: m.selector } } })),
    requestHandler: router,
    // Comment this option to scrape the full website.
// maxRequestsPerCrawl: 5,
    maxConcurrency: 2,
    preNavigationHooks,
});

await crawler.run();
const dataDataset = await Dataset.open();
const { items} = await dataDataset.getData();
await importLinkData({data:items.map(m=>{return {...m,brand:marka}}),brand:marka })
console.log('items---',items)