import Post from "../../db/models/Post";
export default async function handler(req,res){
    const {method, query:{postInfo}} = req;
    switch (method) {
        case 'GET':
            const postFromDB = await Post.findAll()
            res.status(200).send(postFromDB);
            break;
        case 'PUT':
            //add post to db
            await Post.upsert(postInfo);
            res.status(200).send();
            break;
        default:
            break;
    }
}