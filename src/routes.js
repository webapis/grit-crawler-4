import { Dataset, RequestQueue, createPuppeteerRouter } from 'crawlee';
import { createRequire } from 'module';

export const router = createPuppeteerRouter();
const dataset = await Dataset.open('brands');

const require = createRequire(import.meta.url);
require('dotenv').config()
const marka = process.env.marka
router.addDefaultHandler(async ({ enqueueLinks, log, request: { userData: { start, selector, pageSelector, selectorHover, action }, url }, page }) => {
    log.info(`enqueueing new URLs ${url}`);
    debugger
    if (selectorHover) {
        const navigationItems = await page.$$(selectorHover);
        debugger
        if (navigationItems && navigationItems.length > 0) {
            for (const navigationItem of navigationItems) {
                if (action === 'hover') {
                    await navigationItem.hover();
                }
                if (action === 'click') {
                    await navigationItem.click();
                }
            }
        }
    }



    const result = await enqueueLinks({
        selector,
        //   globs: [`${url}**`],
        label: 'detail',
        transformRequestFunction: (request) => {
            // Add custom data to the request object:
            request.userData = {
                label: 'detail',

                pageSelector
                // ...any other data you want to pass
            };
            return request; // Return the modified request
        }

    });

    console.log('processedRequests==', result.processedRequests.length)

    debugger
});

router.addHandler('detail', async ({ request, page, log, pushData }) => {
    const title = await page.title();

    const { userData: { pageSelector } } = request

    await page.waitForTimeout(5000)
    debugger
    const isProductPage = await page.$(pageSelector)
    debugger
    if (isProductPage) {

        debugger

        const { handler } = require(`./handlers/${marka}.cjs`)
        const data = await handler(page)
        debugger

        if (data.length > 0) {

            const withError = data.filter(f => f.error)
            let errorPercentate = 0
            if (withError.length > 0) {
                const errorDataset = await Dataset.open(`withError`);
                await errorDataset.pushData(withError)
                console.log('withError:length', withError.length)
                console.log('withError:error', withError[0].error)
                console.log('withError:url', withError[0].url)
                console.log('withError:content', withError[0].content)
                errorPercentate = Math.round(calculateErrorPercentage(data.length, withError.length))
                if (errorPercentate >= 5) {

                    throw `Total error exceeds ${errorPercentate} %`

                } else {


                    console.log('Error %', errorPercentate)
                }


            }

            if (errorPercentate < 5) {

// title: title + '|' + data[0].title ? data[0].title : '',

                await dataset.pushData({
                    url: request.loadedUrl,
                    title: title + '|' + data[0].title ? data[0].title : '',
                    imageUrl: data[0].imageUrl
                });

                log.info(`PRODUCT PAGE: DATALENGTH:${data.length} ${title}`, { url: request.loadedUrl });
            }


        } else {
            log.info(`PRODUCT PAGE: DATALENGTH:${data.length} ${title}`, { url: request.loadedUrl });
        }
        debugger

    } else {

        log.info(`NOT PRODUCT PAGE:${title}`, { url: request.loadedUrl });

    }


});


function calculateErrorPercentage(firstValue, secondValue) {
    return (secondValue / firstValue) * 100;
}

