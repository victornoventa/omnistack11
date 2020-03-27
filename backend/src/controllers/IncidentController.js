const connection = require('../database/connection');

module.exports = {
    async list(request, response) {
        const { page = 1 } = request.query;

        const [count] = await connection('incidents').count();

        const incidents = await connection('incidents')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
            .limit(5)
            .offset((page - 1) * 5)
            .select(['incidents.*', 'ongs.name', 'ongs.email', 'ongs.whatsapp', 'ongs.city', 'ongs.uf']);

        response.header('X-Total-Count', count['count(*)']);

        return response.json(incidents);
    },
    async create(request, response) {
        const { title, description, value } = request.body;
        const ongId = request.headers.authorization;

        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id: ongId
        });

        return response.json({ id });
    },
    async remove(request, response) {
        const { id } = request.params;
        const ongId = request.headers.authorization;

        const incident = await connection('incidents')
            .where('id', id)
            .select('ong_id')
            .first();

        if (!incident) {
            return response.status(400).json({ error: 'Incident not found!' });
        }

        if (incident.ong_id !== ongId) {
            return response.status(403).json({ error: 'Operation not allowed' });
        }

        await connection('incidents').where('id', id).delete();

        return response.status(204).send();
    }
};