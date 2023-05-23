// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import * as fs from 'fs';

// http://localhost:3000/api/getblog?slug=how-to-learn-flask
export default function handler(req, res) {
  fs.readFile(`blogData/${req.query.slug}.json`,'utf-8',(err,data) => {
    if(err){
        res.status(500).json({error: 'No such blog found'})
    }
    res.status(200).json(JSON.parse(data))
  })
}
