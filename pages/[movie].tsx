import { Data, PrismaClient } from "@prisma/client";
import { NextPage, GetStaticProps, GetStaticPaths } from "next";

interface Props {
  data: (Data & { content: { rendered: string } }) | null;
}

const SinglePost: NextPage<Props> = ({ data }) => {
  return (
    <div className="text-black text-center container px-5 mx-auto">
      <div
        dangerouslySetInnerHTML={{
          __html: data?.content?.rendered || "",
        }}
      />
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const prisma = new PrismaClient();
  const data: Data[] = await prisma.data.findMany({
    take: 20,
  });
  const paths = data.map(element => `/${element.slug}`);
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const prisma = new PrismaClient();
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
