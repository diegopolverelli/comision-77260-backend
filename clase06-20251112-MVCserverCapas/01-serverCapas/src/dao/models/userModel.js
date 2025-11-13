import mongoose from "mongoose";
export const usersModel=mongoose.model(
    "users", 
    new mongoose.Schema(
        {
            name:String, 
            email: {
                type:String, unique:true
            }
        }, 
        {
            timestamps:true
        }
    )
)