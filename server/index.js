require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Endpoint tes kesehatan server
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Server Anak Programmer Indonesia berjalan lancar!'
  });
});

app.listen(PORT, () => {
  console.log(`Server nyala di http://localhost:${PORT}`);
});
