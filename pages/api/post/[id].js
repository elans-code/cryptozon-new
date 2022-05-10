const {User, Post, Comments} = require('../../../db');
export default async function handler(req,res){
    const {method, query:{id}, body} = req;
    switch (method) {
        case 'PATCH':
            try {
                await Post.update(body, {where: {id:id}});
                res.status(204).end('/post')
            } catch (error) {
                console.log(error)
            }
            break;
        case 'GET':
            try {
                const {dataValues} = await Post.findByPk(id);
                res.status(200).send(dataValues);
            } catch (error) {
                console.log(error)
            }
        default:
            break;
    }
}