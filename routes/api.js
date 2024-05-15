/* AUTHOR : CARLO DOMINGUEZ */

import express from 'express';
import path from 'path';
 
import fs from 'fs';

//dirname is deprecated, resurrecting it via declaring it as variable
import * as url from 'url'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))


const router = express.Router()
router.get('/', async(req, res)=>{
    res.sendFile(path.join(__dirname, '../public_html/src/index.html'))
    // res.sendFile(path.join(__dirname, '../public_html/src/HomePage.html'))
})

router.get('/:fileName', async (req ,res) => {
  const { fileName } = req.params
  const filePath = path.join(__dirname, `../${process.env.ENV_LOCAL}/public_html/src/${fileName}.html`)
  console.log('filepath ', filePath)
  if (fs.existsSync(filePath)) {
    res.sendFile(filePath)
  } else {
    res.status(404).send('File not found')
  }
})


export default router
