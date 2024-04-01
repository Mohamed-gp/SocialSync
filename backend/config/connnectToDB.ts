import mongoose from "mongoose";

const connectToDB = async () => {
  try {
    mongoose.connect(process.env.MONGO_URI as string);
    console.log("connected succefuly to db");
  } catch (error) {
    console.log("error connecting to db");
    console.log(error);
  }
};



export default connectToDB