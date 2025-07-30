import jwt from 'jsonwebtoken';
import User from '../models/user.model.js'

export const generateToken = (res, userId) => {
  try {
      const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
  } catch (error) {
    console.log("Error in Generating Token: ", error.message);
  }
};

export const validateToken = async (req, res, next) => {
  try {
      const token = req.cookies.token;
      if (!token) {
          return res.status(404).json({ success: false, message: 'Unauthorized: No Token Provided' })
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (!decoded) {
          return res.status(404).json({ success: false, message: 'Unauthorized: Invalid Token' })
      }

      const user = await User.findById(decoded.userId).select('-password');
      req.user = user;
      next();
  } catch (error) {
      console.log("Token Verification Error: ", error.message)
  }
}