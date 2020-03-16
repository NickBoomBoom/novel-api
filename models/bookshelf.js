const mongoose = require('mongoose');
const { Schema, Types } = mongoose

// Schema
const novelsSchema = new Schema({
  id: {
    type: Number, required: [true, 'novels.id不能为空']
  },
  image: {
    type: String, required: [true, 'novels.image不能为空']
  }
})

const bookshelfSchema = new Schema({
  username: {
    type: String,
    required: [true, 'username不能为空'],
  },
  novels: [novelsSchema]
})

// Model
const Bookshelfs = mongoose.model('Bookshelf', bookshelfSchema);

module.exports = Bookshelfs;