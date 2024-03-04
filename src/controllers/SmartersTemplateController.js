const SmartersTemplateService = require('../Service/SmartersTemplateService')

class SmartersTemplateController {
    async create(req, res) {
        const smartersTemplateService = new SmartersTemplateService();
        try {
            const data = await smartersTemplateService.create(req.body);
            if (data.statusCode == 500) {
                res.status(500).json(data)
            }
            res.json(data)
        } catch (error) {
            res.status(500).json({ message: 'Server internal error' })
        }
    };
}