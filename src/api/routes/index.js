const express = require('express');
const MedicineController = require('../controllers/medicine.controller');

const router = express.Router();

// DrugInfo by drugName
router.get('/drugsDetails/:drugName', MedicineController.getDrugDetailsByName);

// ProprietaryInformation by Rxcui
router.get('/proprietaryInfo/:rxcui', MedicineController.getProprietaryInfoByRxcui);

module.exports = router;