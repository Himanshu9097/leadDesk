import express from 'express';
import { body } from 'express-validator';
import {
  createLead,
  getLeads,
  updateLeadStatus,
  deleteLead,
  getLeadStats,
} from '../controllers/leadController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Validation middleware array for creating a lead
const createLeadValidation = [
  body('name').trim().isLength({ min: 3 }).withMessage('Name must be at least 3 characters'),
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('budget').notEmpty().withMessage('Budget is required'),
  body('message').trim().isLength({ min: 10 }).withMessage('Message must be at least 10 characters'),
];

router.post('/', createLeadValidation, createLead);
router.get('/', protect, getLeads);
router.get('/stats', protect, getLeadStats);
router.patch('/:id/status', protect, updateLeadStatus);
router.delete('/:id', protect, deleteLead);

export default router;
