// import mongoose from 'mongoose';


// export const connectDB = async () => {
//   try {
//     const connect = await mongoose.connect(process.env.CONNECTION_STRING);
//     console.log(
//       "Database connected --->",
//       connect.connection.host,
//       connect.connection.name
//     );
//   } catch (err) {
//     console.log(err);

//     process.exit(1);
//   }
// };

import mongoose  from "mongoose";
export const connectDB = async ()=>{

    try{

        const database = await mongoose.connect(process.env.CONNECTION_STRING)
        console.log("test",database.connection.host,database.connection.name);
    }catch(err){
        console.log("database error", err);
    }
}

