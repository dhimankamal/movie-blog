import { Data } from "@prisma/client";
import { prisma } from '../db'
import { GetStaticProps, NextPage } from "next";
import MainPage from "../components/MainPage";
interface Props {
  data: Data[];
}
const Home: NextPage<Props> = ({ data }) => {
  return (
    <div>
      <MainPage data={data} />
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const data: Data[] = await prisma.data.findMany({
    take: 8,
  });
  return {
    props: { data },
  };
};

export default Home;
