


async function handler(page) {

    const data = await page.$$eval('.product-container', (productCards) => {
        return productCards.map(document => {
            try {
         
                const imageUrl =document.querySelector('.category-products-image[srcset]') ?document.querySelector('.category-products-image[srcset]').getAttribute('srcset').split(',')[0].split(' ')[0]:null

                return {
              
                    imageUrl,
                   // link,
                    timestamp: Date.now(),
                    marka:'cansui',
                }
            } catch (error) {
                return {error:error.toString(),content:document.innerHTML}
            }
  
        })
        
    })

return data.filter(f=>f.imageUrl!==null)

}



// async function getUrls(page) {

//     return { pageUrls: [], productCount: 0, pageLength: 0 }
// }


module.exports = { handler }

