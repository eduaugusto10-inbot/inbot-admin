const SmartersRepository = require("../repositories/SmartersRepository")
const axios = require('axios')
class SmartersService {
    async getAllNumbers() {
        try {
            const getAllNumbers = await SmartersRepository.getAllNumbers();
            return getAllNumbers;
        } catch (error) {
            console.log(error)
        }
    };
    async getByPhone(phoneNumber) {
        try {
            const getByPhone = await SmartersRepository.getByPhone(phoneNumber);
            const smarters = await axios.get("https://whatsapp.smarters.io/api/v1/settings", { headers: { Authorization: getByPhone[0].accessToken } })
            const combinedResult = {
                ...getByPhone[0],
                ...smarters.data.data
            };
            console.log(combinedResult)

            return combinedResult;
        } catch (error) {
            console.log(error)
        }
    };
    async create(body) {
        const bodyParams = {
            address: body.address,
            description: body.description,
            email: body.email,
            vertical: body.vertical,
            websites: [body.websites]
        };
        const webhook = {
            "webhook": body.gateway
        }
        try {
            const timestampAtual = Math.floor(Date.now() / 1000);
            const resp = await axios.get(`https://in.bot/mod_perl/api.pl?action=get_bot_token_and_welcome&bot_id=${body.botId}&p=${timestampAtual}`)
            body.botToken = resp.data.bot_token;
            console.log(resp.data)

        } catch (error) {
            throw error;
        }

        console.log(body);
        try {
            const responses = await Promise.all([
                SmartersRepository.create(body),
                axios.post("https://whatsapp.smarters.io/api/v1/settings/profile", bodyParams, { headers: { Authorization: body.accessToken } }),
                axios.post("https://whatsapp.smarters.io/api/v1/settings/webhook", webhook, { headers: { Authorization: body.accessToken } })
            ]);

            const response1 = responses[0];
            const response2 = responses[1];

            console.log('Resposta 1:', response1.data);
            console.log('Resposta 2:', response2.data);

            return body;
        } catch (error) {
            // console.error('Erro ao realizar requisições:', error);
            throw error; // Rejeita a Promise com o erro
        }
    }

    async put(phoneNumber, body) {
        const bodyParams = {
            address: body.address,
            description: body.description,
            email: body.email,
            vertical: body.vertical,
            websites: body.websites
        };

        console.log(bodyParams);
        try {
            const phone = await SmartersRepository.put(phoneNumber, body);
            await axios.post("https://whatsapp.smarters.io/api/v1/settings/profile", bodyParams, { headers: { Authorization: body.accessToken } })
            return phone;
        } catch (error) {
            console.log(error.data)
        }
    };
    async delete(phoneNumber) {
        try {
            const phone = await SmartersRepository.delete(phoneNumber);
            return phone;
        } catch (error) {
            console.log(error)
        }
    };
}

module.exports = SmartersService;