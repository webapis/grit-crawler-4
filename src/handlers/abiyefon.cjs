async function handler (page) {


    const data = await page.$$eval('.products .product-link', (productCards) => {
        return productCards.map(document => {
            try {
                const priceNew = document.querySelector("span[data-price]").innerHTML
                const link = document.href
    
                const imageUrl = document.querySelector('img.product-list-image').src
               
                const title = document.querySelector('img.product-list-image').alt
                return {
                    title:'abiyefon ' + title.toLowerCase(),
                    priceNew,
                    imageUrl,
                    link,
                    timestamp: Date.now(),
                    marka:'abiyefon'
                }
            }
            catch (error) {
                    return {error:error.toString(),content:document.innerHTML}
                }
        })
    })

 return data
}

module.exports={handler}