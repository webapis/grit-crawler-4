
const initValues ={
    productPageSelector:'#ListProductWrapper',
    linkSelector:'.page-sitemap a',
    linksToRemove:[],
    hostname:'https://www.wcollection.com.tr/',
    exclude:[],
    postFix:''
  }
async function handler(page) {
  
debugger
    const url = await page.url()

  await page.waitForTimeout(5000)
   // await autoScroll(page)

    const data = await page.$$eval('swiper-slide', (productCards) => {
        return productCards.map(document => {
try {
    const imageUrl = document.querySelector('swiper-slide img').src
   // const title = document.querySelector('.product-item__name').innerText
   //// const priceNew = document.querySelector('.discount-price')?document.querySelector('.discount-price').innerText.replace('₺','').trim().replace(/[a-z]/gi, '') :document.querySelector('.product-item-price-wrapper').innerText.replace('₺','').trim().replace(/[a-z]/gi, '') 
   // const link = "https://www.wcollection.com.tr/" +document.querySelector('.product-item__name[href]').getAttribute('href')


    return {
     //   title: 'wcollection ' + title.replace(/İ/g,'i').toLowerCase(),
     //   priceNew:priceNew.replaceAll('\n','').trim(),
        imageUrl,
    //    link,
        timestamp: Date.now(),
        marka: 'wcollection',
    }
} catch (error) {
    return { error: error.toString(), content: document.innerHTML };
}
   
        })
    })
debugger
    
return data
}

async function getUrls(page) {
    const url = await page.url()
 const nextPage =   await page.$('.list__filters__item-count--number')
 let productCount =0
    const pageUrls = []

if(nextPage){
     productCount = await page.$eval('.list__filters__item-count--number', element => parseInt(element.innerText))
    const totalPages = Math.ceil(productCount / 48)
    for (let i = 2; i <= totalPages; i++) {
        pageUrls.push(`${url}?page=` + i)
    }
}


    return { pageUrls, productCount, pageLength: pageUrls.length + 1 }
}
module.exports = { handler, getUrls,...initValues }
