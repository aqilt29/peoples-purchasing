import React, { useState, useEffect, useRef } from 'react';
import _ from 'lodash'
import Select from 'react-select'
import { Label } from 'reactstrap';
import { listOfMaterialGroups, listOfLedgerAccounts } from '../utils/lists/listsOfLedgers';

const LedgerSelect = ({ width = '75%', ledgerIndex = null, ledgerChange, setValid = () => {}, reset }) => {
  const [ledger, setLedger] = useState(null);
  const [materialGroup, setMaterialGroup] = useState(null);
  const [materialOptions, setMaterialOptions] = useState(null);
  const [ledgerOptions, setLedgerOptions] = useState(null);
  const ledgerRef = useRef(null)
  const materialRef = useRef(null)


  const mapList = (list) => {
    return list.map((item) => {
      return { value: item, label: item }
    })
  }

  //  prevent error on reading null value on clearing func
  const handleChange = (data, { action }, label) => {
    if (action === 'clear') return;
    console.log('handle change data',data.value)
    if (label === 'ledger') setLedger(data.value)
    if (label !== 'ledger') setMaterialGroup(data.value)
  }

  //  get the list of MG and map it to select options type
  useEffect(() => {
    const mappedMaterialGroups = mapList(listOfMaterialGroups)
    setMaterialOptions(mappedMaterialGroups)
  }, [])

  useEffect(() => {
    if (ledger) ledgerChange({ materialGroup, ledger})
  }, [ledger])

  //  when the material group changes but a ledger is selected
  //  clear the ledger to force user to select a new one
  //  also map new options for when a new MG is selected
  useEffect(() => {
    if (materialGroup) {
      const ledgerList = listOfLedgerAccounts[materialGroup]
      const mappedLedgers = mapList(ledgerList)
      setLedgerOptions(mappedLedgers)
    }

    if (materialGroup && ledger) {
      console.log('in reset')
      ledgerRef.current.select.clearValue()
      setLedger(null)
    }
  }, [materialGroup])

  useEffect(() => {
    if (ledger && materialGroup) setValid(true)
    if (!ledger || !materialGroup) setValid(false)
  }, [ledger, materialGroup])

  useEffect(() => {
    console.log(reset)
    if (reset && materialRef) materialRef.current.select.clearValue();
    if (reset && ledgerRef) ledgerRef.current.select.clearValue();
  }, [reset])

  return (
    <div className="my-3">
      <Label style={{ width: width }}>Select Material Group:
        <Select
          ref={materialRef}
          onChange={(data, action) => handleChange(data, action, 'material')}
          options={materialOptions}
          defaultValue={ledgerIndex !== null ?  _.find(ledgers, { value: ledgerIndex }) : undefined}
        />
      </Label>
      {
        ledgerOptions && (
          <Label style={{ width: width }}>Select General Ledger Account:
            <Select
              ref={ledgerRef}
              onChange={(data, action) => handleChange(data, action, 'ledger')}
              options={ledgerOptions}
              defaultValue={ledgerIndex !== null ?  _.find(ledgers, { value: ledgerIndex }) : ledgerOptions[0]}
            />
          </Label>
        )
      }
    </div>
  )
}

export default LedgerSelect;
