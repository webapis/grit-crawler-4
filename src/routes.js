import { createPuppeteerRouter, Dataset, RequestQueue } from 'crawlee';

export const router = createPuppeteerRouter();
const dataset = await Dataset.open('my-results');
const requestQueue = await RequestQueue.open();
router.addDefaultHandler(async ({ enqueueLinks, log, request: { userData: { start, selector }, url }, page }) => {
    log.info(`enqueueing new URLs ${url}`);
    debugger



 const result =   await enqueueLinks({
        selector,
     //   globs: [`${url}**`],
        label: 'detail'
    });

    debugger
});

router.addHandler('detail', async ({ request, page, log, pushData }) => {
    const title = await page.title();
    log.info(`${title}`, { url: request.loadedUrl });

    await dataset.pushData({
        url: request.loadedUrl,
        title,
    });
});
