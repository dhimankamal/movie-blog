import { Categories, Data } from "@prisma/client";
import { prisma } from '../db'
import { GetStaticProps, NextPage } from "next";
import MainPage from "../components/MainPage";
interface Props {
  data: Data[];
  category: Categories[]
}
const Home: NextPage<Props> = ({ data,category }) => {
  return (
    <div>
      <MainPage data={data} category={category} />
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const data: Data[] = await prisma.data.findMany({
    take: 8,
  });
  const category = await prisma.categories.findMany()
  return {
    props: { data, category },
  };
};

export default Home;
