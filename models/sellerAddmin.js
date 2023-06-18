import mongoose from 'mongoose';
const sellerAddminSchema=mongoose.Schema({
    fullName:{
        type:String,
        required:[true,"Please enter your name"]
    },
    email:{
        type:String,
        required:[true,"Please enter your email"]
    },
    password:{
        type:String,
        required:[true,"Please enter your Password"],
        minLength:[4,"please enter atleast 8 char"]
    },
    mobileNumber:{
        type:Number,
        required:[true,"Please enter your mobile number"],
        maxLength:[14,"mobile number not less than 10"]
    },
    adharNumber:{
        type:Number,
        // required:[true,"Please enter your Adhar number"],
        // maxLength:[4,"Adhar number cannot exceed 12 Number"]
    },
    panNumber:{
        type:Number,
        // required:[true,"Please enter your Pan number"]
    },
    accountNumber:[
        {
            accountnum:{
                type:Number,
                // required:[true,"Please enter your Account number"]
            },
            ifcCode:{
                type:Number,
                // required:[true,"Please enter your IFC-CODE number"]
            },  
        }
    ],
    address:[
        {
            village:{
                type:String,
                // required:[true,"Please enter your Village"]
            },
            District:{
                type:String,
                // required:[true,"Please enter your District"]
            },
            state:{
                type:String,
                // required:[true,"Please enter your State Name"]
            },
            PinCode:{
                type:Number,
                // required:[true,"Please enter your PinCode"]
            },
            nationality:{
                type:String,
                // required:[true,"Please enter your Country Name"]
            }
        }
    ],
})

const SellerAdmin=mongoose.model("sellerAddmin",sellerAddminSchema);

export default SellerAdmin