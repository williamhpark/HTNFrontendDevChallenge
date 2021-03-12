const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();

// APP CONFIG //

const app = express();
const PORT = process.env.PORT || 5000;

// MIDDLEWARE //

app.use(express.json());
app.use(cors());

// DB CONFIG //

console.log("Connecting to MongoDB...");
mongoose.connect(
  process.env.MONGODB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  },
  (err) => {
    if (err) {
      return console.error(err);
    }
    console.log("MongoDB connection established.");
  }
);

// ROUTES CONFIG //

app.use("/api/user", require("./routes/userRoutes"));

// LISTENER

app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));

// DEPLOYMENT CODE

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
