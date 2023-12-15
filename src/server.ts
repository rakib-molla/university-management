import mongoose from 'mongoose';
import config from './app/config';
import app from './app';
import {Server} from 'http';

let server: Server;


async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    server = app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}
main();

process.on('unhandledRejection', ()=>{
  console.log('unhandledRejection is detected shuting down server');
  if(server){
    server.close(()=>{
      process.exit(1)
    })
  }
  process.exit();
})

process.on('uncaughtException', ()=>{
  console.log('uncaught Exception is detected');
  process.exit(1);
})

