import express from 'express';
import convertSubtitlesFromUrl from './Subtitle';


const port = process.env.PORT || 3000;
const app = express();

console.log(`Serving on localhost:${port}`);

app.get('/', (req, res) => {
  res.send('API');
});

app.get('/subtitles/:srtUrl', async (req, res) => {
  const srtUrl = req.params.srtUrl;

  if (req.headers.origin) {
    res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
  }

  res.writeHead(200, {
    'Content-Type': 'text/vtt'
  });

  const buffer = await convertSubtitlesFromUrl(srtUrl);

  res.end(buffer, 'base64');
});

app.listen(port);

module.exports = app;
