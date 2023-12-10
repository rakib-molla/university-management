import { Schema, model } from 'mongoose';
import {
  TGuardian,
  TLocalGuardian,
  TStudent,
  StudentModel,
  TUserName,
} from './student.interface';
import validator from 'validator';
import AppError from '../../errors/AppErrrors';
import httpStatus from 'http-status';





const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    maxlength: [20, ' first name can not be more than allowed length is 20'],
    trim: true,
    validate: {
      validator: function (value: string) {
        const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);
        return firstNameStr === value;
      },
      message: '{VALUE} is not a capitalize format',
    },
  },
  middleName: {
    type: String,
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    validate: {
      validator: (value: string) => validator.isAlpha(value),
      message: '{VALUE} is not valid',
    },
  },
});

const guardianSchema = new Schema<TGuardian>({
  fatherName: { type: String, required: [true, 'father name is required'] },
  fatherOccupation: {
    type: String,
    required: [true, 'father occupation is required'],
  },
  fatherContactNo: {
    type: String,
    required: [true, 'father contact no is required'],
  },
  motherName: { type: String, required: [true, 'mother name is required'] },
  motherContactNo: {
    type: String,
    required: [true, 'mother contact no is required'],
  },
  motherOccupation: {
    type: String,
    required: [true, 'mother occupation  is required'],
  },
});

const localGuardianSchema = new Schema<TLocalGuardian>({
  name: { type: String },
  occupation: { type: String },
  contactNo: { type: String },
  address: { type: String },
});

const studentSchema = new Schema<TStudent, StudentModel, StudentMethods>(
  {
    id: { type: String, required: true, unique: true },
    user: {
      type: Schema.Types.ObjectId,
      required: [true, 'User id is required'],
      unique: true,
      ref: 'User',
    },
    
    name: {
      type: userNameSchema,
      required: true,
    },
    gender: {
      type: String,
      enum: {
        values: ['male', 'female', 'other'],
        message: '{VALUE} is not valid',
      },
      required: [true, 'gender is required'],
    },
    dateOfBirth: { type: Date },
    email: {
      type: String,
      required: [true, 'email is required'],
      unique: true,
      validate: {
        validator: (value: string) => validator.isEmail(value),
        message: '{VALUE} is not a valid type',
      },
    },
    contactNo: { type: String, required: [true, 'contact no is required'] },
    emergencyNo: { type: String, required: [true, 'emergency field required'] },
    bloodGroup: {
      type: String,
      enum:
        // {
        // values:
        ['A+', 'A-', 'AB+', 'AB-', 'B+', 'B-', 'O+', 'O-'],
      // message: "the field can only be one of the following: 'abc'"
      // },
    },
    presentAddress: { type: String, required: [true, 'field is required'] },
    permanentAddress: { type: String, required: [true, 'field is required'] },
    guardian: {
      type: guardianSchema,
      required: [true, 'field is required'],
    },
    localGuardian: {
      type: localGuardianSchema,
      required: [true, 'field is required'],
    },
    profileImg: { type: String },
    admissionSemester:{
      type: Schema.Types.ObjectId,
      ref: 'AcademicSemester',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    academicDepartment:{
      type: Schema.Types.ObjectId,
      ref: 'AcademicDepartment',
    }
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
);

// virtual
studentSchema.virtual('fullName').get(function () {
  return `${this.name.firstName} ${this.name.middleName} ${this.name.lastName}`;
});




// Query middleware
studentSchema.pre('find',async function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
// Query middleware
studentSchema.pre('findOne',async function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
// Query middleware
studentSchema.pre('aggregate',async function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

// creating a custom static method
studentSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await Student.findOne({ id });
  return existingUser;
};

studentSchema.pre('findOneAndUpdate', async function (next) {
  const query = this.getQuery();
  console.log(query);
  const isStudentExist = await Student.findOne(query);

  if (!isStudentExist) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'This department does not exist! ',
    );
  }

  next();
});

export const Student = model<TStudent, StudentModel>('Student', studentSchema);
