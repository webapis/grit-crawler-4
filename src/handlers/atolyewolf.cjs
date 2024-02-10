
//const {autoScroll}=require('../../utils/autoscroll.cjs')

async function handler(page) {


  //await autoScroll(page)
debugger
    const data = await page.$$eval('.product-card__media', (productCards) => {
        return productCards.map(document => {
            try {

                const imageUrl = document.querySelector('[srcset]').getAttribute('srcset')
    
          
                return {
                    
                    imageUrl,
                
                    timestamp: Date.now(),
                    marka: 'atolyewolf',
                }
            } catch (error) {
                return {error:error.toString(),content:document.innerHTML}
            }
         
        })
    })
    debugger
  
    
        return data
    }
    




    async function getUrls(page) {
        const url = await page.url()

       const pageUrls = []
       let productCount =0

     
        return { pageUrls, productCount, pageLength: pageUrls.length + 1 }
    }
    module.exports = { handler, getUrls}