import { usersModel } from "./models/userModel.js";

export class UsersMongoDAO{
    static async get(){
        return await usersModel.find().lean()
    }

    static async save(user){
        let newUser=await usersModel.create(user)
        return newUser.toJSON()
    }
}