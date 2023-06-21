export const renameImagen = (req, file, callback) => {
  const name = file.originalname.split('.')[0];
  const fileName = file.originalname;
  const randomName = Array(4)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join('');

  console.log(`${name}_${randomName}${fileName}`);
  callback(null, `${name}_${randomName}${fileName}`);
};

export const ImagenFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return callback(new Error('Tipo de formato invalido'), false);
  }

  callback(null, true);
};
