const {User, Post, Comments} = require('../../db')
export default async function handler(req,res){
    const {method, body} = req;
    switch (method) {
        case 'PUT':
            await Comments.create(body);
            res.status(200).end();
            break;
        default:
            res.status(500).end();
            break;
    }
}