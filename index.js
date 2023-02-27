import 'dotenv/config'
import './database/connectdb.js'
import express from 'express';
import routerApi from './routes/index.js';

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 5000;
routerApi(app);


app.listen(PORT, () => {
    console.log(`Servidor en el puerto ${PORT}`);
});
