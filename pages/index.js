import Head from "next/head";
import Flyers from "../components/Flyers";
import Header from "../components/Header";
import algoliasearch from "algoliasearch/lite";
import { InstantSearch } from "react-instantsearch-dom";
import Modal from "../components/Modal";
import Script from "next/script";

export default function Home() {
  return (
    <div className="bg-main">
      <Head>
        <title>leaflets</title>
        <meta name="description" content="Leaflets app by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      {/* feed */}
      <Flyers />
      <Modal />
    </div>
  );
}
