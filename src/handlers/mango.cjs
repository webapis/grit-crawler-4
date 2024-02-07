
//const {autoScroll}=require('../../utils/autoscroll')
async function handler(page) {
await page.waitForTimeout(5000)
    await page.waitForSelector('.catalog')

    // await autoScroll(page);
   debugger
   
     const data = await page.$$eval("img[data-testid]", (productCards) => {
       return productCards.map(document => {
   try {
       const imageUrl = document.src
    //   const title = document.querySelector('.product-item__info-name a').innerHTML.trim()
     // const priceNew = document.querySelector('.product-item__info-price pz-price').innerText.replace('TL','').trim()
   //    const link = document.querySelector('.product-item__info-name a').href
   
   
       return {
        //   title: 'koton ' + title.replace(/İ/g,'i').toLowerCase(),
       //    priceNew,
           imageUrl,
        //   link,
           timestamp: Date.now(),
           marka: 'mango',
       }
       
       debugger
   } catch (error) {
       return {error:error.toString(),content:document.innerHTML}
   }
   
       })
   })
   debugger
   return  data
   }
   
   
   
   
   async function getUrls(page) {
     const url = await page.url();
     // await page.waitForSelector('.result.-only-desktop')
     // const productCount = await page.$eval('.result.-only-desktop', element => parseInt(element.textContent.replace(/[^\d]/g, "")))
     // const totalPages = Math.ceil(productCount / 59)
     const pageUrls = [];
   
     // let pagesLeft = totalPages
     // for (let i = 1; i <= totalPages; i++) {
   
     //     if (pagesLeft > 0) {
   
     //         pageUrls.push(`${url}?page=` + i)
     //         --pagesLeft
     //     }
   
     // }
   
     return { pageUrls, productCount: 0, pageLength: pageUrls.length + 1 };
   }
 
   
   module.exports = { handler, getUrls }
   