import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import db from './db.js';
import user from './controllers/user.js';

const app = express();

app.use(bodyParser.json());
app.use(express.json());

app.use('/user',user)
app.listen(3000);
