function uploadImage(fileImage){
    return{
        Bucket: 'soundstreamresources',
        Key: `images/${fileImage.originalname}`,
        Body: fileImage.buffer,
        ContentType:fileImage.mimetype
    };
}

function uploadMusic(fileMusic){
    return{
        Bucket: 'soundstreamresources',
        Key: `music/${fileMusic.originalname}`,
        Body: fileMusic.buffer,
        ContentType:fileMusic.mimetype
    };
}

module.exports = {uploadImage,uploadMusic}


