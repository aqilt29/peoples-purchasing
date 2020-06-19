import * as yup from 'yup';

export const headerValidators = yup.object()
  .shape({
    referenceName: yup.string().required('Required!'),
    entity: yup.string().required('Required!'),
    businessNeed: yup.string().required('Required!'),
    shippingAddress: yup.object({
      address: yup.string().required('Required!'),
      address2: yup.string().required('Required!'),
      city: yup.string().required('Required!'),
      state: yup.string().required('Required!'),
      zipCode: yup.string().required('Required!'),
    }),
  })