import Head from "next/head";
import axios from "src/configs/axios";
import Circle from "public/images/circle-accents-1.svg";
import Header from "src/parts/header";

function Home(data) {
  return (
    <>
      <Head>
        <title>BWAMICRO</title>
      </Head>

      <main>
        <section className="header-clipping pt-10">
          <Circle className="absolute left-0 bottom-0"></Circle>
          <div className="sunshine"></div>
          <div className="container mx-auto">
            <Header></Header>
          </div>
        </section>
      </main>
    </>
  );
}

Home.getInitialProps = async () => {
  try {
    const { data } = await axios.get(`/courses`);
    return { data };
  } catch (error) {
    return error;
  }
};

export default Home;
