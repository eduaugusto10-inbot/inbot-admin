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

    async imagePost(image, phoneNumber) {
        try {
            const getByPhone = await SmartersRepository.getByPhone(phoneNumber);
            const profile = {
                "profile_pic": image
            };
            axios.post("https://whatsapp.smarters.io/api/v1/settings/profile/pic", profile, { headers: { Authorization: getByPhone[0].accessToken } })
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
        };

        const profile = {
            "profile_pic": body.profile_pic
        };

        try {
            const timestampAtual = Math.floor(Date.now() / 1000);
            const resp = await axios.get(`https://in.bot/mod_perl/api.pl?action=get_bot_token_and_welcome&bot_id=${body.botId}&p=${timestampAtual}`)
            body.botToken = resp.data.bot_token;
            console.log(resp.data)

        } catch (error) {
            throw error;
        }
        try {
            await axios.post("https://whatsapp.smarters.io/api/v1/settings/profile/pic", profile, { headers: { Authorization: body.accessToken } })
        } catch (error) {
            throw error;
        }
        console.log(body);
        try {
            const responses = await Promise.all([
                SmartersRepository.create(body),
                axios.post("https://whatsapp.smarters.io/api/v1/settings/profile", bodyParams, { headers: { Authorization: body.accessToken } }),
                axios.post("https://whatsapp.smarters.io/api/v1/settings/webhook", webhook, { headers: { Authorization: body.accessToken } }),
            ]);

            const response1 = responses[0];
            const response2 = responses[1];

            console.log('Resposta 1:', response1.data);
            console.log('Resposta 2:', response2.data);

            return body;
        } catch (error) {
            throw error;
        }
    }

    async put(phoneNumber, body) {
        console.log("body")
        console.log(body)
        const bodyParams = {
            address: body.address,
            description: body.description,
            email: body.email,
            vertical: body.vertical,
            websites: body.websites
        };
        const webhook = {
            "webhook": body.webhook
        }
        try {
            const timestampAtual = Math.floor(Date.now() / 1000);
            const resp = await axios.get(`https://in.bot/mod_perl/api.pl?action=get_bot_token_and_welcome&bot_id=${body.botId}&p=${timestampAtual}`)
            body.botToken = resp.data.bot_token;
            console.log(resp.data)

        } catch (error) {
            throw error;
        }
        console.log(webhook)
        console.log(bodyParams);
        try {
            const responses = await Promise.all([
                SmartersRepository.put(body.number, body),
                axios.post("https://whatsapp.smarters.io/api/v1/settings/profile", bodyParams, { headers: { Authorization: body.accessToken } }),
                axios.post("https://whatsapp.smarters.io/api/v1/settings/webhook", webhook, { headers: { Authorization: body.accessToken } })
            ]);

            const response1 = responses[0];
            const response2 = responses[1];

            console.log('Resposta 1:', response1.data);
            console.log('Resposta 2:', response2.data);

            return body;
        } catch (error) {
            throw error;
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