import * as express from 'express';
import * as bodyParser from "body-parser";
import * as cors from "cors"
import * as dotenv from 'dotenv'
import DB from './Config/DBConnection'
import logger from './Middleware/logger';
import User from './Routes/User.Routes'
const app = express();
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
dotenv.config()
const PORT=process.env.PORT ||8000

app.use('/api',User)

DB().then(() => {
  
  app.listen(PORT, () => {
    console.log(`port Running in ${PORT}`);
    
  })
}).catch((err) => {
  logger.error(err)
})










