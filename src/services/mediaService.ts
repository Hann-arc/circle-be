import cloudinary from '../libs/cloudinary';

export const uploadToCloudinary = async (file: Express.Multer.File) => {
  const base64 = file.buffer.toString('base64');
  
  const dataURI = `data:${file.mimetype};base64,${base64}`;

  const cloudinaryResponse = await cloudinary.uploader.upload(dataURI, {
    folder: 'Circle',
  });

  return cloudinaryResponse.secure_url;
};

export const deleteFromCloudinary = async (url: string) => {
  await cloudinary.uploader.destroy(url);
};
 