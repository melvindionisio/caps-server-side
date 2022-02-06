module.exports = (boardinghouses) => {
   const today = new Date();
   const time = today.toLocaleTimeString(); //returns time (e.g. "6:08:25 PM")
   const style = `
    <style>
      @import url("https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;600;700&display=swap");
      @import url("https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap");
      html {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
        font-size: 62.5%;
      }
      .pdf-container {
        width: 90%;
        margin: auto;
        margin-top: 20px;
        padding: 20px;
        border: 1px solid #eee;
        border-radius: 0.5rem;
        font-size: 16px;
        line-height: 24px;
        font-family: "Open Sans", sans-serif;
        font-style: normal;
        color: #555;
      }
      .header { 
        font-style: normal;
      }
      .header #date-start {
        font-weight: 300;
        margin: 0;
        font-style: italic;
        font-size: 1.3rem;
        float: right;
      }
      .header #date {
        font-style: normal;
        font-weight: 600;
      }
      .header #site-name {
        text-transform: uppercase;
        font-weight: 700;
        font-family: "Quicksand", sans-serif;
        margin-top: 1rem;
        font-size: 3rem;
        margin-bottom: 3.5rem;
      }
      .header #logo {
        width: 100%;
        max-width: 150px;
      }
      table {
        width: 100%;
      }
      table,
      th,
      td {
        border: 1px solid grey;
        border-collapse: collapse;
      }
      td {
        padding: 0.3rem 0.5rem;
        word-wrap: break-word;
      }
      th {
        text-transform: uppercase;
        font-family: "Quicksand", sans-serif;
        text-align: center;
        padding: 0.5rem 1rem;
        background: #eee;
        border-bottom: 1px solid #ddd;
      }
      .image {
        float: left;
      }
    </style>
   `;
   const header = `
      <header class="header">
        <div class="image">
          <img
            src="https://i2.wp.com/cleverlogos.co/wp-content/uploads/2018/05/reciepthound_1.jpg?fit=800%2C600&ssl=1"
            id="logo"
          />
          <h1 id="site-name">Search 'N Stay</h1>
        </div>
        <h4 id="date-start">As of : <span id="date">${`${today
           .toLocaleString("default", { month: "long" })
           .toUpperCase()} ${today.getDate()}, ${today.getFullYear()}`} - ${time}</span>
        </h4>
      </header>
   `;

   const tableContent = boardinghouses.map((boardinghouse) => {
      return `
          <tr>
            <td>${boardinghouse.id}</td>
            <td>${boardinghouse.ownerName}</td>
            <td>${boardinghouse.contacts}</td>
            <td>${boardinghouse.name}</td>
            <td>${boardinghouse.street}</td>
            <td>${boardinghouse.zone}</td>
          </tr>
      `;
   });

   return `
   <!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width" />
    <title>PDF PRINT LAYOUT</title>
    ${style}
  </head>
  <body>
    <div class="pdf-container">
    ${header}
      <main>
        <table cellpadding="0" cellspacing="0">
          <tr>
            <th>ID</th>
            <th>Owner Name</th>
            <th>Contacts</th>
            <th>Boarding House</th>
            <th colspan="2">Address</th>
          </tr>
          ${tableContent}
        </table>
      </main>
    </div>
  </body>
</html>
    `;
};
