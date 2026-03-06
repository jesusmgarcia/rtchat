import { srvConfig } from 'loaders/app';
import mongoose from 'mongoose';

export const dbConnect = async () => {
  mongoose.set('strictQuery', false);

  return mongoose.connect(srvConfig.mongoUri);
};

export const dbClose = () => {
  return mongoose.connection.close();
};

export const dbClear = async () => {
  //await roleModel.deleteMany({});
};
