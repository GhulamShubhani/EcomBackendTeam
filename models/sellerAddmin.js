// const mongoos=require("mongoose");
import mongoos from mongoos;

const sellerAddminSchema=mongoos.schema({
    name:{
        type:String,
        required:[true,"Please enter your name"]
    },
    mobNumber:{
        type:Number,
        required:[true,"Please enter your mobile number"],
        maxLength:[4,"mobile number cannot exceed 10 Number"]
    },
    adharNumber:{
        type:Number,
        required:[true,"Please enter your Adhar number"],
        maxLength:[4,"Adhar number cannot exceed 12 Number"]
    },
    panNumber:{
        type:Number,
        required:[true,"Please enter your Pan number"]
    },
    accountNumber:[
        {
            accountnum:{
                type:Number,
                required:[true,"Please enter your Account number"]
            },
            ifcCode:{
                type:Number,
                required:[true,"Please enter your IFC-CODE number"]
            },  
        }
    ],
    address:[
        {
            village:{
                type:String,
                required:[true,"Please enter your Village"]
            },
            District:{
                type:String,
                required:[true,"Please enter your District"]
            },
            state:{
                type:String,
                required:[true,"Please enter your State Name"]
            },
            PinCode:{
                type:Number,
                required:[true,"Please enter your PinCode"]
            },
            nationality:{
                type:String,
                required:[true,"Please enter your Country Name"]
            }
        }
    ],
})

module.exports=mongoos.model("sellerAddmin",sellerAddminSchema);