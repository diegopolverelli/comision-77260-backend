import mongoose from "mongoose"

export class Singleton{
    static #connection

    constructor(url, dbName){
        mongoose.connect(
            url, 
            {
                dbName
            }
        )
    }

    static connDB(url, dbName){
        if(this.#connection){
            console.log(`Conexión a DB previamente establecida...!!!`)
            return this.#connection
        }

        this.#connection=new Singleton(url, dbName)
        console.log(`DB online...!!!`)
        return this.#connection
    }
}