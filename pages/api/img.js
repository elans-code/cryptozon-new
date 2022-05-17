const {User, Post, Comments} = require('../../db')
const textToImage = require('text-to-image')
export default async function handler(req,res){
    const {method, query} = req;
    switch (method) {
        case 'GET':
            const textImage = await textToImage.generate(query[0],{bgColor: '#FFFFFF00', fontSize:'48', maxWidth:600,customHeight:400, textAlign:'center',verticalAlign:'center', lineHeight:48});
            res.status(200).send(textImage);
            break;
        default:
            break;
    }
}