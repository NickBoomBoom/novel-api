const mongoose = require('mongoose');
const { Schema, Types } = mongoose

// Schema
const usersSchema = new Schema({
  username: { type: String, trim: true, required: [true, 'username不能为空'] },
  password: { type: String, required: [true, 'password不能为空'] },
  createAt:{type: Date, required:[true, 'createAt不能为空']}
})

// Model
const Users = mongoose.model('User', usersSchema);

module.exports = Users;