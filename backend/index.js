import express from "express";
import dotenv from "dotenv";
import cors from 'cors';
import {BlobServiceClient  } from "@azure/storage-blob";
import { setLogLevel } from "@azure/logger";



dotenv.config();
const app = express();
setLogLevel("info");
app.use(cors())

 
// GET method route
app.get('/', (req, res, next) => {
    res.send('welcome to the homepage')
})
  
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});





const AZURE_STORAGE_CONNECTION_STRING = process.env.AZURE_STORAGE_CONNECTION_STRING;
const containerName = 'mycontainer'
const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);
const blobName = "document.json";
const containerClient = blobServiceClient.getContainerClient(containerName);
const blockBlobClient = containerClient.getBlockBlobClient(blobName);




async function uploadBlobToTheContainer(mydata){
  const data1 = mydata;
  const uploadBlobResponse = await blockBlobClient.upload(data1, data1.length);
  console.log(
    "Blob was uploaded successfully. requestId: ",
    uploadBlobResponse.requestId
  );
}

async function streamToText(readable) {
  readable.setEncoding('utf8');
  let data = '';
  for await (const chunk of readable) {
    data += chunk;
  }
  return data;
}
async function readDataFromBlob(){
    const downloadBlockBlobResponse = await blockBlobClient.download(0);
    console.log("\nDownloaded blob content...");
    const myData = await streamToText(downloadBlockBlobResponse.readableStreamBody);
    console.log(myData);
    return(myData);
}


















// routes for crud operation:
// create route
app.put('/create', function (req, res, next) {
  const tempData = JSON.stringify(req.body);
  console.log(tempData)
   uploadBlobToTheContainer("tempData").then(() => console.log('Done'))
  .catch((ex) => console.log(ex.message));
  res.send(tempData)
})

// read all route
app.get('/getall', function (req, res, next) {
  const idata = readDataFromBlob().then(() => console.log('Done'))
  .catch((ex) => console.log(ex.message));
  console.log(idata)
  res.send(idata)
})

// delete route
app.put('/delete', function (req, res, next) {
  res.send("item deleted")
})

// update route

app.put('/update', function (req, res, next) {
  res.send("item update")
})








  // uploadBlobToTheContainer("hello world updated").then(() => console.log('Done'))
  // .catch((ex) => console.log(ex.message));




// const idata = readDataFromBlob().then(() => console.log('Done'))
//   .catch((ex) => console.log(ex.message));

// console.log(idata)




