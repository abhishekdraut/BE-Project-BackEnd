const S3=require('aws-sdk/clients/s3');
const config = require('config')

const accessKeyId =config.get('AWSAccessKeyId');
const secretAccessKey =config.get('AWSSecretKey');
const region=config.get('Region');
const bucket=config.get('Bucket');
const fs=require('fs');

const s3=new S3({
    region,accessKeyId,secretAccessKey}) 

async function UploadFile(file) {

    const fileStream=fs.createReadStream(file.path);

    const uploadParams={
        Bucket: bucket,
        Body:fileStream,
        Key:file.filename
    }
   return(s3.upload(uploadParams).promise())
}
async function getFile(fileKey){
    
    
        const downloadParams={
            Key:fileKey,
            Bucket:bucket
        }
        return (s3.getObject(downloadParams).createReadStream())
      

       
    
     
 
    
    
}
    
    
    
    



module.exports={UploadFile,getFile}

