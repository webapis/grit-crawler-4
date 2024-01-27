import { Dataset, RequestQueue, createPuppeteerRouter } from 'crawlee';
import { createRequire } from 'module';

export const router = createPuppeteerRouter();
const dataset = await Dataset.open('brands');

const require = createRequire(import.meta.url);
require('dotenv').config()
const marka = process.env.marka
router.addDefaultHandler(async ({ enqueueLinks, log, request: { userData: { start, selector, pageSelector }, url }, page }) => {
    log.info(`enqueueing new URLs ${url}`);
    debugger

    const result = await enqueueLinks({
        selector,
        //   globs: [`${url}**`],
        label: 'detail',
        transformRequestFunction: (request) => {
            // Add custom data to the request object:
            request.userData = {
                label: 'detail',
                imageSelector,
                pageSelector
                // ...any other data you want to pass
            };
            return request; // Return the modified request
        }

    });

    debugger
});

router.addHandler('detail', async ({ request, page, log, pushData }) => {
    const title = await page.title();

    const { userData: {  pageSelector } } = request


    const isProductPage = await page.$(pageSelector)
    if (isProductPage) {

        debugger

        const { handler } = require(`./handlers/${marka}.cjs`)
        const data = await handler(page)

        if (data.length > 0) {
            await dataset.pushData({
                url: request.loadedUrl,
                title,
                imageUrl: data[0].imageUrl
            });

            log.info(`PRODUCT PAGE: DATALENGTH:${data.length} ${title}`, { url: request.loadedUrl });
        } else {
            log.info(`PRODUCT PAGE: DATALENGTH:${data.length} ${title}`, { url: request.loadedUrl });
        }
        debugger



    } else {

        log.info(`NOT PRODUCT PAGE:${title}`, { url: request.loadedUrl });

    }


});




