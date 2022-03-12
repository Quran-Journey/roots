import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

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
          Find the roots of every word in the quran.
        </p>

        <div className={styles.grid}>
          <a href="" className={styles.card}>
            <h2>Documentation &rarr;</h2>
            <p>View the source code and documentation for API endpoints.</p>
          </a>

          <a href="" className={styles.card}>
            <h2>Learn &rarr;</h2>
            <p>
              See how these root words can add a richer meaning to your
              understanding of each verse.
            </p>
          </a>

          <a
            href=""
            className={styles.card}
          >
            <h2>Contact Us &rarr;</h2>
            <p>Reach out to us if you have any general or development related questions.</p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="" // Need to add the main app url here 
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span>
            <Image src="/qjLogo.png" alt="Quran Journey" width={80} height={80} />
          </span>
        </a>
      </footer>
    </div>
  );
}
