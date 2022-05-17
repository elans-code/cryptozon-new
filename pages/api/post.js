const {User, Post, Comments} = require('../../db')
export default async function handler(req,res){
    const {method, query:{postInfo}} = req;
    switch (method) {
        case 'GET':
            const postFromDB = await Post.findAll(
                {
                    include:[
                        {
                            model:User
                        },
                        {
                            model:Comments,
                            include:User,
                        },
                    ],
                    order:[
                        ['id', 'ASC'],
                        [Comments, 'id', 'ASC']
                    ]
                });
            res.status(200).send(postFromDB);
            break;
        case 'PUT':
            //add post to db
            await Post.create(postInfo);
            res.status(200).end();
            break;
        default:
            break;
    }
}