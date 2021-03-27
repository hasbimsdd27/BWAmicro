import Head from "next/head";
import axios from "src/configs/axios";
import Circle from "public/images/circle-accents-1.svg";
import Header from "src/parts/Header";
import Hero from "src/parts/Hero";
import Clients from "src/parts/Clients";
import ListCourses from "src/parts/ListCourses";

function Home({ data }) {
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
            <Header />
            <Hero />
          </div>
        </section>
        <section className="container mx-auto pt-24">
          <Clients />
        </section>{" "}
        <section className="container mx-auto pt-24">
          <ListCourses data={data} />
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
