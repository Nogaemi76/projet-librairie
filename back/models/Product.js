const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ProductSchema = new Schema(
  {
    isbn: {
      type: String
    },
    seriestitle: {
      type: String
    },
    albumtitle: {
      type: String
    },
    seriesnumber: {
      type: Number
    },
    writer: {
      type: String
    },
    artist: {
      type: String
    },
    price: {
      type: Number
    },
    imageurl: {
      type: String
    },
    imageurlthumb: {
      type: String
    }
  },
  {
    collection: "products"
  }
);
const Product = mongoose.model('Product', ProductSchema);
module.exports = Product;