import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { Toolbar } from '../components/toolbar';
import { Footer } from '../components/toolbar';
import imageUrlBuilder from '@sanity/image-url';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';


export default function Home({ posts }) {
  const router = useRouter();
  const [mappedPosts, setMappedPosts] = useState([]);

  useEffect(() => {
    if (posts.length) {
      const imgBuilder = imageUrlBuilder({
        projectId: 'uwr0bcac',
        dataset: 'production',
      });

      setMappedPosts(
        posts.map(p => {
          return {
            ...p,
            mainImage: imgBuilder.image(p.mainImage).width(500).height(300),
          }
        })
      );
    } else {
      setMappedPosts([]);
    }
  }, [posts]);

  return (
    <div style={{ 
      backgroundImage: `url("https://i.pinimg.com/originals/a9/88/a4/a988a47e605cacc02b0bb41c85270de3.jpg")` 
    }} >
      <Toolbar />
      
      <div className={styles.main}>
        <h1>Football is Love</h1>

        <h3>Greatest of all times:</h3>
        
        <div className={styles.feed}>
          {mappedPosts.length ? mappedPosts.map((p, index) => (
            <div onClick={() => router.push(`/post/${p.slug.current}`)} key={index} className={styles.post}>
              <h3>{p.title}</h3>
              <img className={styles.mainImage} src={p.mainImage} />
            </div>
          )) : <>No Posts Yet</>}
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps = async pageContext => {
  const query = encodeURIComponent('*[ _type == "post" ]');
  const url = `https://uwr0bcac.api.sanity.io/v1/data/query/production?query=${query}`;
  const result = await fetch(url).then(res => res.json());

  if (!result.result || !result.result.length) {
    return {
      props: {
        posts: [],
      }
    }
  } else {
    return {
      props: {
        posts: result.result,
      }
    }
  }
};