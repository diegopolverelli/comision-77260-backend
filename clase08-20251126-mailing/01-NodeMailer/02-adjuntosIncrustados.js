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
            subject: "Prueba mail con adjuntos incrustados", 
            html: `<h2>Prueba mail con adjuntos incrustados</h2>
            <img src="cid:img01" width="300">
            <img src="cid:img02" width="300">
            <img src="cid:img03" width="300">
            `,
            attachments: [
                {
                    filename: "diego10.jpg", 
                    path: "./images/diego10.jpg", 
                    cid: "img01",
                }, 
                {
                    filename: "lio.jpg", 
                    path: "./images/lio.jpg", 
                    cid: "img02",
                }, 
                {
                    filename: "lio2.jpg", 
                    path: "./images/lio2.jpg",
                    cid: "img03",
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