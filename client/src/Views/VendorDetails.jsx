// view for seeing individual vendors details
import React, { useState, useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom'
import Loading from '../Components/Loading';
import { getVendorById, deleteVendor, modifyVendor } from '../api/vendorApi';
import { Container, Row, Col, Button } from 'reactstrap';
import { SmallP } from '../Styles'

const VendorDetails = () => {
  const { params: { id } } = useRouteMatch();
  const [vendor, setVendor] = useState(false)
  const [loading, setLoading] = useState(false)

  const deleteThisVendor = async () => {
    const data = await deleteVendor(id)
    console.log(data)
    window.location.reload()
  }

  const modifyThisVendor = async (data = {}) => {
    const modifiedData = await modifyVendor(id, data)
    console.log('modifiedData',modifiedData)
    window.location.reload()
  };

  useEffect(() => {
    const fn = async () => {
      setLoading(true);

      try {
        const data = await getVendorById(id)
        console.log(data)
        setVendor(data)
      } catch (error) {
        window.alert(error)
      }

      setLoading(false)

    }

    fn()
  },[])

  if (loading) return <Loading />

  return (
    vendor && (<>
      <h3>Vendor Details</h3>
      <h4>Id: {vendor._id.slice(-4).toUpperCase()}</h4>
      <h5>{vendor.isDeleted ? 'Vendor is Deleted' : null}</h5>
      <Container>
        <Row>
          <Col>
            <h6>Company Name</h6>
            <p>{vendor.name}</p>
            <h6>Contact</h6>
            <p>{vendor.attn}</p>
            <h6>Email</h6>
            <p>{vendor.email}</p>
            <h6>Has a W9</h6>
            <p>{vendor.hasW9 ? 'Yes' : 'No'}</p>
            <h6>Eligible for 1099</h6>
            <p>{vendor.is1099 ? 'Yes' : 'No'}</p>
          </Col>
          <Col>
            <h6>Phone Number</h6>
            <p>{vendor.phoneNumber}</p>
            <h6>Phone Number</h6>
            <p>{vendor.phoneNumber}</p>
            <h6>Company Website</h6>
            <p>{vendor.website ? vendor.website : 'No Site'}</p>
            <div className="mb-4">
              <div><h6>Address:</h6></div>
              <span>
                <SmallP>{vendor.address.street}</SmallP>
              </span>
              <div>
                <SmallP>{vendor.address.city}</SmallP>
                <SmallP>, {vendor.address.state}</SmallP>
                <SmallP> {vendor.address.zipCode}</SmallP>
              </div>
            </div>
            {
              vendor.isDeleted ? (
                <Button color="success" onClick={() => modifyThisVendor({ isDeleted: false })}>Restore Vendor</Button>
              ) : (<Button onClick={deleteThisVendor} color="danger">Delete Vendor</Button>)
            }
          </Col>
        </Row>
      </Container>
    </>)
  );
};

export default VendorDetails;
