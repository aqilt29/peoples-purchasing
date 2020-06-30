import React, { useState, useEffect } from 'react';
import _ from 'lodash'
import Loading from '../Loading';
import { getAllEntities } from '../../api/entitiesApi';

import { Field } from 'formik';
import FormikReactStrapSelect from './FormikReactStrapSelect';


const FormikEntitySelect = ({ width = '75%', entityId, entityChange, userEntityName, ...props }) => {

  const [entities, setEntities] = useState(null);
  const [defaultEntity, setDefaultEntity] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const mapEntitiesToId = (entitiesArray) => {

    return entitiesArray.map(({ name, _id }) => {
      return { value: _id, label: name }
    })
  }

  useEffect(() => {
    const fn = async () => {
      setLoading(true)

      try {
        const data = await getAllEntities()

        const mappedEntities = mapEntitiesToId(data);

        setEntities(mappedEntities);

        const defaultEntityByUser = _.find(mappedEntities, { 'label': userEntityName });

        setDefaultEntity(defaultEntityByUser)
      } catch (error) {
        window.alert(error)
        setLoading(false)
      }

      setLoading(false)
    }

    fn()
  }, [])

  if (isLoading || (entities === null)) return <Loading />

  return (
    <div className="my-3">
        <Field
          placeholder="Select..."
          type="select"
          label="Select Purchasing Entity"
          id="entity"
          name="entity"
          options={entities}
          component={FormikReactStrapSelect}
        />
    </div>
  )
}

export default FormikEntitySelect;
