import { Categories, Data } from "@prisma/client";
import { NextPage, GetStaticPaths, GetStaticProps } from "next";
import { prisma } from "../../db";

interface Props {
  category: Categories;
}

const CategoriesGroup: NextPage<Props> = ({ category }) => {
  console.log("category", category);
  return <div></div>;
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
//   const data: Data | null = await prisma.data.findMany({
//     where: {
//       categories:{
//         hasEvery
//       }
//     }
//   });
  return {
    props: {
      category,
    },
  };
};

export default CategoriesGroup;
