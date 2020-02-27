import React, { useState, useEffect } from 'react';
import _ from 'lodash'
import Select from 'react-select'
import Loading from './Loading';
import { getVendorList } from '../api/vendorApi';
import { Label } from 'reactstrap';


const VendorSelect = ({ vendorId, vendorChange }) => {
  const [vendors, setVendors] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const mapVendorsToId = (vendorsArray) => {
    return vendorsArray.map(({ name, _id }) => {
      return { value: _id, label: name }
    })
  }

  useEffect(() => {
    const fn = async () => {
      setLoading(true)

      try {
        const data = await getVendorList();

        const mappedVendors = mapVendorsToId(data);

        setVendors(mappedVendors)
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
    <>
      <Label style={{ width: '75%' }}>Select New Vendor:
        <Select
          onChange={(data) => vendorChange(data)}
          options={vendors}
          defaultValue={_.find(vendors, { value: vendorId })}
        />
      </Label>
    </>
  )
}

export default VendorSelect;
