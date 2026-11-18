import app from './app.ts';
import { connectDatabse, disconnectDatabase } from './config/database.ts';
import { config } from './config/index.ts';
import { createAdminAccount } from './controllers/user.controllers.ts';



const startServer = async ()=>{

    try {

        // 1 connect to db
        await connectDatabse();

        // 2 start express server
        app.listen(config.port, ()=>{
            console.log(`Server running on http://localhost:${config.port}`);
            
        })
        
        createAdminAccount();


    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }

}


// GRACEFUL SHUTDOWN

process.on('SIGTERM', async ()=>{
    console.log('SIGTERM received');
    await disconnectDatabase();
    process.exit(0);
})

process.on('SIGINT', async ()=>{
    console.log('SIGINT received');
    await disconnectDatabase();
    process.exit(0);
})


startServer();