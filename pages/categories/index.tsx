import { Categories } from "@prisma/client";
import { NextPage, GetStaticProps } from "next";
import Link from "next/link";
import { prisma } from "../../db";

interface Props {
  category: Categories[];
}

const Categories: NextPage<Props> = ({ category }) => {
  return (
    <div className="text-black container mx-auto text-center">
      <div className="py-10">
        <h3 className="text-4xl font-extrabold">Categories</h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 justify-center px-4">
        {category &&
          category.map(element => (
            <Link
              key={element.categorieid}
              href={"categories/" + element.slug}
              className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg"
            >
              {element.name}
            </Link>
          ))}
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async ctx => {
  const category = await prisma.categories.findMany();
  return {
    props: { category },
  };
};

export default Categories;
