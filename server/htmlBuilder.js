// this file will compiple the HTML past on the template from form data
const numeral = require('numeral');
const fs = require('fs');
const path = require('path');
const uuidv1 = require('uuid/v1');

const htmlFromBody = (body) => {
    if (!body) {
        return null;
    } else {
        return (
            `
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <meta http-equiv="X-UA-Compatible" content="ie=edge">
                    <title>Document</title>
                    <style>
                        .request-page {
                            max-width: 850px;
                            min-height: 1100px;
                            margin: auto;
                            padding: 30px;
                            border: 1px solid #eee;
                            box-shadow: 0 0 10px rgba(0, 0, 0, .15);
                            font-size: 16px;
                            line-height: 24px;
                            font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;
                            color: #555;
                            display: flex;
                            flex-direction: column;
                        }
            
                        .header-wrapper {
                            display: flex;
                            justify-content: space-between;
                        }
            
                        table {
                            border-collapse: collapse;
                        }
            
                        .purchase-data {
                            display: flex;
                            justify-content: space-between;
                            margin: 20px;
                        }
            
                        .table-frame {
                            max-width: 780px;
                            margin: 20px;
                        }
            
                        p {
                            margin: 0px;
                        }
            
                        th {
                            border-bottom: 2px solid #000;
                        }
            
                        .items-table {
                            border-spacing: 0px 2px;
                            width: 100%;
                        }
            
                        .items-table tr:nth-child(even) {
                            background-color: #eee;
                        }
            
                        .items-table td:first-child {
                            color: #555;
                        }
            
                        .totals {
                            display: flex;
                            flex-direction: row-reverse;
                        }
            
                        .totals td {
                            padding-left: 10px;
                        }
            
                        .totals-table td:first-child {
                            color: #555;
                            font-weight: bold;
                        }
            
                        .total-line {
                            border-top: 2px solid #555;
                        }
            
                        .approval-header {
                            padding: 20px
                        }
            
                        .sign-line {
                            border-top: 2px black solid;
                            width: 25vw;
                        }
            
                    </style>
                </head>
                <body>
                <div class="request-page">
                    ${body}
                </div>
                </body>
                <script
                    src="https://code.jquery.com/jquery-3.4.1.slim.js"
                    integrity="sha256-BTlTdQO9/fascB1drekrDVkaKd9PkwBymMlHOiG+qLI="
                    crossorigin="anonymous">
                </script>
                </html>
            `
        );
    }
}

const body = (pageHeader, tableFrameAndTotals) => {
    const signatureBox = `
    <div class="signature-box">
        <div class="approval-header">
            <h4>Approved By</h4>
            <br>
            <div class="sign-line"></div>
        </div>
    </div>`;

    return pageHeader.concat(tableFrameAndTotals, signatureBox);
}

const pageHeader = ({ requestor, dateCreated, shipTo, vendorPhone, vendorEmail }) => {
    const headerWrapper = `
        <div class="header-wrapper">
            <h1>Purchase Requisition</h1>
            <img style="width: 25%;" src="peoples-dark.png"></img>
        </div>`;

    const purchaserAndDate = `
        <div class="purchase-data">
            <div class="purchaser">
                <h3>Purchased By:</h3>
                <p>${requestor}</p>
            </div>
            <div class="header-date">
                <h3>Request Date:</h3>
                <p>${dateCreated}</p>
            </div>
        </div>
    `;

    const shippingInfo = `
        <div class="purchase-data">
            <div class="purchaser">
                <h3>Ship To Address:</h3>
                <p><i>Attn</i>: ${requestor}</p>
                <p>${shipTo}</p>
                <!-- <p>Irvine CA 92614</p> -->
            </div>
            <div class="header-date">
                <h3>Vendor Information:</h3>
                <p><i>Email</i>: ${vendorEmail}</p>
                <p><i>Telephone</i>: ${vendorPhone}</p>
            </div>
        </div>
    `;

    return headerWrapper.concat(purchaserAndDate, shippingInfo);
};

const createItemRows = (i, item) => {
    return (`
        <tr>
            <td>${i}</td>
            <td>${item.vendorItemNumber}</td>
            <td>${item.description}</td>
            <td><a href="${item.link}" target="_blank">Item Link</a></td>
            <td>${item.quantity}</td>
            <td>${numeral(item.unitPrice).format('$ 0,0[.]00')}</td>
            <td>${item.unitType}</td>
            <td>$ ${item.extPrice}</td>
        </tr>
    `)
}

const createHtmlItemsAndSubtotal = (itemsList) => {
    //  create an array for the rows
    let rows = [];

    //  count the subtotal as you see items
    let subTotal = 0;

    //  TODO intergrate freight into schema
    // let freight = 0;

    //  iterate through all the items provided
    itemsList.forEach((item, i) => {
        //  that function needs the index and will return a templated string
        let row = createItemRows(i, item);

        //  add those rows of html to the array
        rows.push(row);

        // add to the subtotal
        subTotal += item.extPrice;
    });

    // join those rows to make one htmlList
    return { htmlItemsList: rows.join(''), subTotal };
};

const createHtmlTotals = (subTotal) => {
    return (`
        <br>
        <div class="totals">                 
            <table class="totals-table">
                <tr>
                    <td>Subtotal</td>
                    <td>${numeral(subTotal).format('$ 0,0[.]00')}</td>
                </tr>
                <tr>
                    <td>Freight</td>
                    <td>$ 0.00</td>
                </tr>
                <tr class="total-line">
                    <td>Invoice Total</td>
                    <td>${numeral(subTotal).format('$ 0,0[.]00')}</td>
                </tr>
            </table>
        </div>
    `)
};

const tableFrameAndTotals = (itemsList) => {
    
    const tableHeaders = `
        <tr>
            <th>#</th>
            <th>Vendor Item No.</th>
            <th>Description</th>
            <th>Link</th>
            <th>Quantity</th>
            <th>Unit Price</th>
            <th>Units</th>
            <th>Ext. Amount</th>
        </tr>
    `;

    const { htmlItemsList, subTotal } = createHtmlItemsAndSubtotal(itemsList);

    const htmlTotals = createHtmlTotals(subTotal);

    return (`
        <div class="table-frame">
            <table class="items-table">
                ${tableHeaders}
                ${htmlItemsList}
                </table>
                ${htmlTotals}
        </div>
    `)
}

const buildRequestHtmlFromForm = async (form) => {
    const { requestor, dateCreated, shipTo, vendorPhone, vendorEmail, items } = form;

    const htmlPageHeader = pageHeader({ requestor, dateCreated, shipTo, vendorPhone, vendorEmail })

    const htmlTableFrameAndTotals = tableFrameAndTotals(items);

    const formHtml = htmlFromBody(body(htmlPageHeader, htmlTableFrameAndTotals));

    return formHtml;
}

const createRequestHtmlDocument = async (form) => {
    const uuid = uuidv1()
    
    const html = await buildRequestHtmlFromForm(form);

    try {
        fs.writeFileSync(path.resolve(__dirname, `../prHtml/pr_form_${uuid}.html`), html);
        console.log(`success of form to html file: id: ${uuid}`)
        console.log(`save uuid to form document in db`);
        return uuid;
    } catch (error) {
        console.log('something went wrong trying to make the html form', error);
    }
}

module.exports = createRequestHtmlDocument;

