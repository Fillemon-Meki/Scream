import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcrypt";


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
dotenv.config();

mongoose
  .connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

const userSchema = mongoose.Schema({
  name: String,
  email: { type: String },
  password: String,
});

const User = mongoose.model("User", userSchema);

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email: email }).then((user) => {
    if (user) {
      bcrypt.compare(password, user.password, function (err, result) {
        if (result) {
          res.send({ message: "Login successful", user });
        } else {
          res.send({ message: "Invalid password" });
        }
      });
    } else {
      res.send({ message: "Email not found" });
    }
  });
});

app.post("/register", (req, res) => {
  const { name, email, password } = req.body;

  User.findOne({ email: email }).then((user) => {
    if (user) {
      res.send({ message: "User already exists" });
      console.log("User exists");
    } else {
      const newUser = new User({
        name,
        email,
        password,
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) {
            console.log(err);
            return;
          }

          newUser.password = hash;
          newUser
            .save()
            .then(() => {
              res.send({ message: "Successfully registered" });
              console.log("Registered successfully");
            })
            .catch((err) => {
              res.send(err);
            });
        });
      });
    }
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Listening at port ${process.env.PORT}`);
});
