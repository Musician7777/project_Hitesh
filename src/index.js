// require(dotenv).config{path: './env'}); -> This will also work fine.
import dotenv from 'dotenv';
import mongoDBConnection from './db/index.js';
import { app } from './app.js'

const result = dotenv.config({
  path: "./.env",
});
//env is loaded or not.
if(result.error){
  throw result.error;
}else{
  console.log("Environment varialbes loaded -> Successfully");
}

mongoDBConnection() //Its an async connection thats why giving provise.
.then(() => {
  console.log(" -> Database Connected successfully");
  //Handling for errors.
  app.on("error", (error)=>{
    console.log("Error : ",error);
    throw error;
  })
  //Making the listener.
  app.listen(process.env.PORT || 8000, () => {
    console.log(` -> ⚙️  Server is listening on PORT : ${process.env.PORT}`);
  });
})
.catch((err) => {
  console.log("Error while connecting to database -> ",err);
})

