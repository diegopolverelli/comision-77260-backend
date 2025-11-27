import nodemailer from "nodemailer"

const transporter=nodemailer.createTransport(
    {
        // host: "mail.miempresa.com",
        service: "gmail", 
        port: 582, 
        auth:{
            user: "diegopolverelli@gmail.com", 
            pass: "eorq wfjk fdol pski"
        }
    }
)

function enviar(){
    return transporter.sendMail(
        {
            from: "Diego diegopolverelli@gmail.com",
            to: "diegopolverelli@hotmail.com, diepol@yahoo.com",
            subject: "Prueba mail simple", 
            // text: "prueba",
            html: `<h2>Prueba mail simple</h2>
            
            <p style="color:blue;">Prueba...!!!</p>
            
            `
        }
    )
}

enviar()
    .then(r=>{
        if(r.rejected.length>0){
            console.log(`Error al enviar correo. `)
            return 
        }
        console.log(`Mail enviado...!!!`)
    })
    .catch(e=>console.log(e))