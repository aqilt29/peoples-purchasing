import React from 'react';
import { Table } from 'reactstrap';
import DisplayItem from './DisplayItem';

const ItemList = ({ items }) => {
  console.log(items)
  return (
    <div>
      <Table>
        <thead style={{ padding: '0' }}>
          <tr>
            <th>#</th>
            <th>Item Desc</th>
            <th>Request Date</th>
            <th>Unit Price</th>
            <th>Unit</th>
            <th>QTY</th>
            <th>Ext. Price</th>
          </tr>
        </thead>
        <tbody>
        {
          items.length > 0 && items.slice(0).reverse().map((item, idx) => {
            return (
              <tr key={idx}>
                <th scope="row">{idx + 1}</th>
                <DisplayItem item={item} />
              </tr>
            )
          })
        }
      </tbody>
      </Table>
    </div>
  )
};

export default ItemList;
