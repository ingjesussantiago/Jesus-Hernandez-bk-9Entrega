import passport from "passport"
import passportLocal from "passport-local"
import userModel from "../dao/mongoosedb/models/user.model.js"
import { createHash } from "../../utils.js"

const localStrategy = passportLocal.Strategy

const initializePassport = () => {

    // 6
    passport.use('registro', new localStrategy(
        { passReqToCallback: true, usernameField: 'email' },

        async (req, username, password, done) => {
            const { nombre, apellido, email, edad } = req.body;

            try {
                const existe = await userModel.findOne({email})
                if (existe) {
                    return res.status(400).send({ status: "error", mensaje: "usuario ya existe" })
                }

                const user = {
                    nombre,
                    apellido,
                    email,
                    edad,
                    password: createHash(password)

                }

                const result = await userModel.create(user)


                done(null, result)
            

            } catch (error) {
                return done("error registrando el usuario:" + error)
            }


        }
        )
    )

    //7
    passport.use('login', new localStrategy(
        { passReqToCallback: true, usernameField: 'email' },
        async (req, username, password, done) => {
            try {
                const user = await userModel.findOne({ email: username })
                console.log("Usuario encontrado para login:");
                console.log(user);
                if (!user) {
                    console.warn("User doesn't exists with username: " + username);
                    return done(null, false)
                }
                // Validacion de el password
                if (!isValidPassword(user, password)) {
                    return res.status(401).send({ status: "error", error: "Incorrecto los datos" })
                }
                return done(null, user)
            } catch (error) {
                return done(error)
            }
        }
    ));


    //8
    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            let user = await userModel.findById(id);
            done(null, user);
        } catch (error) {
            console.error("Error deserializando el usuario: " + error);
        }
    });










}







export default initializePassport;