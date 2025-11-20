import mongoose from "mongoose";
import { config } from "../config/config.js";
export let DAO

switch (config.PERSISTENCE) {
    case "MONGO":
        await mongoose.connect(config.MONGO_URL, {dbName:config.DB_NAME})
        console.log(`DB online!`)
        DAO=(await import("./usuariosMongoDAO.js")).usuariosMongoDAO

        break;
    case "FS":
        const auxDAO=await import("./usuariosFsDAO.js")
        DAO=auxDAO.usuariosFsDAO
        
        break;

    default:
        throw new Error(`Verifique configuración persistencia`)
        break;
}