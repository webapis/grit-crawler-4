

async function handler(page) {





    const data = await page.$$eval('.productItem', (productCards) => {
        return productCards.map(document => {
try {
    const imageUrl = document.querySelector('.productImage a img').getAttribute('data-original')
    const title = document.querySelector('.productImage a').getAttribute('title')
    const priceNew = document.querySelector('.discountPrice').innerText.replace('₺','').trim()
    const link = document.querySelector('.productImage a').href
  
 
    return {
        title: 'bambiayakkabi ' + title.replace(/İ/g,'i').toLowerCase(),
        priceNew,
        imageUrl,
        link,
        timestamp: Date.now(),
        marka: 'bambiayakkabi',
    }
} catch (error) {
    return {error,content:document.innerHTML}
}
           
        })
    })
return data
}



const productPageSelector='.FiltrelemeUrunAdet'
const linkSelector='.navigation a'
const linksToRemove=[]
const hostname='https://www.bambiayakkabi.com.tr/'
const exclude=[]
const postFix =''
async function getUrls(page) {
     const url = await page.url()
    const nextPage= await page.$('li.appliedFilter span')
    const pageUrls = []
    let productCount =0
    if(nextPage){
        productCount =await page.evaluate(()=>parseInt( document.querySelector('li.appliedFilter span').innerText.replace(/[^\d]/g,'')))
        const totalPages = Math.ceil(productCount / 20)
    
       if (totalPages > 1) {
           let pagesLeft = totalPages
           for (let i = 2; i <= totalPages; i++) {
   
               pageUrls.push(`${url}?sayfa=` + i)
               --pagesLeft
   
   
           }
    }
   
    }


    return { pageUrls, productCount: 0, pageLength:0 }
}

module.exports = { handler, getUrls,productPageSelector,linkSelector,linksToRemove,hostname ,exclude,postFix }

