// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import type { Data } from "@prisma/client";
import { prisma } from "../../db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data[]>
) {
  const { search } = req.body;

  const data: Data[] = await prisma.data.findMany({
    take: 8,
    where: {
      title: {
        contains: search,
      },
    },
  });
  res.status(200).json(data);
}
