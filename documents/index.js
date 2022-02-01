module.exports = ({ name, price1, price2, receiptId }) => {
   const today = new Date();
   const style = `
          <style>
             .table-container {
             width: 90%;
             margin: auto;
             margin-top: 20px;
             padding: 20px;
             border: 1px solid #eee;
             box-shadow: 0 0 10px rgba(0, 0, 0, .15);
             font-size: 16px;
             line-height: 24px;
             font-family: 'Helvetica Neue', 'Helvetica',
             color: #555;
             }
             .margin-top {
             margin-top: 50px;
             }
             .justify-center {
             text-align: center;
             }
             .table-container table {
             width: 100%;
             line-height: inherit;
             text-align: left;
             }
             .table-container table td {
             padding: 5px;
             vertical-align: top;
             }
             .table-container table tr td:nth-child(2) {
             text-align: right;
             }
             .table-container table tr.top table td {
             padding-bottom: 20px;
             }
             .table-container table tr.top table td.title {
             font-size: 45px;
             line-height: 45px;
             color: #333;
             }
             .table-container table tr.information table td {
             padding-bottom: 40px;
             }
             .table-container table tr.heading td {
             background: #eee;
             border-bottom: 1px solid #ddd;
             font-weight: bold;
             }
             .table-container table tr.details td {
             padding-bottom: 20px;
             }
             .table-container table tr.item td {
             border-bottom: 1px solid #eee;
             }
             .table-container table tr.item.last td {
             border-bottom: none;
             }
             .table-container table tr.total td:nth-child(2) {
             border-top: 2px solid #eee;
             font-weight: bold;
             }
             @media only screen and (max-width: 600px) {
             .table-container table tr.top table td {
             width: 100%;
             display: block;
             text-align: center;
             }
             .table-container table tr.information table td {
             width: 100%;
             display: block;
             text-align: center;
             }
             }
          </style>

   `;
   const header = `
                <tr class="top">
                   <td colspan="2">
                      <table>
                         <tr>
                            <td class="title"><img  src="https://i2.wp.com/cleverlogos.co/wp-content/uploads/2018/05/reciepthound_1.jpg?fit=800%2C600&ssl=1"
                               style="width:100%; max-width:156px;">
                            </td>
                            <td>
                               DATE: ${`${today
                                  .toLocaleString("default", {
                                     month: "long",
                                  })
                                  .toUpperCase()} ${today.getDate()}, ${today.getFullYear()}`}
                            </td>
                         </tr>
                      </table>
                   </td>
                </tr>
   `;
   return `
    <!doctype html>
    <html>
       <head>
          <meta charset="utf-8">
          <title>PDF Result Template</title>
          ${style}
       </head>
       <body>
          <div class="table-container">
             <table cellpadding="0" cellspacing="0">
             ${header}
                <tr class="information">
                   <td colspan="2">
                      <table>
                         <tr>
                            <td>
                               Customer name: ${name}
                            </td>
                            <td>
                               Receipt number: ${receiptId}
                            </td>
                         </tr>
                      </table>
                   </td>
                </tr>
                <tr class="heading">
                   <td>Bought items:</td>
                   <td>Price</td>
                </tr>
                <tr class="item">
                   <td>First item:</td>
                   <td>${price1}$</td>
                </tr>
                <tr class="item">
                   <td>Second item:</td>
                   <td>${price2}$</td>
                </tr>
             </table>
             <br />
             <h1 class="justify-center">Total price: ${
                parseInt(price1) + parseInt(price2)
             }$</h1>
          </div>
       </body>
    </html>
    `;
};
