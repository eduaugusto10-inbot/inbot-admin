const express = require('express')
const path = require('path')
const ReportController = require('../controllers/ReportController')
const SmartersController = require('../controllers/SmartersController')
const version = require('../Service/Version')
const router = express.Router()

router.get('/report', new ReportController().getAll)
router.get('/whats', new SmartersController().getAll)
router.get('/whats/:phone', new SmartersController().getByPhone)
router.post('/whats', new SmartersController().create)
router.delete('/whats/:phone', new SmartersController().delete)
router.put('/whats/:phone', new SmartersController().put)
router.post('/whats/image', new SmartersController().imagePost)
// router.post('/whats/template', new SmartersTemplateController().create)
router.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '../pages/index.html'));
});
router.get('/whatsapp', function (req, res) {
    res.sendFile(path.join(__dirname, '../pages/whatsapp.html'));
});
router.get('/facebook', function (req, res) {
    res.sendFile(path.join(__dirname, '../pages/facebook.html'));
});
router.get("/version", (req, res, next) => {
    console.log(new Date(), 'Version request received', version);
    res.send({ version: version.num });
    next();
});

module.exports = router   