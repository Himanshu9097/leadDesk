import Admin from '../models/Admin.js';
import generateToken from '../utils/generateToken.js';

// @desc    Auth admin & get token
// @route   POST /api/auth/login
// @access  Public
const authAdmin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });

    if (admin && (await admin.matchPassword(password))) {
      generateToken(res, admin._id);

      res.status(200).json({
        _id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      });
    } else {
      res.status(401);
      throw new Error('Invalid email or password');
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Logout admin / clear cookie
// @route   POST /api/auth/logout
// @access  Public
const logoutAdmin = (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: 'Logged out successfully' });
};

// @desc    Get admin profile
// @route   GET /api/auth/profile
// @access  Private
const getAdminProfile = async (req, res, next) => {
  try {
    const admin = await Admin.findById(req.admin._id);

    if (admin) {
      res.status(200).json({
        _id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      });
    } else {
      res.status(404);
      throw new Error('Admin not found');
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Register a new admin
// @route   POST /api/auth/register
// @access  Public (Can be restricted via secret key in production)
const registerAdmin = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const adminExists = await Admin.findOne({ email });

    if (adminExists) {
      res.status(400);
      throw new Error('Admin already exists');
    }

    const admin = await Admin.create({
      name,
      email,
      password,
      role: 'Admin',
    });

    if (admin) {
      generateToken(res, admin._id);

      res.status(201).json({
        _id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      });
    } else {
      res.status(400);
      throw new Error('Invalid admin data');
    }
  } catch (error) {
    next(error);
  }
};

export { authAdmin, logoutAdmin, getAdminProfile, registerAdmin };
