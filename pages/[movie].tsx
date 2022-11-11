import { Data } from "@prisma/client";
import { NextPage, GetStaticProps, GetStaticPaths } from "next";
import Search from "../components/Search";
import { prisma } from "../db";
//import { parse } from "node-html-parser";

interface Props {
  data: (Data & { content: { rendered: string } }) | null;
}

const SinglePost: NextPage<Props> = ({ data }) => {
  let getData: string = data?.content?.rendered || "";

  getData = getData.replaceAll(
    /MoviesVerse.net|MoviesVerse.com|MoviesFlixPro.Org|MoviesVerse.in/gi,
    "MovieBlocks.in"
  );

  // const doc = parse(getData);
  // let links = doc.getElementsByTagName("div");
  // console.log(links);

  return (
    <div className="text-black text-center container px-5 mx-auto space-y-4">
      <div className="border p-4">
        <h1 className="text-3xl font-bold ">{data?.title}</h1>
      </div>
      <div className="flex space-x-4">
        <div
          className="space-y-4 border p-4 post"
          dangerouslySetInnerHTML={{
            __html: getData || "",
          }}
        />
        <div className="w-2/5 border p-4 hidden lg:block">
         
        </div>
      </div>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const data: Data[] = await prisma.data.findMany();
  const paths = data.map(element => `/${element.slug}`);
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const data: Data | null = await prisma.data.findUnique({
    where: {
      slug: String(params?.movie),
    },
  });
  return {
    props: {
      data,
    },
  };
};

export default SinglePost;
