import React from 'react';
import { Table } from 'reactstrap';
import DisplayItem from './DisplayItem';

const ItemList = ({ documentId = undefined, items, deleteItem, detailsPage = false, approverPage = false }) => {

  return (
    <div>
      <Table size="sm" striped responsive>
        <thead >
          <tr>
            <th>#</th>
            <th>Item Desc</th>
            <th>Request Date</th>
            <th>Unit Price</th>
            <th>QTY</th>
            <th>G/L</th>
            <th>Ext. Price</th>
            {(detailsPage || approverPage) && <th>Material Group</th>}
            {(detailsPage || approverPage) || <th>Del</th>}
            {(detailsPage || approverPage) && <th>Link</th>}
            {(detailsPage || approverPage) && <th>Details</th>}
          </tr>
        </thead>
        <tbody>
        {
          items.length > 0 && items.map((item, idx) => {
            return (
              <tr key={idx}>
                <th scope="row">{idx + 1}</th>
                <DisplayItem approverPage={approverPage} detailsPage={detailsPage} documentId={documentId} deleteItem={deleteItem} item={item} index={idx} />
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
