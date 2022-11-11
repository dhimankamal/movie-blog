import { Data } from "@prisma/client";
import { GetServerSideProps } from "next";
import { getServerSideSitemap } from "next-sitemap";
import { prisma } from "../../db";

export const getServerSideProps:GetServerSideProps = async (ctx) => {
    const data: Data[] = await prisma.data.findMany();

  const newsSitemaps = data.map((item) => ({
    loc: `${process.env.NEXT_PUBLIC_DOMAIN_URL}${item.slug.toString()}`,
    lastmod: new Date().toISOString(),
  }));

  const fields = [...newsSitemaps];

  return getServerSideSitemap(ctx, fields);
};

export default function Site() {}
