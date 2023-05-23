// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import * as fs from 'fs';

export default async function handler(req, res) {
  // fs.promises.readdir('blogData',(err,data) => {
  //   console.log('hello', data);
  //   let allBlogs = [];
  //   data.forEach((item) => {
  //     console.log(item);
  //     fs.readFile(('blogData/' + item), (err, d) => {
  //       allBlogs.push(d)
  //     })
  //   })
  //     res.status(200).json(allBlogs)
  // })

  let data = await fs.promises.readdir("blogData")
  console.log(req.query.count);
  data = data.slice(0, parseInt(req.query.count))
  let myfile;
 let allBlogs = [];
  for (let index = 0; index < 2; index++) {
    const item = data[index];
    console.log(item,'item');
    myfile = await fs.promises.readFile(('blogData/' + item), 'utf-8')
    allBlogs.push(JSON.parse(myfile))
  }
  res.status(200).json(allBlogs)
}
