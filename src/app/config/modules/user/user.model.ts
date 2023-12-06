import { Schema, model } from "mongoose";
import { TUser } from "./user.interface";
import config from "../../index";
import bcrypt from 'bcrypt';

const userSchema = new Schema<TUser>({
 id:{
  type: String ,
  require: true,
 },
 password:{
  type: String,
  require: true
 },
 needsChangePassword:{
  type: Boolean,
  default: true,
 },
 role:{
  type: String,
  enum: ['student', 'faculty', 'admin'],
 },
 status:{
  type: String,
  enum:['in-progress', 'blocked'],
  default: 'in-progress'
 },
 isDeleted:{
  type: Boolean,
  default: false,
 }
},{
 timestamps: true,
})



userSchema.pre('save', async function (next) {
 const user = this; // this refer for document
 user.password = await bcrypt.hash(
   user.password,
   Number(config.bcrype_salt_round),
 );
 next();
});

// set "" after saving password
userSchema.post('save', function (doc, next) {
 doc.password = '';
 // console.log( 'post hook: we save to data');
 next();
});


export const User = model<TUser>('User', userSchema);