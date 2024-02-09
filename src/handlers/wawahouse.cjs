

async function handler(page) {

    debugger
    const url = await page.url()
    const pageTitle = await page.evaluate(() => Array.from(document.querySelectorAll("ul#map-master li a")).map(m => m.innerText).join(' '))

    const data = await page.$$eval('.product', (productCards) => {
        return productCards.map(document => {
            try {
                const imageUrl = document.querySelector('.product-image').src


                return {

                    imageUrl,

                    timestamp: Date.now(),
                    marka: 'wawahouse',
                }
            } catch (error) {
                return { error: error.toString(), content: document.innerHTML };
            }

        })
    })
    debugger

    return data.map(m => { return { ...m, pageTitle } })
}

async function getUrls(page) {
    const url = await page.url()


    const pageUrls = []



    return { pageUrls, productCount: 0, pageLength: pageUrls.length + 1 }
}
module.exports = { handler, getUrls }
