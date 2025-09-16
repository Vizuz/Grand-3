// netlify/functions/upload-photo.js
const AWS = require('aws-sdk');

const s3 = new AWS.S3({
  endpoint:        process.env.YCS3_ENDPOINT,  
  region:          process.env.YCS3_REGION,     // ▶︎ "ru-central1"
  accessKeyId:     process.env.YCS3_KEY,
  secretAccessKey: process.env.YCS3_SECRET,
  signatureVersion: 'v4'
});

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  // Netlify отдаёт файл Base-64, заголовок "multipart/form-data"
  const contentType =
    event.headers['content-type'] || event.headers['Content-Type'];

  if (!contentType?.startsWith('multipart/form-data')) {
    return { statusCode: 400, body: 'multipart/form-data only' };
  }

  try {
    // 1) выделяем boundary
    const boundary = contentType.match(/boundary=(.+)$/i)?.[1];
    if (!boundary) throw new Error('No boundary');

    // 2) декодируем Base-64-тело и ищем первую часть-файл
    const body = Buffer.from(event.body, 'base64');
    const delimiter = Buffer.from('--' + boundary);
    const parts     = body.toString('binary').split(delimiter);

    // находим кусок, в котором есть "filename="
    const filePart = parts.find(p => /filename=/i.test(p));
    if (!filePart) throw new Error('No file found');

    // 3) выдёргиваем имя и байты файла
    const match = filePart.match(/filename="([^"]+)".+?\r\n\r\n([\s\S]*)\r\n$/);
    if (!match) throw new Error('Cannot parse file part');

    const filename    = match[1];
    const fileContent = Buffer.from(match[2], 'binary');

    // 4) формируем Key и заливаем
    const key = `uploads/${Date.now()}_${filename}`;

    await s3
      .upload({
        Bucket: process.env.YCS3_BUCKET,
        Key:    key,
        Body:   fileContent,
        ACL:    'public-read',
        ContentType: 'image/*'
      })
      .promise();

    const publicUrl = `https://${process.env.YCS3_BUCKET}.${process.env.YCS3_ENDPOINT.replace(/^https?:\/\//, '')}/${key}`;

    return {
      statusCode: 200,
      body: JSON.stringify({ url: publicUrl })
    };
  } catch (err) {
    console.error('upload-photo error:', err);
    return { statusCode: 500, body: err.message };
  }
};
