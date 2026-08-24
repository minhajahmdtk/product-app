const mongoose=require('mongoose');
const productSchema=new mongoose.Schema({
  title: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 100,
      trim: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0.01,
    },

    image: {
      type: String,
      required: true,
      validate: {
        validator: function (value) {
          return /^https?:\/\/.+/i.test(value);
        },
        message: "Please enter a valid URL",
      },
    },

    rating: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
    }

})
module.exports=mongoose.model("products",productSchema)