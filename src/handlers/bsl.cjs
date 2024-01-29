//const {autoScroll}=require('../../utils/autoscroll')


async function handler(page) {

    debugger
 //   await autoScroll(page)
    const data = await page.$$eval('.Prd', (productCards) => {
        return productCards.map(document => {
            const priceNew =document.querySelectorAll('.PriceArea span')? Array.from(document.querySelectorAll('.PriceArea span')).reverse()[0].innerText.replace('TL', '').trim():null//.replace(',','.')
            const link =document.querySelector('button.AddToCart')? document.querySelector('button.AddToCart').getAttribute('data-producturl'):null
            const imageUrl =document.querySelector('[data-src]')? document.querySelector('[data-src]').getAttribute('data-src'):null
            const title =document.querySelector('button.AddToCart')? document.querySelector('button.AddToCart').getAttribute('data-productname') + ' ' + document.querySelector('button.AddToCart').getAttribute('data-colorname'):null
            return {
                title: 'bsl ' + title.replace(/İ/g, 'i').toLowerCase(),
                priceNew,
                imageUrl,
                link,
                timestamp: Date.now(),
                marka: 'bsl',
            }
        })
    })



    return data
}


async function getUrls(page) {

    return { pageUrls: [], productCount: 0, pageLength: 0 }
}


module.exports = { handler, getUrls }

