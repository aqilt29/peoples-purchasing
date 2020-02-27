import React, { useState, useEffect, useRef } from 'react';
import _ from 'lodash'
import Select from 'react-select'
import { Label } from 'reactstrap';
import { listOfMaterialGroups, listOfLedgerAccounts } from '../utils/lists/listsOfLedgers';
import { BlueButton } from '../Styles';


const LedgerSelect = ({ width = '75%', ledgerIndex = null, ledgerChange }) => {
  const [ledger, setLedger] = useState(null);
  const [materialGroup, setMaterialGroup] = useState(null);
  const [materialOptions, setMaterialOptions] = useState(null);
  const [ledgerOptions, setLedgerOptions] = useState(null);
  const [isValid, setIsValid] = useState(false);
  const ref = useRef(null)


  const mapList = (list) => {
    return list.map((item) => {
      return { value: item, label: item }
    })
  }

  const handleAdd = () => {
    console.log(`add item ${ledger}, ${materialGroup}`)
  }

  const handleChange = (data, { action }) => {
    if (action === 'clear') return;
    setLedger(data.value)
    console.log(ledger)
  }

  useEffect(() => {
    console.log('log only once')
    const mappedMaterialGroups = mapList(listOfMaterialGroups)
    setMaterialOptions(mappedMaterialGroups)
  }, [])

  useEffect(() => {
    if (materialGroup) {
      const ledgerList = listOfLedgerAccounts[materialGroup]
      const mappedLedgers = mapList(ledgerList)
      setLedgerOptions(mappedLedgers)
    }

    if (materialGroup && ledger) {
      console.log('material group changed with ledger selected')
      ref.current.select.clearValue()
      setLedger(null)
    }
  }, [materialGroup])

  useEffect(() => {
    if (ledger && materialGroup) setIsValid(true)
    if (!ledger || !materialGroup) setIsValid(false)
  }, [ledger, materialGroup])

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
        ledgerOptions && (
          <Label style={{ width: width }}>Select General Ledger Account:
            <Select
              ref={ref}
              onChange={handleChange}
              options={ledgerOptions}
              defaultValue={ledgerIndex !== null ?  _.find(ledgers, { value: ledgerIndex }) : ledgerOptions[0]}
            />
          </Label>
        )
      }
      <BlueButton disabled={!isValid} onClick={handleAdd}>Add Item</BlueButton>
    </div>
  )
}

export default LedgerSelect;
