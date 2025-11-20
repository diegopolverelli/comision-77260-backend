import mongoose from "mongoose"
export const usersModel=mongoose.model("users", 
    new mongoose.Schema(
        {
            nombre: String, 
            email: {type: String, unique:true}
        },
        {
            timestamps:true
        }
    )
)