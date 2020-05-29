import React, { useState, useEffect } from 'react';
import _ from 'lodash'
import Select from 'react-select'
import Loading from './Loading';
import { Label } from 'reactstrap';
import { getAllEntities } from '../api/entitiesApi';



const EntitySelect = ({ width = '75%', entityId, entityChange, label = 'Select Entity:', userEntityName }) => {
  const [entities, setEntities] = useState(null);
  const [defaultEntity, setDefaultEntity] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const mapEntitiesToId = (entitiesArray) => {
    console.log(entitiesArray)
    return entitiesArray.map(({ name, _id }) => {
      return { value: _id, label: name }
    })
  }

  console.log(_.find(entities, { 'label': userEntityName }))
  console.log(userEntityName)
  console.log(entities)

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

  if (isLoading) return <Loading />
  console.log(defaultEntity)
  return (
    <div className="my-3">
      <Label style={{ width: width }}>{label}
        <Select
          onChange={(data) => entityChange(data)}
          options={entities}
          defaultValue={entityId ?  _.find(entities, { value: entityId }) : defaultEntity}
        />
      </Label>
    </div>
  )
}

export default EntitySelect;
