import { Categories, Data } from "@prisma/client";
import { NextPage, GetStaticPaths, GetStaticProps } from "next";
import MainPage from "../../components/MainPage";
import { prisma } from "../../db";

interface Props {
  category: Categories;
  data: Data[];
}

const CategoriesGroup: NextPage<Props> = ({ category, data }) => {
  console.log("data", data);
  return (
    <div>
      <MainPage data={data} />
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const data: Categories[] = await prisma.categories.findMany();
  const paths = data.map(element => `/categories/${element.slug}`);
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const category: Categories | null = await prisma.categories.findUnique({
    where: {
      slug: String(params?.number) || "",
    },
  });
  const data: Data[] | null = await prisma.data.findMany({
    where: {
      categories: {
        array_contains: [category?.categorieid || ""],
      },
    },
  });

  return {
    props: {
      category,
      data,
    },
  };
};

export default CategoriesGroup;
