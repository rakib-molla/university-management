import { z } from "zod";

const createAcademicDepartmentValidationSchema = z.object({
 body: z.object({
  name: z.string({
   required_error: 'Name is required',
   invalid_type_error: 'academic Department must be string',
  }),
  academicFaculty: z.string({
   invalid_type_error: 'academic Department must be string',
   required_error: 'Academic faculty is required',
  })
 })
})
const updateAcademicDepartmentValidationSchema = z.object({
 body: z.object({
  name: z.string({
   required_error: 'Name is required',
   invalid_type_error: 'academic Department must be string',
  }),
  academicFaculty: z.string({
   invalid_type_error: 'academic Department must be string',
  })
 })
})

export const AcademicDepartmentValidation = {
 createAcademicDepartmentValidationSchema,
 updateAcademicDepartmentValidationSchema
}