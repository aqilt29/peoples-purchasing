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
  description: yup.string().min(2, 'Please name the item.').required('Required!'),
  specialDetails: yup.string().min(2, 'Please include special details.'),
  link: yup.string(),
  expenseCategory: yup.string().required('Mark an expense category!'),
  price: yup.number().positive('Prices are not negative.').required('Required!'),
  quantity: yup.number().positive('do not process returns here, positive quantities only').required('Required!'),
})

