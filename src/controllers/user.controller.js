import User from '../models/user.model.js'
import bcrypt from 'bcryptjs';
import { registerSchema, loginSchema } from '../validators/user.validator.js'
import { generateToken } from '../utils/token.js';

export const register = async (req, res) => {
  try {
    const validatedData = registerSchema.parse(req.body); 

    const { name, email, password } = validatedData;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    generateToken(res, newUser._id); 

    res.status(201).json({
      message: 'User registered successfully',
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (error) {
    if (error.name === 'ZodError') {
      const firstError = error.errors?.[0]?.message || 'Invalid Input';
      return res.status(400).json({ message: firstError });
    }
    res.status(500).json({ message: 'Something went wrong during registration' });
  }
};

export const login = async (req, res) => {
  try {
    const validatedData = loginSchema.parse(req.body);

    const { email, password } = validatedData;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    generateToken(res, user._id); // This will handle setting the cookie

    res.status(200).json({
      message: 'Login successful',
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    if (error.name === 'ZodError') {
      const firstError = error.errors?.[0]?.message || 'Invalid Input';
      return res.status(400).json({ message: firstError });
    }

    console.error('Login error:', error);
    res.status(500).json({ message: 'Something went wrong during login' });
  }
};

export const logout = (req, res) => {
    try {
        res.clearCookie('token', { maxAge: 0 });
        res.status(200).json({ success: true, message: 'Logged Out' })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
};
