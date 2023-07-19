import mongoose from 'mongoose';

const AllUserSchema = mongoose.Schema({
  type: {
    type: String,
    enum: ["seller", "user"],
    required: true
  },
  firstName: {
    type: String,
    required: [true, "Please enter your name"]
  },
  lastName: {
    type: String,
    required: [true, "Please enter your name"]
  },
  email: {
    type: String,
    required: [true, "Please enter your email"]
  },
  password: {
    type: String,
    required: [true, "Please enter your Password"],
    minLength: [4, "Please enter at least 4 characters"]
  },
  mobileNumber: {
    type: Number,
    required: [true, "Please enter your mobile number"],
    minLength: [9, "Mobile number should not be less than 9 characters"]
  },
  gender: {
    type: String,
    enum: ["male", "female", "other"],
    required: true
  },
  country: {
    type: String,
    default: null
  },
  adharNumber: {
    type: Number,
    default: null
  },
  profilePicture: {
    type: String
  },
  panNumber: {
    type: Number
    // required: [true, "Please enter your Pan number"]
  },
  device: {
    fcmToken: {
      type: String,
      required: true
    },
    deviceName: {
      type: String,
      required: true
    },
    deviceCountryCode: {
      type: String,
      required: true
    },
    deviceLanguageCode: {
      type: String,
      required: true
    },
    deviceIdentifier: {
      type: String,
      required: true
    }
  },
  accountNumber: [
    {
      accountnum: {
        type: Number
      },
      ifcCode: {
        type: Number
      }
    }
  ],
  address: [
    {
      village: {
        type: String
      },
      District: {
        type: String
      },
      state: {
        type: String
      },
      PinCode: {
        type: Number
      },
      nationality: {
        type: String
      }
    }
  ]
});

const AllUser = mongoose.model("AllUser", AllUserSchema);

export default AllUser;
