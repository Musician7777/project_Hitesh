// require(dotenv).config{path: './env'}); -> This will also work fine.
import dotenv from 'dotenv';
import mongoDBConnection from './db/index.js';

dotenv.config({
  path: "./.env",
}); //Do try catch for this also -> using .error and .parsed

mongoDBConnection(); //Connects to database.

