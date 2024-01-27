async function  handler (page) {

    debugger

    await page.waitForSelector('.catalog-products')
    debugger
    const data = await page.$$eval('.catalog-products .product-card', (productCards) => {
        return productCards.map( productCard => {
            try {
                const imageUrl ='https:'+ productCard.querySelector('.catalog-products .product-card .product-card__image .image-box .product-card__image--item.swiper-slide img').getAttribute('data-srcset').split(',')[0].split(' ')[0]
                const title = productCard.querySelector('.product-card__title a').getAttribute('title').trim()
                const priceNew = productCard.querySelector('.product-card__price--new') && productCard.querySelector('.product-card__price--new').textContent.trim().replace('₺', '').replace('TL', '')
                const link = productCard.querySelector('.catalog-products .product-card .product-card__image .image-box a').href
      
         
                return {
                    title: 'defacto ' + title.replace(/İ/g,'i').toLowerCase(),
                    priceNew,
                    imageUrl,
                    link,
                    timestamp: Date.now(),
                    marka:'defacto',
                }  
            } catch (error) {
                return {error:error.toString(),content:productCard.innerHTML}
            }
        })
    })
debugger
  return data
}

module.exports={handler}