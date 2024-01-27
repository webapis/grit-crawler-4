

//const {autoScroll}=require('../../utils/autoscroll')
async function handler(page) {


    await page.waitForSelector('.ProductList',{timeout:180000})
  // const totalProducts= await page.evaluate(()=>parseInt(document.querySelector("[for^=sidebar-filter-p-product_type]").innerText.replace(/[^\d]/g,"")))
  //  await autoScroll(page);

    debugger
    const data = await page.$$eval('.ProductItem', (productCards) => {
        return productCards.map(document => {
            try {
                const priceNew = document.querySelector('.ProductItem__Price').innerText.replace('TL','')
                const link = document.querySelector(".ProductItem__Title.Heading a").href
       
                const imageUrl =document.querySelector('.ProductItem__Image').srcset.split(',')[0].split(' ')[0]
        
                const title = document.querySelector(".ProductItem__Title.Heading a").innerText
                return {
                    title: 'bagmori ' + title.replace(/İ/g,'i').toLowerCase(),
                    priceNew,
                    imageUrl,
                    link,
                    timestamp: Date.now(),
                    marka: 'bagmori',
                }
            } catch (error) {

                throw error
              //  return {error:error.toString(),content:document.innerHTML}
            }
        
        })
    })





    return data
}


async function getUrls(page) {


   // const nextPage =     await page.$('.Pagination__Nav a')
    const pageUrls = []
    // if(nextPage){
    //     const totalPages = await page.evaluate(()=>Math.max(...Array.from(document.querySelectorAll('.Pagination__Nav a')).map(m=>m.innerText).filter(Number)))

    //     let pagesLeft = totalPages
    //     for (let i = 2; i <= totalPages; i++) {
    
    //         pageUrls.push(`https://www.bagmori.com/search?options%5Bprefix%5D=last&page=${i}&q=Canta&type=product`)
    //         --pagesLeft
    
    //     }
    // }
 

    return { pageUrls, productCount:0, pageLength: pageUrls.length + 1 }
}






module.exports = { handler, getUrls }

