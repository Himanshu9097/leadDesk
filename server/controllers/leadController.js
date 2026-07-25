import Lead from '../models/Lead.js';
import sendEmail from '../utils/emailService.js';
import { validationResult } from 'express-validator';

// @desc    Create a lead
// @route   POST /api/leads
// @access  Public
const createLead = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400);
      throw new Error(errors.array()[0].msg);
    }

    const { name, email, budget, message } = req.body;

    const lead = await Lead.create({
      name,
      email,
      budget,
      message,
    });

    if (lead) {
      // Send Email Notification
      await sendEmail({
        email: 'admin@leaddesk.com',
        subject: 'New Lead Submitted',
        message: `You have a new lead from ${name} (${email}). Budget: ${budget}. Message: ${message}`,
      });

      res.status(201).json(lead);
    } else {
      res.status(400);
      throw new Error('Invalid lead data');
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Get all leads (with search, filter, pagination)
// @route   GET /api/leads
// @access  Private
const getLeads = async (req, res, next) => {
  try {
    const pageSize = Number(req.query.limit) || 10;
    const page = Number(req.query.page) || 1;
    const search = req.query.search;
    const status = req.query.status;
    const sort = req.query.sort || '-createdAt';

    let query = {};

    if (search) {
      query.$text = { $search: search };
    }

    if (status) {
      query.status = status;
    }

    const count = await Lead.countDocuments(query);
    const leads = await Lead.find(query)
      .sort(sort)
      .limit(pageSize)
      .skip(pageSize * (page - 1));

    res.status(200).json({ leads, page, pages: Math.ceil(count / pageSize), total: count });
  } catch (error) {
    next(error);
  }
};

// @desc    Update lead status
// @route   PATCH /api/leads/:id/status
// @access  Private
const updateLeadStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const validStatuses = ['New', 'Contacted', 'Closed'];

    if (!validStatuses.includes(status)) {
      res.status(400);
      throw new Error('Invalid status');
    }

    const lead = await Lead.findById(req.params.id);

    if (lead) {
      lead.status = status;
      const updatedLead = await lead.save();
      res.status(200).json(updatedLead);
    } else {
      res.status(404);
      throw new Error('Lead not found');
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a lead
// @route   DELETE /api/leads/:id
// @access  Private
const deleteLead = async (req, res, next) => {
  try {
    const lead = await Lead.findById(req.params.id);

    if (lead) {
      await Lead.deleteOne({ _id: lead._id });
      res.status(200).json({ message: 'Lead removed' });
    } else {
      res.status(404);
      throw new Error('Lead not found');
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Get dashboard stats
// @route   GET /api/leads/stats
// @access  Private
const getLeadStats = async (req, res, next) => {
  try {
    const totalLeads = await Lead.countDocuments({});
    const newLeads = await Lead.countDocuments({ status: 'New' });
    const contactedLeads = await Lead.countDocuments({ status: 'Contacted' });
    const closedLeads = await Lead.countDocuments({ status: 'Closed' });

    res.status(200).json({
      totalLeads,
      newLeads,
      contactedLeads,
      closedLeads,
    });
  } catch (error) {
    next(error);
  }
};

export { createLead, getLeads, updateLeadStatus, deleteLead, getLeadStats };
