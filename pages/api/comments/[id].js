const {User, Post, Comments} = require('../../../db');
export default async function handler(req,res){
    const {method, query:{id}, body} = req;
    switch (method) {
        case 'PATCH':
            try {
                await Comments.update(body, {where: {id:id}});
                res.status(204).end('/comments')
            } catch (error) {
                console.log(error)
            }
            break;
        case 'GET':
            try {
                const {dataValues} = await Comments.findByPk(id);
                res.status(200).send(dataValues);
            } catch (error) {
                console.log(error)
            }
        default:
            break;
    }
}