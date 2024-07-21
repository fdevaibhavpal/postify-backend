import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/userModel';
import config from '../config/config';

export const register = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
 
  try {
    const user = new User({ username, email, password });
    console.log("User object before saving:", user);
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error registering user' });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  console.log("login", req.body);
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, config.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Error logging in user' });
  }
};
