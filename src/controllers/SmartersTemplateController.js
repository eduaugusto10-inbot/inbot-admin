const SmartersTemplateService = require('../Service/SmartersTemplateService')
const axios = require('axios')

class SmartersTemplateController {
    async create(req, res) {
        const smartersTemplateService = new SmartersTemplateService();
        try {
            const data = await smartersTemplateService.create(req.body);
            console.log(data)
            if (data.status == 500) {
                res.status(500).json(data)
            }
            res.status(200).json(data.data)
        } catch (error) {
            res.status(500).json({ message: 'Server internal error' })
        }
    };
    async send(req, res) {
        try {
            await axios.post('https://integration-cluster-v9-2.inbot.com.br/api/v1/send-template', req.body)
                .then(resp => console.log(resp))
                .catch(error => console.log(error))
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = SmartersTemplateController