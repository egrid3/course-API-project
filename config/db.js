import mongoose from 'mongoose';

const connectDB = async () => {
  const conctn = await mongoose.connect(process.env.MONGO_URI);
  console.log(`MongoDB is Connected: ${conctn.connection.host}`);
}

export default connectDB;