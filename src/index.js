import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
const app = express();
app.use(cors());
app.use(bodyParser.json());
const port = 3000;
app.listen(port, () => {
    console.log(`Servicio escuchando en ${port}`);
});
