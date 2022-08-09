import React, { useEffect, useState } from "react";
import axios from "axios";

const baseURL = 'http://127.0.0.1:10000/devstoreaccount1/mycontainer/document.json?sv=2018-03-28&st=2022-07-22T05%3A26%3A35Z&se=2022-07-23T05%3A26%3A35Z&sr=c&sp=rcwl&sig=naXMI63ScsIfePgkYxzwwIuYF6UhpWc4Y9g0%2BFhHmFw%3D';

function   saveDataToDatabase(data){
    axios({
        method: 'put',
        url: baseURL,
        data: data,
        headers:{
            'x-ms-blob-type':'BlockBlob'
        }
      }).then(()=>{
        console.log("successfully saved")
        // console.log('DATA:',data)
      }).catch((e)=>{
        console.log("ERROR:",e)
      })
}


export { saveDataToDatabase };