const SmartersService = require('../Service/SmartersService')

class SmartersController {
    async getAll(req, res) {
        const smartersService = new SmartersService()
        try {
            const data = await smartersService.getAllNumbers()
            if (data.statusCode == 500) {
                res.status(500).json(data)
            }
            res.json(data)
        } catch (error) {
            res.status(500).json({ message: 'Server internal error' })
        }
    };
    async getByPhone(req, res) {
        const smartersService = new SmartersService();
        const phoneNumber = req.params.phone;
        try {
            const data = await smartersService.getByPhone(phoneNumber)
            if (data.statusCode == 500) {
                res.status(500).json(data)
            }
            res.json(data)
        } catch (error) {
            res.status(500).json({ message: 'Server internal error' })
        }
    };
    async create(req, res) {
        const smartersService = new SmartersService();
        const body = req.body;
        try {
            const data = await smartersService.create(body);
            if (data.statusCode == 500) {
                res.status(500).json(data)
            }
            res.status(201).json(data) 
        } catch (error) {
            res.status(500).json({ message: 'Server internal error' })
        }
    };  
    async put(req, res) {
        const smartersService = new SmartersService(); 
        const body = req.body;
        const phoneNumber = req.params.phone;
        if(!phoneNumber){
            res.status(400).json({mensagem: "Falta numero do telefone"})
        }
        try {
            const data = await smartersService.put(phoneNumber, body)
            if (data.statusCode == 500) {
                res.status(500).json(data)
            }
            res.json(data)
        } catch (error) {
            res.status(500).json({ message: 'Server internal error' })
        }
    };
    async delete(req, res) {
        const smartersService = new SmartersService();
        const phoneNumber = req.params.phone;
        if(!phoneNumber){
            res.status(400).json({mensagem: "Falta numero do telefone"})
        }
        try {
            await smartersService.delete(phoneNumber)
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: 'Server internal error' })
        }
    };
}

module.exports = SmartersController; 