import app from "./app.ts";
import { config } from "./config/index.ts";





// Start the server
app.listen( config.port , ()=>{
    console.log(` Server is running on http://localhost:${config.port} `);
    console.log(`Environment : ${ config.nodeEnv }`);
} );