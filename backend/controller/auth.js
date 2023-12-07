const user = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new user({
      username,
      email,
      password: hashedPassword,
    });

    const saveUser = await newUser.save();
    res.status(200).json(saveUser);
  } catch (error) {
    res.status(500).json(error);
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const foundUser = await user.findOne({ email });

    if (!foundUser) {
      return res.status(404).json({ message: "email not found" });
    }

    const passwordMatch = await bcrypt.compare(password, foundUser.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      {
        id: foundUser._id,
        username: foundUser.username,
        email: foundUser.email,
      },
      process.env.SECRET_CODE,
      {
        expiresIn: "3d",
      }
    );

    const { _id, role } = foundUser;
    res
      .cookie("token", token)
      .status(200)
      .json({ message: "Login successful", email, password, _id, role });
  } catch (error) {
    res.status(500).json(error);
  }
};

const logoutUser = async (req, res) => {
  try {
    res
      .clearCookie("token", { sameSite: "none", secure: true })
      .status(200)
      .json({ message: "logout successfullt" });
  } catch (error) {}
};

const refecthUser = (req, res) => {
  const token = req.cookies.token;
  jwt.verify(token, process.env.SECRET_CODE, {}, async (err, data) => {
    if (err) {
      return res.status(404).json(err);
    }
    res.status(200).json(data);
  });
};

module.exports = { registerUser, loginUser, logoutUser, refecthUser };
