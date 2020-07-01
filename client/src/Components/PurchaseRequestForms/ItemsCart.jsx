import React from 'react'
import { Table } from 'reactstrap'
import ItemsCartListItem from './ItemsCartListItem'

const ItemCart = ({ items, arrayHelpers, details }) => {

  return (
    <div>
      <Table size="sm" striped responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Item</th>
            {details && (<th>Special Details</th>)}
            {details && (<th>Expense Category</th>)}
            <th>Unit Price</th>
            <th>QTY</th>
            <th>Ext. Price</th>
            {details || (<th>Del</th>)}
          </tr>
        </thead>
        <tbody>
        {
          items.length > 0 && items.map((item, idx) => {
            return (
              <tr key={idx}>
                <th scope="row">{idx + 1}</th>
                <ItemsCartListItem
                  details={details}
                  index={idx}
                  item={item}
                  arrayHelpers={arrayHelpers}
                />
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

export default ItemCart;
