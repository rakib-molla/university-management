import { Student } from './student.model';
import { TStudent } from './student.interface';

const createStudentIntoDB = async (studentData: TStudent) => {
  if (await Student.isUserExists(studentData.id)) {
    throw new Error('User Already Exists!');
  }

  const result = await Student.create(studentData); // build in static method
  // const student = new Student(studentData); // create an instance
  // if( await student.isUserExists(studentData.id)){
  //   throw new Error('User already exists !')
  // }

  // const result = student.save();

  return result;
};

const getallStudentFromDB = async () => {
  const result = await Student.find();
  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  // const result = await Student.findOne({ id });
  // using aggregation
  const result = await Student.aggregate([{ $match: { id: id } }]);
  return result;
};
const deleteStudentFromDB = async (id: string) => {
  const result = await Student.updateOne({ id }, { isDeleted: true });
  return result;
};

export const StudentServices = {
  createStudentIntoDB,
  getallStudentFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB,
};
