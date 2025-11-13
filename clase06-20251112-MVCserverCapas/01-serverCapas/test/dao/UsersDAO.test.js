import mongoose from "mongoose"
import {describe, it} from "mocha"
import { UsersMongoDAO } from "../../src/dao/UsersMongoDAO.js"
import {expect} from "chai"

await mongoose.connect(
    "mongodb+srv://coderhouse:codercoder2023@cluster0.wpxpupc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    {
        dbName: "comisPruebas"
    }
)

describe("Test de Users Mongo DAO", ()=>{
    it("El dao, si ejecuto el metodo get(), retorna un array", async()=>{
        let resultado=await UsersMongoDAO.get()

        expect(Array.isArray(resultado)).to.be.true
    })

    // it("El dao, si ejecuto el metodo get(), retorna un array", async()=>{
    //     let resultado=await UsersMongoDAO.get()

    //     expect(Array.isArray(resultado)).to.be.true
    // })
    // it("El dao, si ejecuto el metodo get(), retorna un array", async()=>{
    //     let resultado=await UsersMongoDAO.get()

    //     expect(Array.isArray(resultado)).to.be.true
    // })

})