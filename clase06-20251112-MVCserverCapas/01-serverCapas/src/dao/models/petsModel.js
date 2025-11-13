import mongoose from "mongoose";
export const petsModel=mongoose.model(
    "pets", 
    new mongoose.Schema(
        {
            name: String, 
            specie: String, 
            birthDate: Date,
        }, 
        {
            timestamps:true
        }
    )
)