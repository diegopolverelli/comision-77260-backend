import { UsersDTO } from "./UsersDTO.js"

const userRequest={
    nombre:"Juan", 
    email: "jlopez@test.com", 
    clave: "1234"
}

// let userDB=userRequest
let userDB=new UsersDTO(userRequest)

console.log(userDB)