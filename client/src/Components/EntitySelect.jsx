import React, { useState, useEffect } from 'react';
import _ from 'lodash'
import Select from 'react-select'
import Loading from './Loading';
import { Label } from 'reactstrap';
import { getAllEntities } from '../api/entitiesApi';



const EntitySelect = ({ width = '75%', entityId, entityChange, label = 'Select Entity:'}) => {
  const [entities, setEntities] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const mapEntitiesToId = (entitiesArray) => {
    console.log(entitiesArray)
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

        setEntities(mappedEntities)
      } catch (error) {
        window.alert(error)
        setLoading(false)
      }

      setLoading(false)
    }

    fn()
  }, [])

  if (isLoading) return <Loading />

  return (
    <div className="my-3">
      <Label style={{ width: width }}>{label}
        <Select
          onChange={(data) => entityChange(data)}
          options={entities}
          defaultValue={entityId ?  _.find(entities, { value: entityId }) : undefined}
        />
      </Label>
    </div>
  )
}

export default EntitySelect;
