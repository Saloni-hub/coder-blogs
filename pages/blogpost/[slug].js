// dynamic route
import { useRouter } from "next/router";
import styles from "../../styles/BlogPost.module.css";

import React, { useState } from "react";
import * as fs from 'fs';

const Slug = (props) => {
  const [blog,setBlog] = useState(props.myBlog);
  const router = useRouter();

  // useEffect(() => {
  //   if(!router.isReady) return;
  //   fetch(`http://localhost:3000/api/getblog?slug=${slug}`).then((a) => {
  //       return a.json();})
  //       .then((parsed) => {
  //           console.log(parsed);
  //           setBlog(parsed)
  //       })
  //   },[router.isReady])

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1>{blog && blog.slug}</h1>
        <hr></hr>
        <div>
        {blog && blog.content}
        </div>
      </main>
    </div>
  );
};

// export async function getServerSideProps(context) {
//   // Fetch data from external API
//   const { slug } = context.query;
//   const res = await fetch(`http://localhost:3000/api/getblog?slug=${slug}`);
//   const myBlog = await res.json();
 
//   // Pass myBlog to the page via props
//   return { props: { myBlog } };
// }


export async function getStaticPaths() {
  return {
    paths: [   
       { params: {slug: 'how-to-learn-flask'}}, 
       { params: {slug: 'how-to-learn-javascript'}},
       { params: {slug: 'how-to-learn-nextjs'}}, 
   ],
    // Enable statically generating additional pages
    fallback: true,
  };
}

export async function getStaticProps(context) {
  // Fetch data from external API
  const { slug } = context.params;
  let myBlog = await fs.promises.readFile(`blogData/${slug}.json`,'utf-8')
  // Pass myBlog to the page via props
  return { props: { myBlog: JSON.parse(myBlog) } };
}

export default Slug;
