import Head from "next/head";
import Homes from "../components/Homes";

export default function Home({ donorData }) {
  return (
    <>
      <Head>
        <title>Blood Connection</title>
      </Head>

      <Homes donorData={donorData} />
    </>
  );
}
