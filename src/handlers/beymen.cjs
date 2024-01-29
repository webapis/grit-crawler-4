
async function handler(page) {



    const data = await page.$$eval('#productList div[data-page]', (productCards) => {
        return productCards.map(productCard => {

            const title = productCard.querySelector('.m-productCard__detail .m-productCard__title').textContent
            const desc = productCard.querySelector('.m-productCard__detail .m-productCard__desc').textContent
            const priceNew = productCard.querySelector('.m-productCard__newPrice').textContent.replace('TL', '').trim()//.replace('.','').trim()
            const link = productCard.querySelector('div[data-page] a').href
            const imageUrl = productCard.querySelectorAll('.m-productImageList [data-src]')[0].getAttribute('data-src').trim()
        
            return {
                title: 'beymen ' + title + ' ' + desc,
                priceNew,
                imageUrl: imageUrl.replace('{width}/{height}','431/-'),
                link,
                timestamp: Date.now(),
                marka: 'beymen'


            }
        })
    })
console.log('data[0]',data[0])
    return data
}



async function getUrls(page) {
    const url = await page.url()
    debugger;
   const nextPage =  await page.$('.o-productList__top--breadcrumbCount span')
   let productCount =0
   const pageUrls = []
   if(nextPage){
    productCount = await page.$eval('.o-productList__top--breadcrumbCount span', element => parseInt(element.textContent))
    debugger;
    const totalPages = Math.ceil(productCount / 48)


    let pagesLeft = totalPages
    for (let i = 2; i <= totalPages; i++) {

        pageUrls.push(`${url}?sayfa=` + i)
        --pagesLeft

    }

   }
  

    return { pageUrls, productCount, pageLength: pageUrls.length + 1 }
}
module.exports = { handler, getUrls }
