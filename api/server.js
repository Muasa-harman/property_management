import express from "express";
import mongoose, { connect } from "mongoose";
import cookieParser from "cookie-parser";
import userRouter from "./router/user.js";
import authRouter from "./router/auth.js";
import listingRouter from "./router/listing.js";
import "dotenv/config";
const app = express();
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to mongodb");
  })
  .catch(console.error);
// const __dirname = path.resolve();

app.use(express.json());
app.use(cookieParser());
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/listing", listingRouter);

// app.use(express.static(path.join(__dirname, '/client/dist')));

// app.get('*',(req,res) =>{
//   res.sendFile(path.join(__dirname, 'client','dist','index.html'));
// });

app.use((error, req, res, next) => {
  const statusCode = error.statusCode || 500;
  const message = error.message || "Internal server error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});


app.listen(process.env.PORT, () =>
  console.log(`Example app listening on port ${process.env.PORT}!`)
);
