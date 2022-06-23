import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import ReservaRouter from './routers/ReservasRouter.js';
import AmenityRouter from './routers/AmenityRouter.js';
const app = express();
app.use(cors());
app.use(bodyParser.json());
new ReservaRouter(app, "/api/reservas");
new AmenityRouter(app, "/api/amenities");
const port = 3000;
app.listen(port, () => {
    console.log(`Servicio escuchando en ${port}`);
});
