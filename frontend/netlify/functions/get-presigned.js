
const AWS = require('aws-sdk');

exports.handler = async (event) => {
  try {
    const { filename, contentType } = JSON.parse(event.body);
    if (!filename || !contentType) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'filename и contentType обязательны' })
      };
    }

    // Настраиваем S3-клиент
    const s3 = new AWS.S3({
      endpoint: process.env.YCS3_ENDPOINT,     // например, "s3.storage.yandexcloud.net"
      accessKeyId: process.env.YCS3_KEY,       // ваш access_key
      secretAccessKey: process.env.YCS3_SECRET,// ваш secret_key
      signatureVersion: 'v4',
      s3ForcePathStyle: true,
    });

    // Генерируем уникальный ключ в бакете
    const key = `floorplans/${Date.now()}_${filename}`;

    // Запрашиваем presigned URL для метода PUT
    const url = await s3.getSignedUrlPromise('putObject', {
      Bucket: process.env.YCS3_BUCKET,
      Key: key,
      Expires: 60,              // ссылка годна 60 секунд
      ContentType: contentType, // чтобы S3 записал правильный mime-тип
      ACL: 'public-read'        // чтобы файл стал публичным
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ url, key })
    };
  } catch (err) {
    console.error('Error in get-presigned:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Не удалось сгенерировать presigned URL' })
    };
  }
};
