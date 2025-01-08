const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

// Define a schema and model for the company count
const companyCountSchema = new mongoose.Schema({
  count: { type: Number, required: true }
});
const CompanyCount = mongoose.model('CompanyCount', companyCountSchema);

// API endpoint to get the number of companies
router.get('/companies/count', async (req, res) => {
  try {
    const countDoc = await CompanyCount.findOne();
    res.json({ count: countDoc ? countDoc.count : 0 });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// API endpoint to increment the number of companies
router.post('/companies/increment', async (req, res) => {
  try {
    let countDoc = await CompanyCount.findOne();
    if (!countDoc) {
      countDoc = new CompanyCount({ count: 0 });
    }
    countDoc.count += 1;
    await countDoc.save();
    res.json({ count: countDoc.count });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;