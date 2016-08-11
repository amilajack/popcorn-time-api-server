import path from 'path';
import os from 'os';
import fs from 'fs';
import srt2vtt from 'srt2vtt';
import rndm from 'rndm';
import download from 'download';


export function convertSubtitlesFromUrl(srtUrl) {
  return new Promise((resolve, reject) => {
    download(srtUrl).then(downloadBuffer => {
      srt2vtt(downloadBuffer, (error, vttBuffer) => {
        if (error) reject(error);
        resolve(vttBuffer);
      });
    });
  });
}

/**
 * Download a srt file, covert it, and save it
 */
export function convertSubtitlesFromUrlAndDownload(srtUrl) {
  const randomString = rndm(16);
  const basePath = os.tmpdir();

  const srtFilePath = path.join(basePath, `${randomString}.srt`);
  const vttFilePath = path.join(basePath, `${randomString}.vtt`);

  return new Promise((resolve, reject) => {
    download(srtUrl).then(downloadBuffer => {
      fs.writeFileSync(srtFilePath, downloadBuffer);

      const srtBuffer = fs.readFileSync(srtFilePath);

      srt2vtt(srtBuffer, (error, vttBuffer) => {
        if (error) reject(error);
        fs.writeFileSync(vttFilePath, vttBuffer);

        resolve({
          filename: vttFilePath,
          buffer: vttBuffer
        });
      });
    });
  });
}

export function convertSubtitlesFromBuffer(srtBuffer) {
  const randomString = rndm(16);
  const basePath = os.tmpdir();
  const vttFilePath = path.join(basePath, `${randomString}.vtt`);

  return new Promise((resolve, reject) => {
    srt2vtt(srtBuffer, (error, vttBuffer) => {
      if (error) reject(error);
      fs.writeFileSync(vttFilePath, vttBuffer);

      resolve({
        filename: vttFilePath,
        buffer: vttBuffer
      });
    });
  });
}
