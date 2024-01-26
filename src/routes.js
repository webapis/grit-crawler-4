import { createPuppeteerRouter, Dataset, RequestQueue } from 'crawlee';
import { createRequire } from 'module';
export const router = createPuppeteerRouter();
const dataset = await Dataset.open('brands');
const requestQueue = await RequestQueue.open();
const require = createRequire(import.meta.url);
require('dotenv').config()
const marka = process.env.marka
router.addDefaultHandler(async ({ enqueueLinks, log, request: { userData: { start, selector,imageSelector }, url }, page }) => {
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
                imageSelector
                // ...any other data you want to pass
            };
            return request; // Return the modified request
        }

    });

    debugger
});

router.addHandler('detail', async ({ request, page, log, pushData }) => {
    const title = await page.title();

    const { userData: { imageSelector } } = request
    log.info(`${title}`, { url: request.loadedUrl });
    debugger

    const imageUrl = await page.evaluate((_imageSelector) => Array.from(document.querySelectorAll(_imageSelector)).map(m => m.src), imageSelector)

    debugger

    await dataset.pushData({
        url: request.loadedUrl,
        title,
        imageUrl: imageUrl.length > 0 ? imageUrl.filter(f => f.length > 0)[0]: []
    });
});



async function extractImageUrls(page, imageSelector) {
    return await page.evaluate(() => {

        var imgElements = Array.from(document.querySelectorAll('img'));
        var classStringCounts = {};

        imgElements.forEach(img => {
            var classString = Array.from(img.classList).join(' ');

            // Count occurrences of each concatenated class string
            classStringCounts[classString] = (classStringCounts[classString] || 0) + 1;
        });

        // Find the concatenated class string with the highest count
        var mostFrequentClassString = Object.keys(classStringCounts).reduce((a, b) => classStringCounts[a] > classStringCounts[b] ? a : b);
        if (mostFrequentClassString.length > 3) {
            return Array.from(document.querySelectorAll(mostFrequentClassString.split(' ').map(m => '.' + m).join(''))).map(m => m.src)
        } else {
            return Array.from(document.querySelectorAll('img')).map(m => m.src)
        }


    })

}