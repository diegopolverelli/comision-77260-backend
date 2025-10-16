import mongoose from "mongoose";

export const usuariosModelo=mongoose.model(
    "usuarios", 
    new mongoose.Schema(
        {
            nombre: String, 
            email: {
                type: String, 
                unique: true
            }, 
            rol: {
                type: String, 
                default: "user"
            }, 
            password: String
        }, 
        {
            // collection: "usuarios2024", 
            timestamps: true, 
            // strict: false,
        }
    )
)