import mongoose from "mongoose";

const conectarDB = async () => {
  try {
    const connectionMongoose = await mongoose.connect(
      process.env.MONGO_URI,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    const url = `${connectionMongoose.connection.host}:${connectionMongoose.connection.port}`
    console.log(`MongoDB conectado en ${url}`)
  } catch (error) {
    console.log(`error: ${error.message}`);
    process.exit();
  }
};

export default conectarDB