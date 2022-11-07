import { Categories, Data } from "@prisma/client";
import { prisma } from "../db";
import { GetStaticProps, NextPage } from "next";
import MainPage from "../components/MainPage";
import Pagination from "../components/Pagination";
import Search from "../components/Search";
interface Props {
  data: Data[];
}
const Home: NextPage<Props> = ({ data }) => {
  return (
    <div>
      <Search />
      <MainPage data={data} />
      <Pagination />
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const data: Data[] = await prisma.data.findMany({
    take: 8
  });
  return {
    props: { data },
  };
};

export default Home;
