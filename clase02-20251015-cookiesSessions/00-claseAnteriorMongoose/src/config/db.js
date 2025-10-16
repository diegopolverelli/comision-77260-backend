import mongoose from "mongoose"

export const connDB=async(url, db)=>{
    try {
        await mongoose.connect(
            url, 
            {
                dbName: db
            }
        )

        console.log(`DB Online!`)
    } catch (error) {
        console.log(`Error al conectar a DB: ${error.message}`)
    }
}