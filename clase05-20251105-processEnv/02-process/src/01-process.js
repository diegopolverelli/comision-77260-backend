import fs from "fs"
console.log(`Process...!!!`)

process.on("uncaughtException", error=>{
    console.log(`Ocurrió un error: ${error.message}`)
})

process.on("exit", code=>{
    console.log(`El script está a punto de terminar`)
})

console.log("pid", process.pid)
console.log("directorio", process.cwd())
console.log("uso de memoria", process.memoryUsage())
console.log("uso CPU", process.cpuUsage())

// console.log("argumentos consola:", process.argv)

// let {name, password}=req.body
// let [rutaNode, rutaScript, ...argumentos]=process.argv  // ... son aqui el operador rest
let [ , , ...argumentos]=process.argv  // ... son aqui el operador rest

// console.log(argumentos)

let indicePort=argumentos.findIndex(a=>a=="--port")
if(indicePort==-1){
    console.log(`Complete el puerto: --port`)
    process.exit()
}

if(argumentos.includes("error")){
    throw new Error("error forzado x args...")
}

const PORT=argumentos[indicePort+1]

console.log(`Server on line in port ${PORT}`)

// console.log("variables de entorno:", process.env)
console.log("variables de entorno:", process.env.PRUEBA_PORT)
console.log("variables de entorno:", process.env.PRUEBA_SECRET)

