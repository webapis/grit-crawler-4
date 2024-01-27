

//const {autoScroll}=require('../../utils/autoscroll')
async function handler(page) {
  //  await autoScroll(page);
    const data = await page.$$eval('.Prd', (productCards) => {
        return productCards.map(document => {
            try {
                const priceNew = Array.from(document.querySelector('.SalesAmount').querySelectorAll('.PPrice')).reverse()[0].innerHTML.replace('TL', '').trim()
                const link = document.querySelector('a[data-product').href
              
                const imageUrl = document.querySelector("img[data-src]").getAttribute('data-src')

                const title = document.querySelector("img[data-src]").alt
                return {
                    title: 'addax ' + title.replace(/İ/g,'i').toLowerCase(),
                    priceNew,
                    imageUrl,
                    link,
                    timestamp: Date.now(),
                    marka:'addax',
                }
            } catch (error) {
                return {error:error.toString(),content:document.innerHTML}
            }
  
        })
        
    })

return data

}



// async function getUrls(page) {

//     return { pageUrls: [], productCount: 0, pageLength: 0 }
// }


module.exports = { handler }

