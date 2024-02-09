
//const {autoScroll}=require('../../utils/autoscroll')
const initValues ={
    productPageSelector:'.categoryitem',
    linkSelector:'#navigationbar a',
    linksToRemove:[],
    hostname:'https://www.patirti.com/',
    exclude:[],
    postFix:''
  }
//currentPrice
async function handler(page, ) {
 
        debugger
//await autoScroll(page)
const url = await page.url()
debugger
const data = await page.$$eval('.categoryitem', (productCards) => {
    return productCards.map(document => {
try {
const imageUrl = document.querySelector('.itemimagecontainer img')?'https://www.patirti.com'+ document.querySelector('.itemimagecontainer img').getAttribute('data-src'):null
//const title = document.querySelector('.categorydetail').innerText
//const priceNew = document.querySelector('.pricenew').innerText.replace('₺','')
//const link = document.querySelector('.categoryitemlink').href

return {
   //title,
   // priceNew,
    imageUrl,
  //  link,
    timestamp: Date.now(),
    marka: 'patırtı',
} 
} catch (error) {
return {error:error.toString(),content:document.innerHTML}
}
      
    })
})
debugger
    return data.filter(f=>f.imageUrl)






    
}





async function getUrls(page) {


    const pageUrls = []

    return { pageUrls, productCount: 0, pageLength: pageUrls.length + 1 }
}
module.exports = { handler, getUrls,...initValues }


