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
  });

//  Hypothesis that the validation needs to indicate the nesting
export const itemValidation = yup.object().shape({
  itemToAdd: yup.object().shape({
    description: yup.string(),
    specialDetails: yup.string(),
    link: yup.string(),
    expenseCategory: yup.string(),
    price: yup.string(),
    quantity: yup.string(),
  })
});

