import React from 'react';
import { Formik, Field, FieldArray } from 'formik';
import {
  Container,
  Row,
  Col,
  Input,
} from 'reactstrap';
import { BlueButton } from '../Styles';

const CreatePurchaseRequest = () => {
  return (
    <>
      <h3>CreatePurchaseRequest</h3>
      <Container>
        <Row>
          <Col>
          <div>
    <Formik
      initialValues={{ email: '', password: '', secret: '',  friends: ['jared', 'ian', 'suh'], }}
      validate={values => {
        const errors = {};
        if (!values.email) {
          errors.email = 'Required';
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = 'Invalid email address';
        }

        if (values.friends.length < 2) {
          errors.friends = 'Yo need mo friendz'
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        ...goodies
        /* and other goodies */
      }) => (
        <form onSubmit={handleSubmit}>
          {/* {console.log(goodies)} */}
          <Field as={Input}
            type="email"
            name="email"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
          />
          {errors.email && touched.email && errors.email}
          <Field as={Input}
            type="password"
            name="password"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
          />
          {errors.password && touched.password && errors.password}
          <Field as={Input}
            type="password"
            name="secret"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.secret}
          />
          {errors.secret && touched.secret && errors.secret}
          <FieldArray
            name="friends"
            render={(arrayHelpers) => {
              {console.log(arrayHelpers)}
              return (
                <div>
                {values.friends && values.friends.length > 0 ? (
                  values.friends.map((friend, index) => (
                    <div key={index}>
                      <Field name={`friends.${index}`} />
                      <button
                        type="button"
                        onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
                      >
                        -
                      </button>
                      <button
                        type="button"
                        onClick={() => arrayHelpers.insert(index, '')} // insert an empty string at a position
                      >
                        +
                      </button>
                    </div>
                  ))
                ) : (
                  <button type="button" onClick={() => arrayHelpers.push('')}>
                    {/* show this when user has removed all friends from the list */}
                    Add a friend
                  </button>
                )}
                {errors.friends && touched.friends && errors.friends}
              </div>
              )
            }}
          />
          <BlueButton type="submit" disabled={isSubmitting}>
            Submit
          </BlueButton>
        </form>
      )}
    </Formik>
  </div>
          </Col>
          <Col>
            <p>Hello</p>
            <pre>{JSON.stringify(/hello/.compile)}</pre>
          </Col>
        </Row>
      </Container>
    </>
  )
};

export default CreatePurchaseRequest;
