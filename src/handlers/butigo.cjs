
async function handler(page) {

    const data = await page.$$eval('[data-gtm-product]', (productCards) => {
        return productCards.map(document => {
            try {
                const imageUrl = document.querySelector('[data-src]').getAttribute('data-src')
                const title =  document.querySelector('.product__image a img').alt
                const priceNew =document.querySelector('.product__prices-sale').innerText.replace('TL','').trim()
                const link = document.querySelector('.product__image a').href
                return {
                    title: 'butigo '+title.replace(/İ/g,'i').toLowerCase(),
                    priceNew,
                    imageUrl,
                    timestamp: Date.now(),
                    link,
                    marka: 'butigo',
                }
            } catch (error) {
                return {error:error.toString(),content:document.innerHTML}
            }
        
        })
    })


    return data
}


async function getUrls(page) {
    const url = await page.url()
 const nextPage =   await page.$('.pagination .page-item a')
    const productCount = 0
    const pageUrls = []
    if(nextPage){
        const totalPages = await page.evaluate(()=>Math.max(...Array.from(document.querySelectorAll('.pagination .page-item a')).map(m=> m.innerHTML).filter(Number)))
        let pagesLeft = totalPages
        for (let i = 2; i <= totalPages; i++) {
    
            pageUrls.push(`${url}?page=` + i)
            --pagesLeft
        
        }
    
    }
  
    return { pageUrls, productCount, pageLength: pageUrls.length + 1 }
}
module.exports = { handler, getUrls }

