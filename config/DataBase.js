

import mongoose  from "mongoose";
export const connectDB = async ()=>{

    try{

        const database = await mongoose.connect(process.env.MONGO_URI)
        console.log("test",database.connection.host);
    }catch(err){
        console.log("database error", err);
    }
}

