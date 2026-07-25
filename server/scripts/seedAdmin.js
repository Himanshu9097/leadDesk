import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Admin from '../models/Admin.js';
import connectDB from '../config/db.js';

dotenv.config();

connectDB();

const seedAdmin = async () => {
  try {
    await Admin.deleteMany(); // Clear existing admins

    const createdAdmin = await Admin.create({
      name: 'Super Admin',
      email: 'admin@leaddesk.com',
      password: 'password123',
      role: 'Admin',
    });

    console.log(`Admin Seeded! Email: ${createdAdmin.email}, Password: password123`);
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

seedAdmin();
