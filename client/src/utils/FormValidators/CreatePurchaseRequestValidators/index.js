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
    description: yup.string().required('Required!'),
    specialDetails: yup.string().required('Required!'),
    link: yup.string().required('Required!'),
    expenseCategory: yup.string().required('Required!'),
    price: yup.string().required('Required!'),
    quantity: yup.string().required('Required!'),
  })
});

