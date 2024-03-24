const axios = require('axios');
const SmartersRepository = require('../repositories/SmartersRepository');


class SmartersTemplateService {
    async create(templateData) {
        console.log(templateData)
        let resp;
        const botId = 403;
        const tokenBotId = await SmartersRepository.getByBotId(botId);
        console.log(tokenBotId)

        let config = {
            method: 'post',
            url: 'https://whatsapp.smarters.io/api/v1/messageTemplates',
            headers: {
                'Authorization': tokenBotId
            },
            data: templateData
        };

        console.log(templateData)
        await axios.request(config)
            .then((response) => {
                resp = response;
            })
            .catch((error) => {
                console.log(error);
            });
        return resp;
    }
}

module.exports = SmartersTemplateService;