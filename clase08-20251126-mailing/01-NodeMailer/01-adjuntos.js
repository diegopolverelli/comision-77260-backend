import nodemailer from "nodemailer"

const transporter=nodemailer.createTransport(
    {
        service:"gmail", 
        port: 587, 
        auth: {
            user:"diegopolverelli@gmail.com", 
            pass: "eorq wfjk fdol pski"
        }
    }
)

export const enviar=()=>{
    return transporter.sendMail(
        {
            from: "Diego diegopolverelli@hotmail.com", 
            to: "diegopolverelli@hotmail.com",
            subject: "Prueba mail con adjuntos", 
            html: `<h2>Prueba mail con adjuntos</h2>`,
            attachments: [
                {
                    filename: "diego10.jpg", 
                    path: "./images/diego10.jpg"
                }, 
                {
                    filename: "lio.jpg", 
                    path: "./images/lio.jpg"
                }, 
                {
                    filename: "lio2.jpg", 
                    path: "./images/lio2.jpg"
                },
            ]
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