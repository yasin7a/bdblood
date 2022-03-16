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

// export async function getServerSideProps() {
//   const res = await fetch("http://localhost:4000/demoitem");
//   const data = await res.json();
//   return { props: { donorData: data } };
// }
