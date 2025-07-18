import asyncHandler from 'express-async-handler';
import User from '../models/User.js';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
export const getLoggedInUserProfile = async (req, res) => {
  try {
    const user = req.user; 
    if (!user) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ message: 'Server error fetching profile', error: error.message });
  }
};
import mongoose from 'mongoose'; 
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(process.cwd(), 'backend', 'uploads');
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, req.user._id + '-' + Date.now() + ext);
  }
});
export const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith('image/')) {
      return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
  },
  limits: { fileSize: 5 * 1024 * 1024 } 
});
export const getMyProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password -nonce');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
export const updateMyProfile = async (req, res) => {
  try {
    const updates = (({ username, aboutMe, skills, portfolio }) => ({ username, aboutMe, skills, portfolio }))(req.body);
    if (updates.skills && Array.isArray(updates.skills)) {
      updates.skills = updates.skills.map(s => s.trim());
    }
    const user = await User.findByIdAndUpdate(req.user._id, updates, { new: true, runValidators: true }).select('-password -nonce');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
export const uploadProfilePhoto = async (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
  try {
    const imageUrl = `/uploads/${req.file.filename}`;
    const user = await User.findByIdAndUpdate(req.user._id, { photoUrl: imageUrl }, { new: true });
    res.json({ photoUrl: imageUrl });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
const getUserProfile = asyncHandler(async (req, res) => {
  const userId = req.params.id;
  if (!userId) {
    res.status(400);
    throw new Error('User ID not provided in route parameters');
  }
  if (!userId.startsWith('0x') || userId.length !== 42) {
     res.status(400);
     throw new Error('Invalid wallet address format');
  }
  const user = await User.findOne({ walletAddress: userId }).select('-password -nonce'); 
  if (user) {
    res.json({
      _id: user._id,
      username: user.username,
      walletAddress: user.walletAddress,
      photoUrl: user.photoUrl,
      aboutMe: user.aboutMe,
      skills: user.skills,
      portfolio: user.portfolio,
      completedGigs: user.completedGigs,
      totalEarned: user.totalEarned,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    user.username = req.body.username || user.username;
    user.photoUrl = req.body.photoUrl || user.photoUrl;
    user.aboutMe = req.body.aboutMe || user.aboutMe;
    user.skills = req.body.skills || user.skills;
    user.portfolio = req.body.portfolio || user.portfolio;
    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      username: updatedUser.username,
      walletAddress: updatedUser.walletAddress,
      photoUrl: updatedUser.photoUrl,
      aboutMe: updatedUser.aboutMe,
      skills: updatedUser.skills,
      portfolio: updatedUser.portfolio,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});
export { getUserProfile, updateUserProfile };
