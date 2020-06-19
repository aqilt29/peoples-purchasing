import * as yup from 'yup';

export const headerValidators = yup.object()
  .shape({
    referenceName: yup
      .string()
      .required('Required!'),
  })