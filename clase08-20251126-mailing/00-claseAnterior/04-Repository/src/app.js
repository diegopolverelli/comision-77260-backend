import express from 'express';
import { router as clientesRouter} from './routes/clientes.router.js';
import { router as ticketsRouter } from './routes/ticket.routes.js';
const PORT=3000;

const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/api/clientes', clientesRouter)
app.use("/api/tickets", ticketsRouter)


const server=app.listen(PORT,()=>{
    console.log(`Server escuchando en puerto ${PORT}`);
});
