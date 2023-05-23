import React, { useEffect, useState } from "react";
import styles from "../styles/Blog.module.css";
import Link from "next/link";
import * as fs from "fs";
import InfiniteScroll from "react-infinite-scroll-component";

const Blog = (props) => {
  const [blogs, setBlogs] = useState(props.allBlogs);
  const [count,setCount] = useState(2);

  // useEffect(() => {
  //     fetch('http://localhost:3000/api/blogs').then((a) => {
  //         return a.json();})
  //         .then((parsed) => {
  //             console.log(parsed);
  //             setBlogs(parsed)
  //         })
  //     },[])

  

  const fetchData = async () => {
    let d = await fetch(`http://localhost:3000/api/blogs/?count=${count + 2}`)
    setCount(count+2)
    let data = await d.json()
    setBlogs(data)    
  };

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <InfiniteScroll
          dataLength={blogs.length} //This is important field to render the next data
          next={fetchData}
          hasMore={props.allcount !== blogs.length}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          {blogs.map((blogItem, index) => {
            return (
              <div key={index} className={styles.blogItem}>
                <Link href={`/blogpost/${blogItem.slug}`}>
                  <h3>{blogItem.title}</h3>
                </Link>
                <p className={styles.blogItemP}>{blogItem.content}</p>
              </div>
            );
          })}
        </InfiniteScroll>
      </main>
    </div>
  );
};

// export async function getServerSideProps() {
//     // Fetch data from external API
//     const res = await fetch(`http://localhost:3000/api/blogs`);
//     const allBlogs = await res.json();

//     // Pass allBlogs to the page via props
//     return { props: { allBlogs } };
//   }

export async function getStaticProps() {
  // logic
  let data = await fs.promises.readdir("blogData");
  let myfile;
  let allcount = data.length
  let allBlogs = [];
  for (let index = 0; index < data.length; index++) {
    const item = data[index];
    console.log(item, "item");
    myfile = await fs.promises.readFile("blogData/" + item, "utf-8");
    allBlogs.push(JSON.parse(myfile));
  }

  // Pass allBlogs to the page via props
  return { props: { allBlogs,allcount } };
}

export default Blog;
