

async function handler(page) {



      const data = await page.$$eval('.product-item__inner', (productCards) => {
          return productCards.map(document => {
              try {
  
                  const imageUrl ='https:'+ document.querySelector('[srcset]').getAttribute('srcset').split(',')[0].split(' ')[0]
                //  const title = document.querySelector('.productName.detailUrl a').innerHTML.trim()
                //  const priceNew = document.querySelector('.discountPrice span').innerHTML.replace('₺', '').replace(/\n/g, '').trim()
                ///  const link = document.querySelector('.productName.detailUrl a').href
            
                  return {
                    //  title: ' ' + title,
                    //  priceNew,
                      imageUrl,
                     // link,
                      timestamp: Date.now(),
                      marka: 'asligoncer',
                  }
              } catch (error) {
                  return {error:error.toString(),content:document.innerHTML}
              }
           
          })
      })
      debugger
    
      
          return data
      }
      
  
  
  
  
      async function getUrls(page) {
          const url = await page.url()
  
         const pageUrls = []
         let productCount =0
   
       
          return { pageUrls, productCount, pageLength: pageUrls.length + 1 }
      }
      module.exports = { handler, getUrls}