// const express = require('express');
// const app = express();
// const bodyParser = require('body-parser');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
// const cors = require('cors');

// Function to get the current date and time in separate fields
function getCurrentDateTime() {
  const now = new Date();
  const date = now.toISOString().split('T')[0]; // YYYY-MM-DD format
  const time = now.toTimeString().split(' ')[0]; // HH:MM:SS format
  return { date, time };
}

// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//   next();
// });


// Set up body-parser middleware to parse JSON requests
// app.use(bodyParser.json());

// Define a POST route to handle incoming user messages
// app.post('/save-message/', (req, res) => {
//   console.log(req.body); // Log the body to see what you're receiving
//   const userMessage = req.body.userMessage;
  const { date, time } = getCurrentDateTime(); // Get the current date and time
  
  // Get users ip
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;



  // Append the user message to a CSV file
  const csvWriter = createCsvWriter({
    path: 'user-input.csv',
    header: [
      { id: 'message', title: 'Message' },
      { id: 'date', title: 'Date' },
      { id: 'time', title: 'Time' },
      { id: 'ip', title: 'IP Address' } // Add IP address column
    ],
    append: true // This flag ensures that you append to the file instead of overwriting it
  });

  const record = [
    { 
      message: userMessage,
      date: date,
      time: time,
      ip: ip // Add the IP to the record

    }
  ];

  csvWriter.writeRecords(record)
    .then(() => {
      res.status(200).send('Message saved');
    })
    .catch((error) => {
      console.error('Error saving message:', error);
      res.status(500).send('Error saving message');
    });
// });

// app.get('/', (req, res) => {
//   // Send HTML content with an h1 tag
//   res.send('<!DOCTYPE html><html><head><title>App Status</title></head><body><h1>App running successfully</h1></body></html>');
// });

// Start the server on port 3000
// const port = process.env.PORT || 3000;
// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });