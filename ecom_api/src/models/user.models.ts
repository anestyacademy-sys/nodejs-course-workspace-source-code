import mongoose, { Schema, Document } from "mongoose";
import bcrypt from 'bcrypt';

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    role: 'user' | 'admin';
    createdAt: Date;
    updatedAt: Date;
}

const userSchema = new Schema<IUser>({

        name: {
            type: String,
            required: [true, 'name is required'],
        },
        email: {
            type:String,
            required: [ true, 'email is required' ],
            unique: true
        },
        password: {
            type: String,
            required: [true, 'password is required'],
        },
        role: {
            type: String,
            enum: ['user', 'admin'],
            default: 'user'
        }

    },
    {
        timestamps: true
    }

)


userSchema.pre('save', async function(){

    if(!this.isModified('password')){
        return;
    }

    try {
        
        const salt = await bcrypt.genSalt(10);

        this.password = await bcrypt.hash(this.password, salt);

    } catch (error) {
        return error;
    }

})




export const User = mongoose.model<IUser>('User', userSchema);