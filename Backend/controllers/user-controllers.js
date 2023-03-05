const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");

dotenv.config();

const { User } = require("../models");
const { Op } = require("sequelize");
const sendMail = require("../config/send-mail");

exports.signup = async (req, res, next) => {
  try {
    let { email, phone_number, first_name, last_name, password } = req.body;
    const user = await User.findOne({
      where: { email },
    });
    if (user) {
      return res.status(409).json({ error: "Email already exists" });
    } else {
      const salt = await bcrypt.genSalt(10);
      password = await bcrypt.hash(password, salt);
      const user = await User.create({
        email,
        phone_number,
        first_name,
        last_name,
        password,
      });
      return res.status(201).json({ message: "Account created successfully" });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    let { email, password } = req.body;
    const user = await User.findOne({
      where: { email },
    });
    if (!user) {
      return res.status(401).json({ error: "Email or password is incorrect" });
    } else {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ error: "Email or password is incorrect" });
      } else {
        const token = jwt.sign(
          { userId: user.id, email: user.email },
            process.env.TOKEN_SECRET,
          { expiresIn: "1h" }
        );
        return res.status(200).json({
          id: user.id,
          email: user.email,
          token: token,
        });
      }
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.resetPassword = async (req, res, next) => {
  try {
    let { email } = req.body;
    const user = await User.findOne({
      where: { email },
    });
    if (!user) {
      return res.status(404).json({ error: "Email doesn't exist" });
    } else {
      const buffer = crypto.randomBytes(32);
      const token = buffer.toString("hex");
      user.reset_token = token;
      user.token_exp_time = Date.now() + 30 * 60000;
      await user.save();
      const sendEmail = await sendMail(
        user.email,
        user.first_name,
        "http://18.189.189.83:3000/reset-password/" + token
      );
      return res.status(200).json({ message: "Email sent successfully" });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.newPassword = async (req, res) => {
  try {
    let { password, token } = req.body;
    const user = await User.findOne({
      where: {
        [Op.and]: [
          {
            reset_token: token,
          },
          {
            token_exp_time: {
              [Op.gt]: Date.now(),
            },
          },
        ],
      },
    });
    if (!user) {
      return res.status(401).json({ error: "Invalid token" });
    } else {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      user.reset_token = null;
      user.token_exp_time = null;
      await user.save();
      return res.status(200).json({ message: "Password has been successfully reset" });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};
