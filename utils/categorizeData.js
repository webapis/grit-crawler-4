
import { createRequire } from 'module';
import { Dataset } from 'crawlee';
import fs from 'fs'

import searchObject from './searchObject.js';

const require = createRequire(import.meta.url);
require("dotenv").config();
const genders = require('./data/gender.json')
const category = require('./data/kategori.json')

const dataDataset = await Dataset.open('brands');
const { items } = await dataDataset.getData();

const data = items.map(m => {

    //gender
    const genderArray = genders.map(m => m.keywords).flat()
    const genderKeyword = searchObject(m, genderArray)
    const genderName = genders.find(f => f.keywords.includes(genderKeyword))
    //kategori
    const kategoryArray = category.map(m => m.keywords).flat()
    const kategoryKeyword = searchObject(m, kategoryArray)
    const kategoryName = category.find(f => f.keywords.includes(kategoryKeyword))
    return { ...m, gender: genderKeyword ? genderName.name : "diğer", category: kategoryKeyword ? kategoryName.name : "diğer"}
})

fs.writeFileSync('./data.json', JSON.stringify(data))
debugger



function getDomainWithoutWwwAndTld(url) {
    const regex = /(?:https?:\/\/)?(?:www\.)?([^.]+)\..*/;
    const match = url.match(regex);
    return match ? match[1] : null;
  }