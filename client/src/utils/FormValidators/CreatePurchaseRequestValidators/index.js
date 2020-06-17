import * as yup from 'yup';

export const headerValidators = yup.object()
  .shape({
    project: yup
      .string()
      .required('Required!'),
  })