const {User, Post, Comments, Likes} = require('../../db')
export default async function handler(req,res){
    const {method} = req;
    switch (method) {
        // case 'GET':
        //     const postFromDB = await Post.findAll(
        //         {
        //             include:[
        //                 {
        //                     model:User
        //                 },
        //                 {
        //                     model:Comments,
        //                     include:User,
        //                 },
        //             ],
        //             order:[
        //                 ['id', 'DESC'],
        //                 [Comments, 'id', 'ASC']
        //             ]
        //         });
        //     res.status(200).send(postFromDB);
        //     break;
        case 'PUT':
            //add post to db

            const likeCheck = await Likes.findAll({where: {
                postId: req.body.postId,
                userId: req.body.userId
            }})
            console.log('likecheck length: ', likeCheck.length)
            if(likeCheck.length<1){
                await Likes.create(req.body);
            }
            res.status(200).end();
            break;
        default:
            break;
    }
}