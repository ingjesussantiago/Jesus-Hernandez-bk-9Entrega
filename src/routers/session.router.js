import { Router } from "express";
import { __dirname } from "../../utils.js"
import userModel from "../dao/mongoosedb/models/user.model.js"



const router = Router()

router.post("/registro", async (req, res) => {
    const { nombre, apellido, email, edad, contrasena } = req.body;
    console.log("registrado");
    console.log(req.body);

    const existe = await userModel.findOne({ email })
    if (existe) {
        return res.status(400).send({ status: "error", mensaje: "usuario ya existe" })
    }

    const user = {
        nombre,
        apellido,
        email,
        edad,
        contrasena,
   
    }

    const result = await userModel.create(user)
    res.send({
        status: "success", mensaje: "usuario creado" + result.id
    })


})

router.post("/login", async (req, res) => {
    const { email, contrasena} = req.body
    const user = await userModel.findOne({ email, contrasena}).lean()
    
 console.log("desde mongo",user);
    if (!user)

        return res.status(401).send({ status: "error", error: "datos incorrectos" })
    
    // alta a ssecion
    req.session.user = {
        nombre: `${user.nombre} ${user.apellido}`,
        email: user.email,
        edad: user.edad,
             
    }
    console.log("desde re",req.session.user);

    if (email=== `adminCoder@coder.com` && contrasena===`1234`  ){
        req.session.user.rol="administrador"
                    
     } else {
        req.session.user.rol="usuario"
    }
console.log(req.session);

    res.send({ status: "succes", payload: req.session.user, mensaje: "primer logeo" })


})

router.get("/logout",(req, res) => {
    req.session.destroy(() => {
        res.redirect("/login")
        console.log("paso todo");
    })
})

export default router
