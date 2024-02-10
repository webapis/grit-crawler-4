
async function handler(page) {
 
    debugger;
    const data = await page.$$eval('a.group', (productCards) => {

        return productCards.map(document => {
            try {
                
           
            const imageUrl = document.querySelector('img').src

   
            return {
              //  title: 'jimmykey ' + title.replace(/İ/g,'i').toLowerCase(),
               // priceNew,
                imageUrl,
               // link,
                timestamp: Date.now(),
                marka: 'jujumood',

            }

        } catch (error) {
            return {error:error.toString(),content:document.innerHTML
            }  
        }
        })
    })

  

    return data
}

async function getUrls(page) {

    return { pageUrls: [], productCount: 0, pageLength: 0 }
}




module.exports = { handler, getUrls }
