
//const {autoScroll}=require('../../utils/autoscroll')
const initValues ={
    productPageSelector:'',
    linkSelector:'',
    linksToRemove:[],
    hostname:'',
    exclude:[],
    postFix:''
  }
async function handler(page) {

    debugger;
    const url = await page.url()


 
   // await autoScroll(page)
debugger
    const data = await page.$$eval('[id^="ProductGridItem"]', (productCards,url) => {
        return productCards.map(document => {

            try {
             //   const title = document.querySelector('.product-link').getAttribute('aria-label')
                const imageUrl = document.querySelector('[id^="ProductGridItem"] img')
             //   const priceNew = document.querySelector('.product-price__item').innerText.replaceAll('\n','').replace("TL",'')
              //  const link = document.querySelector('.product-link').href
    
                return {
                 //   title: 'stradivarius ' + title.replace(/İ/g, 'i').toLowerCase(),
                  //  priceNew: priceNew,
                    imageUrl,
                  //  link,
                    timestamp: Date.now(),
                    marka: 'stradivarius',
    
                }      
            } catch (error) {
                return {error:error.toString(),url,content:document.innerHTML}
            }

        })
    },url)
debugger

    return data


}





async function getUrls(page) {

    const pageUrls = []


    return { pageUrls, productCount: 0, pageLength: pageUrls.length + 1 }
}
module.exports = { handler, getUrls,...initValues }
