import { createRequire } from 'module';
import {Dataset } from 'crawlee';
const require = createRequire(import.meta.url);
require("dotenv").config();
const algoliasearch = require("algoliasearch");

const client = algoliasearch("7JF244QSZZ", process.env.ALGOLIAKEY);
const marka = process.env.marka
function setSettings(index) {
  return new Promise((resolve, reject) => {
    try {
      index
        .setSettings({
          attributeForDistinct: "brand",
          distinct: true,
        })
        .then(() => {
          return resolve(true);
        });
    } catch (error) {
      return reject(error);
    }
  });
}

async function importLinkData({ data,brand }) {
  const linkIndex = client.initIndex("brand");
  

  let hits = [];
 const result = await linkIndex.browseObjects({
  batch: batch => {
    hits = hits.concat(batch);
  },
  attributesToRetrieve: ["objectID"],
  query: brand
})
debugger
const objectsToDelete = hits.map(m=>m.objectID)
debugger
await linkIndex.deleteObjects(objectsToDelete)
debugger
//  await setSettings(linkIndex);
  return new Promise((resolve, reject) => {
    try {
      linkIndex
        .saveObjects(data, { autoGenerateObjectIDIfNotExist: true })
        .then((d) => {
          return resolve(d);
        });
    } catch (error) {
      return reject(error);
    }
  });
}

const dataDataset = await Dataset.open('brands');
const { items} = await dataDataset.getData();
debugger
console.log('items---',items)//
if(items.length>0){
  await importLinkData({data:items.map(m=>{return {...m,brand:marka}}),brand:marka })
}else{
  throw 'No Items found to upload'
}



