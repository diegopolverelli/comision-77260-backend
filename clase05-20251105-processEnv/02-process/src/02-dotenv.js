import dotenv from "dotenv"
// process.loadEnvFile("./.env")

dotenv.config({
    path: "./.env", 
    override: true, 
    quiet: true
})

console.log(process.env.PORT)
console.log(process.env.MONGO_URL)
console.log(process.env.DB_NAME)

console.log(process.env.PRUEBA_PORT)
console.log(process.env.PRUEBA_SECRET)