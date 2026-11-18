import mongoose from 'mongoose';
import { config } from './index.ts';


export const connectDatabse = async () : Promise<void> =>{

    try {
        
        await mongoose.connect( config.mongodb_url );

        console.log('✅ MongoDB connected successfully');
        

    } catch (error) {
        console.error('MongoDB connection failed', error);
        process.exit(1)
    }

}


export const disconnectDatabase = async () : Promise<void> =>{

    try {
        
        await mongoose.connection.close();
        console.log('Mongodb disconnected');
        

    } catch (error) {
        console.error('Error disconnecting :', error)
    }

}