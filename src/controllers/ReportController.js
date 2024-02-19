const ReportService = require('../Service/ReportService')

class ReportController {
    async getAll(req, res) {
        const reportService = new ReportService()
        try {
            const data = await reportService.getAll()
            res.json(data)
        } catch (error) {
            if (error.statusCode && error.statusCode === 500) {
                res.status(500).json(error);
            } else {
                console.error("Erro interno do servidor:", error);
                res.status(500).json({ message: 'Erro interno do servidor' });
            }
        }
    }
}

module.exports = ReportController