import { dirname } from "path"
import { fileURLToPath } from "url"
import multer from "multer"


export const __dirname = dirname(fileURLToPath(import.meta.url))

// console.log(__dirname )

// Configuracion MULTER
const storage = multer.diskStorage(
    {

        destination: function (req, file, cb) {
            cb(null, __dirname + "/src/public/img")
        },


        filename: function (req, file, cb) {

            cb(null,file.originalname)

        }
    }
)

export const uploader = multer({
    storage,

    onError: function (err, next) {
        console.log(err);
        next();
    }
});


