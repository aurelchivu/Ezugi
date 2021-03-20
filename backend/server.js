import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import colors from 'colors';
import fs from 'fs';
import path from 'path';

const app = express();

// Body parser
app.use(express.json());

// HTTP request logger middleware for node.js
app.use(morgan('dev'));

// Enable CORS
app.use(cors());

app.use(express.static('videos'));

// Array of metadata
let videos = [];

const moduleURL = new URL(import.meta.url);
const __dirname = path.dirname(moduleURL.pathname);
//passsing directoryPath and callback function
fs.readdir(path.resolve(__dirname, 'videos'), (err, files) => {
  if (err) throw err;
  files.forEach((file, id) => {
    videos.push({ id: id, name: file });
  });
});

app.use('/videos', express.static(path.join(__dirname, 'videos')));

app.get('/', (req, res) => {
  res.send('API is running...');
});

// endpoint to fetch all videos metadata
app.get('/videos', (req, res) => {
  res.json(videos);
});

const PORT = 5000;

app.listen(PORT, console.log(`Server running on port ${PORT}`.yellow.bold));
