import React, { useState, useEffect } from 'react';
import _ from 'lodash'
import Select from 'react-select'
import Loading from './Loading';
import { getVendorList } from '../api/vendorApi';
import { Label } from 'reactstrap';


const VendorSelect = ({ width = '75%', vendorId, vendorChange, label = "Select New Vendor:" }) => {
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
    <div className="my-3">
      <Label style={{ width: width }}>{label}
        <Select
          onChange={(data) => vendorChange(data)}
          options={vendors}
          defaultValue={vendorId ?  _.find(vendors, { value: vendorId }) : undefined}
        />
      </Label>
    </div>
  )
}

export default VendorSelect;
