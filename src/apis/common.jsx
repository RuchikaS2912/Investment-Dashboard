import axios from "axios";
// import { google } from "googleapis";

export const fetchCSVData = () => {
  const csvUrl =
    "https://docs.google.com/spreadsheets/d/1sqmYlOQDeA8dQkK4-Mbdj85iBKubliv2xximwK1l4SA"; // Replace with your Google Sheets CSV file URL

  axios
    .get(csvUrl) // Use Axios to fetch the CSV data
    .then((response) => {
      console.log(response.data);
      const parsedCsvData = parseCSV(response.data); // Parse the CSV data into an array of objects
      // setCsvData(parsedCsvData); // Set the fetched data in the component's state
      console.log(parsedCsvData); // Now you can work with 'csvData' in your component's state.
    })
    .catch((error) => {
      console.error("Error fetching CSV data:", error);
    });
};

export const parseCSV = (csvText) => {
  const rows = csvText.split(/\r?\n/); // Use a regular expression to split the CSV text into rows while handling '\r'
  const headers = rows[0].split(","); // Extract headers (assumes the first row is the header row)
  const data = []; // Initialize an array to store the parsed data
  for (let i = 1; i < rows.length; i++) {
    const rowData = rows[i].split(","); // Use the regular expression to split the row while handling '\r'
    const rowObject = {};
    for (let j = 0; j < headers.length; j++) {
      rowObject[headers[j]] = rowData[j];
    }
    data.push(rowObject);
  }
  return data;
};

// export const fetchGoogleSheetsData = async () => {
//   try {
//     const CLIENT_ID =
//       "725231689162-anjsu226220fo6dr811fc8435e52c9tp.apps.googleusercontent.com";
//     const API_KEY = "GOCSPX-nCkpmUw2f9sydLyXnszo_zVhPaq";

//     // Initialize the Google Sheets API client
//     const client = await google.auth.getClient({
//       credentials: { client_id: CLIENT_ID, api_key: API_KEY },
//       scopes: "https://www.googleapis.com/auth/spreadsheets.readonly",
//     });

//     // Load the Google Sheets API
//     const sheets = google.sheets({ version: "v4", auth: client });
//     console.log(sheets.spreadsheets.values.get());
//     // // Get data from the desired spreadsheet
//     // const spreadsheetId = 'your_spreadsheet_id';
//     // const range = 'Sheet1!A1:B10'; // Change to your desired range
//     // const response = await sheets.spreadsheets.values.get({
//     //   spreadsheetId,
//     //   range,
//     // });

//     // // Extract data from the response
//     // const rows = response.data.values;
//     // if (rows.length) {
//     //   const data = rows.map(row => ({
//     //     column1: row[0], // Assuming the first column contains data
//     //     column2: row[1], // Assuming the second column contains data
//     //   }));
//     //   setSheetData(data);
//     // }
//   } catch (error) {
//     console.error("Error loading Google Sheets API:", error);
//   }
//   // try {
//   //     // Set up OAuth 2.0 client
//   //     const clientId = '725231689162-anjsu226220fo6dr811fc8435e52c9tp.apps.googleusercontent.com';
//   //     const apiKey = 'GOCSPX-nCkpmUw2f9sydLyXnszo_zVhPaq';
//   //     const discoveryDocs = ['https://sheets.googleapis.com/$discovery/rest?version=v4'];
//   //     const scope = 'https://www.googleapis.com/auth/spreadsheets.readonly';
// };

export const handleLogin = async () => {
  // window.location.href = "http://localhost:3001/auth";
  axios
    .get("http://localhost:3001/auth")
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err.response.data);
    });
};
