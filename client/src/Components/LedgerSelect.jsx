import React, { useState, useEffect } from 'react';
import _ from 'lodash'
import Select from 'react-select'
import Loading from './Loading';
import { Label } from 'reactstrap';


const Ledger = ({ width = '75%', userId, ledgerChange, label = 'Select User'}) => {
  const [ledgers, setUsers] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const mapUsersToId = (ledgersArray) => {
    console.log(ledgersArray)
    return ledgersArray.map(({ firstName, lastName, _id }) => {
      return { value: _id, label: `${firstName} ${lastName}` }
    })
  }

  useEffect(() => {
    const fn = async () => {
      setLoading(true)

      try {
        const data = await getAllUsers();

        const mappedUsers = mapUsersToId(data);

        setUsers(mappedUsers)
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
          onChange={(data) => ledgerChange(data)}
          options={ledgers}
          defaultValue={ledgerId ?  _.find(ledgers, { value: userId }) : undefined}
        />
      </Label>
    </div>
  )
}

export default Ledger;
