const axios = require('axios');
const SmartersRepository = require('../repositories/SmartersRepository');


class SmartersTemplateService {
    async create(templateData) {
        const smartersRepository = new SmartersRepository();
        const tokenBotId = await smartersRepository.getByBotId(templateData.botId);
        let config = {
            method: 'post',
            url: 'https://whatsapp.smarters.io/api/v1/messageTemplates',
            headers: {
                'Authorization': tokenBotId
            },
            data: templateData.template
        };

        axios.request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
            })
            .catch((error) => {
                console.log(error);
            });

    }
}

module.exports = SmartersTemplateService;