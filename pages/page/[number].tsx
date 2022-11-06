import { Data } from "@prisma/client";
import { prisma } from '../../db'
import { NextPage, GetStaticProps, GetStaticPaths } from "next";
import MainPage from "../../components/MainPage";

interface Props {
  data: Data[];
}

const PageNumber: NextPage<Props> = ({ data }) => {
  return (
    <>
      <MainPage data={data} />
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const totalRecords: number = await prisma.data.count();
  const getTotalPages = Math.ceil(totalRecords / 8);
  const paths = Array.from(
    { length: getTotalPages },
    (_, index) => `/page/${String(index + 1)}`
  );
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  let skip = +(params?.number ? +params?.number - 1 : 0) * 8;
  const data: Data[] = await prisma.data.findMany({
    take: 8,
    skip,
  });
  return {
    props: { data },
  };
};

export default PageNumber;
