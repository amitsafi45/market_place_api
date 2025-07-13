import { HttpException, HttpStatus, ValidationError } from '@nestjs/common';

export const errorMessageExtract = (errors: ValidationError[]) => {
  const result = errors
    .map((error) => {
      if (error.constraints) {
        const firstKey = Object.keys(error.constraints)[0];
        return error.constraints[firstKey];
      }
      return 'Validation error';
    })
    .filter(Boolean);

  return new HttpException(
    {
      success: false,
      statusCode:HttpStatus.BAD_REQUEST,
      message: result[0] ?? 'Invalid input',
    },
    HttpStatus.BAD_REQUEST,
  );
};
