import React from 'react';
import { Table } from 'reactstrap';
import DisplayItem from './DisplayItem';

const ItemList = ({ documentId = undefined, items, deleteItem, detailsPage = false }) => {
  console.log(detailsPage)
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
            {detailsPage || <th>Del</th>}
            {detailsPage && <th>Link</th>}
            {detailsPage && <th>Details</th>}
          </tr>
        </thead>
        <tbody>
        {
          items.length > 0 && items.map((item, idx) => {
            return (
              <tr key={idx}>
                <th scope="row">{idx + 1}</th>
                <DisplayItem detailsPage={detailsPage} documentId={documentId} deleteItem={deleteItem} item={item} index={idx} />
              </tr>
            )
          })
        }
        {
          items.length < 1 && <tr><td>No Items...</td></tr>
        }
      </tbody>
      </Table>
    </div>
  )
};

export default ItemList;
