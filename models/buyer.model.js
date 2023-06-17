 

const mongoose = require('mongoose');

 
const buyerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
//   orders: [
//     {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'Order'
//     }
//   ],
  address: {
    street: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    state: {
      type: String,
      required: true
    },
    country: {
      type: String,
      required: true
    },
    postalCode: {
      type: String,
      required: true
    }
  },
  cart: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
      },
      quantity: {
        type: Number,
        required: true
      }
    }
  ],
  paymentDetails: {
    cardNumber: {
      type: String,
      required: true
    },
    expirationDate: {
      type: String,
      required: true
    },
    cvv: {
      type: String,
      required: true
    }
  },
  orderHistory: [{
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order',
      required: true
    },
    date: {
      type: Date,
      required: true
    },
    totalAmount: {
      type: Number,
      required: true
    }, }]
 
});

 
const Buyer = mongoose.model('Buyer', buyerSchema);

module.exports = Buyer;
