import React from 'react';
import { Table } from 'reactstrap';
import DisplayItem from './DisplayItem';

const ItemList = ({ items, deleteItem }) => {
  console.log(items)
  return (
    <div>
      <Table size="sm" striped responsive>
        <thead >
          <tr>
            <th>#</th>
            <th>Item Desc</th>
            <th>Request Date</th>
            <th>Unit Price</th>
            <th>Unit</th>
            <th>QTY</th>
            <th>Ext. Price</th>
            <th>Del</th>
          </tr>
        </thead>
        <tbody>
        {
          items.length > 0 && items.map((item, idx) => {
            return (
              <tr key={idx}>
                <th scope="row">{idx + 1}</th>
                <DisplayItem deleteItem={deleteItem} item={item} index={idx} />
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
