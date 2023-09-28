import { dirname } from "path"
import { fileURLToPath } from "url"
import multer from "multer"
//2
import bcrypt from "bcrypt"


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

//bcryp
//3
export const createHash = contrasena => bcrypt.hashSync(contrasena, bcrypt.genSaltSync(10))
//4
export const isValidPassword = (user, contrasena) => {
    console.log(`Datos a validar: user-password: ${user.contrasena}, password: ${contrasena}`);
    return bcrypt.compareSync(contrasena, user.contrasena)
}

