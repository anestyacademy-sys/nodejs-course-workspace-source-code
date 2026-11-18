import multer from 'multer';
import path from 'path';
import fs from 'fs';


const uploadDir = 'uploads/products';


if(!fs.existsSync(uploadDir)){
    fs.mkdirSync( uploadDir, { recursive: true } )
}



const storage = multer.diskStorage({

    destination: (req, file, cb)=>{
        cb(null, uploadDir)
    },
    filename: (req, file, cb)=>{
        // Generate unique filename
        // Format: product-1234567890-randomstring.jpg

        const uniqueSuffixe = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname( file.originalname );
        const filename = `product-${uniqueSuffixe}${ext}`;

        cb(null, filename);
    }

})


export const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024
    }
})

