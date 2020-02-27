import React, { useState, useEffect } from 'react';
import _ from 'lodash'
import Select from 'react-select'
import { Label } from 'reactstrap';
import { listOfMaterialGroups, listOfLedgerAccounts } from '../utils/lists/listsOfLedgers';



const LedgerSelect = ({ width = '75%', ledgerIndex = null, ledgerChange }) => {
  const [ledgers, setLedger] = useState(null);
  const [materialGroup, setMaterialGroup] = useState(null);
  const [materialOptions, setMaterialOptions] = useState(null);
  const [ledgerOptions, setLedgerOptions] = useState(null);

  const mapList = (list) => {
    return list.map((item) => {
      return { value: item, label: item }
    })
  }

  useEffect(() => {
    const mappedMaterialGroups = mapList(listOfMaterialGroups)
    console.log(mappedMaterialGroups)
    setMaterialOptions(mappedMaterialGroups)
  }, [])

  useEffect(() => {
    if (materialGroup) {
      const ledgerList = listOfLedgerAccounts[materialGroup]
      console.log(ledgerList, listOfMaterialGroups, materialGroup)
      const mappedLedgers = mapList(ledgerList)
      setLedgerOptions(mappedLedgers)
    }
  }, [materialGroup])

  return (
    <div className="my-3">
      <Label style={{ width: width }}>Select Material Group:
        <Select
          onChange={(data) => setMaterialGroup(data.value)}
          options={materialOptions}
          defaultValue={ledgerIndex !== null ?  _.find(ledgers, { value: ledgerIndex }) : undefined}
        />
      </Label>
      {
        ledgerOptions !== null ? (
          <Label style={{ width: width }}>Select General Ledger Account:
            <Select
              onChange={(data) => setLedger(data.value)}
              options={ledgerOptions}
              defaultValue={ledgerIndex !== null ?  _.find(ledgers, { value: ledgerIndex }) : undefined}
            />
          </Label>
        ) : null
      }
    </div>
  )
}

export default LedgerSelect;
