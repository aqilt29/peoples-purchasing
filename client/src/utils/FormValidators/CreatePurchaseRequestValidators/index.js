import * as yup from 'yup';

export const headerValidators = yup.object()
  .shape({
    referenceName: yup.string().required('Required!'),
    entity: yup.string().required('Required!'),
    businessNeed: yup.string().required('Required!'),
    shippingAddress: yup.object().shape({
      address: yup.string().required('Required!'),
      address2: yup.string(),
      city: yup.string().required('Required!'),
      state: yup.string().required('Required!'),
      zipCode: yup.string().required('Required!'),
    }),
    needBuyer: yup.string().required('Required!'),
  })