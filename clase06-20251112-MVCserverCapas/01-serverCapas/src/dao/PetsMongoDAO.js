import { petsModel } from "./models/petsModel.js";

export class PetsMongoDAO{
    static async get(){
        return await petsModel.find().lean()
    }

    static async save(mascota){
        let newPet=await petsModel.create(mascota)
        return newPet.toJSON()
    }

    // update, delete, getBy(retorna de a 1)
}