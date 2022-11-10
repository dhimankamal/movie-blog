import { Data } from "@prisma/client";
import { NextPage, GetStaticProps, GetStaticPaths } from "next";
import { prisma } from "../db";
import { parse } from 'node-html-parser';

interface Props {
  data: (Data & { content: { rendered: string } }) | null;
}

const SinglePost: NextPage<Props> = ({ data }) => {
  let getData: string = data?.content?.rendered || ''

  const doc = parse(getData);
  let links = String(doc.getElementsByTagName('div'));
  console.log(links);

  return (
    <div className="text-black text-center container px-5 mx-auto">
      <h1 className="text-3xl font-bold">{data?.title}</h1>
      <div
        dangerouslySetInnerHTML={{
          __html: links || "",
        }}
      />
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
