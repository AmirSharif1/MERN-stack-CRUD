import express from "express";
import dotenv from "dotenv";
import connectDB from "./mongo/mongo.js";
import { User } from "./schema/schema.js";
import bodyParser from "express";
import cors from "cors"
dotenv.config({
  path: "./.env",
});

const app = express();
app.use(
  cors({
    origin: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);


app.use(bodyParser.json());

connectDB();

//  post

app.post("/register", async (req, res) => {
  try {
    let { username, email, password } = req.body;

    // Check if the user already exists
    let existUser = await User.findOne({ email });
    if (existUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create a new user
    let createdUser = await User.create({
      username,
      email,
      password,
    });

    res.json({message:"userData successfully add ", createdUser});
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to create user", details: error.message });
  }
});

//  get user
app.get("/users", async (req, res) => {
  try {
    let users = await User.find();
    res.json(users);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch users", details: error.message });
  }
});
//    put contact
app.put("/update/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let updateData = req.body; 

    let updatedUser = await User.findByIdAndUpdate(id, updateData, {new: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "Data successfully updated", updatedUser });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update data", details: error.message });
  }
});

app.delete("/delete/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failedd to delete user", details: error.message });
  }
});


app.listen(4001, () => {
  console.log("Example app ddlistening on port 4001");
});
