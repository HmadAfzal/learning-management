import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import * as dynamoose from "dynamoose";
import courseRoutes from './routes/course.routes';
import userClerkRoutes from './routes/userClerk.routes';
import { clerkMiddleware, createClerkClient, requireAuth} from "@clerk/express";

dotenv.config();
const isProduction=process.env.NODE_ENV==='production';

if (!isProduction) {
  dynamoose.aws.ddb.local();
}


export const clerkClient = createClerkClient({
    secretKey: process.env.CLERK_SECRET_KEY,
    publishableKey: process.env.CLERK_PUBLISHABLE_KEY,
  });
  

const app=express();
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cors());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy:"cross-origin"}));
app.use(morgan('common'))
app.use(clerkMiddleware());


// Routes

app.use('/courses',courseRoutes);
app.use('/users/clerk', requireAuth(),userClerkRoutes )
app.get('/',(req,res)=>{
    res.json({message:'Hello World'});
});


// Server 
 
const port=process.env.PORT || 8001;
if(!isProduction){
    app.listen(port,()=>{
        console.log(`Server is running on http://localhost:${port}`);
    });
}