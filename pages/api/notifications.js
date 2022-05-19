const {User, Post, Comments, Notifications} = require('../../db')
export default async function handler(req,res){
    const {method, body} = req;
    switch (method) {
        case 'PUT':
            await Notifications.create(body);
            res.status(200).end();
            break;
        case 'GET':
            const currentNotifications = await Notifications.findAll({
                where:{
                    userId: body.userId
                } })
            res.status(200).send(currentNotifications)
            break;
        case 'DELETE':
            await Notifications.destroy({
                where: {
                    delivered: true,
                }
            })
            res.status(200).end()
            break;
        default:
            res.status(500).end();
            break;
    }
}