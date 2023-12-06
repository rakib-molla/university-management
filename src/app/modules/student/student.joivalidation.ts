import Joi from 'joi';

// creating a schema validation using joi
const userNameValidationSchema = Joi.object({
  firstName: Joi.string()
    .required()
    .max(20)
    .trim()
    .pattern(/^[A-Z][a-z]*$/, { name: 'capitalized' })
    .message('First name must be capitalized'),
  middleName: Joi.string(),
  lastName: Joi.string()
    .required()
    .pattern(/^[A-Za-z]+$/)
    .message('Last name must contain only alphabetic characters'),
});

const guardianValidationSchema = Joi.object({
  fatherName: Joi.string().required(),
  fatherOccupation: Joi.string().required(),
  fatherContactNo: Joi.string().required(),
  motherName: Joi.string().required(),
  motherContactNo: Joi.string().required(),
  motherOccupation: Joi.string().required(),
});

const localGuardianValidationSchema = Joi.object({
  name: Joi.string(),
  occupation: Joi.string(),
  contactNo: Joi.string(),
  address: Joi.string(),
});

const studentValidationSchema = Joi.object({
  id: Joi.string().required(),
  name: userNameValidationSchema.required(),
  gender: Joi.string().valid('male', 'female', 'other').required(),
  dateOfBirth: Joi.string(),
  email: Joi.string().email().required(),
  contactNo: Joi.string().required(),
  emergencyNo: Joi.string().required(),
  bloodGroup: Joi.string().valid(
    'A+',
    'A-',
    'AB+',
    'AB-',
    'B+',
    'B-',
    'O+',
    'O-',
  ),
  presentAddress: Joi.string().required(),
  permanentAddress: Joi.string().required(),
  guardian: guardianValidationSchema.required(),
  localGuardian: localGuardianValidationSchema.required(),
  profileImg: Joi.string(),
  isActive: Joi.string().valid('active', 'blocked').default('active'),
});

export default studentValidationSchema;
