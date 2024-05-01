const express = require('express');
const { GoogleSpreadsheet } = require('google-spreadsheet');
const { google } = require('googleapis');
const { JWT } = require('google-auth-library');
const cors = require('cors');

const app = express();
app.use(cors());

const credentials = require('./client_secret.json');
const auth_credentials = require('./auth_cred.json');
console.log(credentials);
const { client_secret, client_id, redirect_uris } = credentials.web;
const oAuth2Client = new google.auth.OAuth2(
  client_id,
  client_secret,
  redirect_uris[0]
);

app.get('/auth', (req, res) => {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: ['https://www.googleapis.com/auth/spreadsheets'],
  });
  console.log('authUrl', authUrl);
  res.redirect(authUrl);
});

app.get('/auth/callback', async (req, res) => {
  const { code } = req.query;

  try {
    // Exchange authorization code for tokens
    const { tokens } = await oAuth2Client.getToken(code);
    console.log('tokens: ', tokens);
    oAuth2Client.setCredentials(tokens);

    // At this point, you can save the tokens to a database or use them for API calls

    // res.send("Authentication successful. You can close this window.");
    res.redirect('http://localhost:3000/horizon-ui-chakra/');
  } catch (error) {
    console.error('Error exchanging code for tokens:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Inside your server.js, after the callback route

app.get('/fetch-data', async (req, res) => {
  //   const doc = new GoogleSpreadsheet(
  //     "1sqmYlOQDeA8dQkK4-Mbdj85iBKubliv2xximwK1l4SA"
  //   );
  try {
    // const serviceAccountAuth = new JWT({
    //   email: "admin-account@investment-tracker-415916.iam.gserviceaccount.com",
    //   key: base64DecodedPrivateKey,
    //   scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    // });
    const doc = new GoogleSpreadsheet(
      '1sqmYlOQDeA8dQkK4-Mbdj85iBKubliv2xximwK1l4SA'
    );
    const apiKey = 'AIzaSyD7MbgsDDBu3GD0dvJZKWpTEZScZ_5EfZ8';
    // console.log(auth_credentials.private_key);
    await doc.useServiceAccountAuth({
      client_email: auth_credentials.client_email,
      private_key: auth_credentials.private_key,
    });
    // const doc = new GoogleSpreadsheet(
    //   "1sqmYlOQDeA8dQkK4-Mbdj85iBKubliv2xximwK1l4SA"
    // );
    await doc.useApiKey(apiKey);
    await doc.loadInfo();
    // console.log(doc._rawSheets);
    const sheets = doc.sheetsByIndex; // Assuming the first sheet
    // const getSheetByTitle = doc.getSheetByTitle["Billis to be paid"];
    // await getSheetByTitle.loadHeaderValues();

    // Access column names (headers)
    // const columnNames = getSheetByTitle.headerValues;
    // console.log(columnNames);
    let excelData = [];
    for (const sheet of sheets) {
      console.log(`Sheet Title: ${sheet.title}`);
      console.log(`Sheet Index: ${sheet.index}`);
      if (sheet.title === '2024 Investments') {
        let sheetsData = [];
        await sheet.loadHeaderRow();
        const finalColumn = sheet.headerValues;
        sheetsData.push(finalColumn);
        const rows = await sheet.getRows();
        rows
          .filter((row) => row._rawData.length > 0 && row._rawData.length === 4)
          .map((row) => sheetsData.push(row._rawData));
        excelData.push({ title: sheet.title, data: sheetsData });
      }
      if (sheet.title === 'Monthly Expense 2024') {
        let monthlyExpense = [];
        await sheet.loadHeaderRow();
        const finalColumn = sheet.headerValues;
        monthlyExpense.push(finalColumn);
        const rows = await sheet.getRows();
        rows
          .filter((row) => row._rawData.length > 0 && row._rawData.length === 4)
          .map((row) => monthlyExpense.push(row._rawData));
        excelData.push({ title: sheet.title, data: monthlyExpense });
      }
      if (sheet.title === 'Monthly Expense 2023') {
        let monthlyExpense = [];
        await sheet.loadHeaderRow();
        const finalColumn = sheet.headerValues;
        monthlyExpense.push(finalColumn);
        const rows = await sheet.getRows();
        rows
          .filter((row) => row._rawData.length > 0 && row._rawData.length === 4)
          .map((row) => monthlyExpense.push(row._rawData));
        excelData.push({ title: sheet.title, data: monthlyExpense });
      }
      if (sheet.title === 'Salary 22-23') {
        let monthlyExpense = [];
        await sheet.loadHeaderRow();
        const finalColumn = sheet.headerValues;
        monthlyExpense.push(finalColumn);
        const rows = await sheet.getRows();
        rows
          .filter((row) => row._rawData.length > 0 && row._rawData.length === 4)
          .map((row) => monthlyExpense.push(row._rawData));
        excelData.push({ title: sheet.title, data: monthlyExpense });
      }
      if (sheet.title === 'Salary 23-24') {
        let monthlyExpense = [];
        await sheet.loadHeaderRow();
        const finalColumn = sheet.headerValues;
        monthlyExpense.push(finalColumn);
        const rows = await sheet.getRows();
        rows
          .filter((row) => row._rawData.length > 0 && row._rawData.length === 4)
          .map((row) => monthlyExpense.push(row._rawData));
        excelData.push({ title: sheet.title, data: monthlyExpense });
      }
      if (sheet.title === 'Bills to be paid') {
        let monthlyExpense = [];
        await sheet.loadHeaderRow();
        const finalColumn = sheet.headerValues;
        monthlyExpense.push(finalColumn);
        const rows = await sheet.getRows();
        rows
          .filter((row) => row._rawData.length > 0 && row._rawData.length === 4)
          .map((row) => monthlyExpense.push(row._rawData));
        excelData.push({ title: sheet.title, data: monthlyExpense });
      }
    }
    return res.status(200).send(excelData);
  } catch (error) {
    console.error('Error fetching data from Google Sheets:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
