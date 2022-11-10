// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import type { Data } from "@prisma/client";
import { prisma } from "../../db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data[]>
) {
  const { search, page } = req.body;

  let skip: number | undefined = undefined;

  if (page) {
    skip = +(page ? page - 1 : 0) * 8;
  }

  const data: Data[] = await prisma.data.findMany({
    take: 8,
    skip,
    orderBy: {
      date: 'desc',
    },
    where: {
      title: {
        contains: search,
      },
    },
  });
  res.status(200).json(data);
}
