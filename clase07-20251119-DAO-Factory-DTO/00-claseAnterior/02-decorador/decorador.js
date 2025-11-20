
// @decorador(parametro1, parametro2)  // forma habitual de encontrar decoradores (en frameworks)
const suma=(a,b)=>{
    return a+b
}

console.log(suma(4,5))


const decoradorLog=(fn)=>{
    return (...args)=>{    // ... op rest

        // funcionalidad requerida
        console.log(`La función ${fn.name} se ejecuto en ${new Date().toLocaleDateString()}`)

        return fn(...args)    /// ... son spread
    }
}

const sumaConLog=decoradorLog(suma)

console.log(suma(5, 4))
console.log(sumaConLog(6, 6))


