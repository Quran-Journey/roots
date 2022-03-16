import Head from "next/Head";
import Image from "next/Image";
import styles from "../styles/Home.module.css";
import ChapterInput from "../components/chapterInput.js";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Quranic Root Words</title>
        <meta
          name="description"
          content="Roots of the arabic words in the quran."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Arabic Root Words in the Quran</h1>

        <p className={styles.description}>
          Find the root of any word in the quran.
        </p>

        <ChapterInput></ChapterInput>

      
      </main>

      <footer className={styles.footer}>
          <a href="" target="_blank" rel = "noreferrer">
            <Image src="/envelope-solid.svg" alt="Contact Us" width={20} height={20}/>
            <p>Contact Us</p>
          </a> 
        
        
					<a href="" target="_blank" rel = "noreferrer" >
            <Image src="/file-code-solid.svg" alt="Documentation" width={20} height={20}/>
            <p>Documentation</p>
          </a>
          
        <a
          href="" // Need to add the main app url here
          target="_blank"
          rel="noopener noreferrer">
        
          Powered by{" "}
          <span>
            <Image src="/qjLogo.png" alt="Quran Journey" width={80} height={80}/>
          </span>
        </a>  
       
      </footer>
    </div>
  );
}
