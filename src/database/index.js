import mongoose from 'mongoose';

const TEMP_MONGODB_HOST = 'mongodb://127.0.0.1:27017/milkmanager';

mongoose.connect(process.env.MONGODB_HOST || TEMP_MONGODB_HOST);
mongoose.Promise = global.Promise;

export default mongoose;