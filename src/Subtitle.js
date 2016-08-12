import srt2vtt from 'srt2vtt';
import download from 'download';


export default function convertSubtitlesFromUrl(srtUrl) {
  return new Promise((resolve, reject) => {
    download(srtUrl).then(downloadBuffer => {
      srt2vtt(downloadBuffer, (error, vttBuffer) => {
        if (error) reject(error);
        resolve(vttBuffer);
      });
    });
  });
}
