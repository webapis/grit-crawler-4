

async function handler(page) {

 debugger
        const data = await page.$$eval('.products__items .product-item', (productCards) => {
            return productCards.map(productCard => {
                const title = productCard.querySelector('.product-item__name.d-block').innerText.trim()
                const priceNew = Array.from(productCard.querySelectorAll('.price__new')).reverse()[0].innerText.replace('TL','').trim()
                const link = productCard.querySelector('.d-block.list-slider-item__link').href
            
                const imageUrl = productCard.querySelector('.d-block.list-slider-item__link img').src
     
                debugger;
                return {
                    title: 'adl ' + title.replace(/İ/g,'i').toLowerCase(),
                    priceNew,
                    imageUrl,
                    link,
                    timestamp: Date.now(),
                    marka: 'adl',    
                }
            })
        })
    
debugger
 return data


}



async function getUrls(page) {

    const firstUrl = await page.url()
    const nextPageExists = await page.$('.pagination__item')
    const pageUrls = []
    if(nextPageExists){
        const totalPages = await page.evaluate(() => {
            return document.querySelectorAll('.pagination__item')[document.querySelectorAll('.pagination__item').length - 2].innerHTML.replace(/[^\d]/g, "")
        })
    
      
        let pagesLeft = totalPages
    
        for (let i = 2; i <= totalPages; i++) {
            const url = `${firstUrl}?page=${i}`
    
            if (pagesLeft >= 1) {
                pageUrls.push(url)
                --pagesLeft
            }
        }
    }
  


    return { pageUrls:[], productCount: 0, pageLength:pageUrls.length }
}
module.exports = { handler, getUrls }