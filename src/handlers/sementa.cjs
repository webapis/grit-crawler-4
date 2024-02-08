
//const {autoScroll}=require('../../utils/autoscroll')
const initValues ={
    productPageSelector:'[data-product-id]',
    linkSelector:'#main-nav a',
    linksToRemove:[],
    hostname:'https://www.sementa.com/',
    exclude:[],
    postFix:''
  }
async function handler(page) {

    debugger;
    const url = await page.url()


 
  //  await autoScroll(page)
debugger
    const data = await page.$$eval('[data-product-id]', (productCards,url) => {
        return productCards.map(document => {

            try {
             //   const title = document.querySelector('.product-link').getAttribute('aria-label')
                const imageUrl = document.querySelector('[srcset]')? document.querySelector('[srcset]').getAttribute('srcset').split(',')[0].split(' ')[0]:document.querySelector('[data-manual-srcset]').getAttribute('data-manual-srcset').split(',')[0].split(' ')[0]
             //   const priceNew = document.querySelector('.product-price__item').innerText.replaceAll('\n','').replace("TL",'')
            //    const link = document.querySelector('.product-link').href
    
                return {
                 //   title: 'sementa ' + title.replace(/İ/g, 'i').toLowerCase(),
                //    priceNew: priceNew,
                    imageUrl: 'https:'+imageUrl,
                //    link,
                    timestamp: Date.now(),
                    marka: 'sementa',
                   
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
