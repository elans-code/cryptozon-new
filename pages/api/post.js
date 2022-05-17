const {User, Post, Comments, LikePost, LikeComments} = require('../../db')
export default async function handler(req,res){
    const {method} = req;
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
                            include:[
                                {
                                    model:User
                                },
                                {
                                    model:LikeComments
                                }
                            ],
                        },
                        {
                            model:LikePost
                        }
                    ],
                    order:[
                        ['id', 'DESC'],
                        [Comments, 'id', 'ASC']
                    ]
                });
            res.status(200).send(postFromDB);
            break;
        case 'PUT':
            //add post to db
            await Post.create(req.body);
            res.status(200).end();
            break;
        default:
            break;
    }
}