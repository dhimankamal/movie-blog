import { Data } from "@prisma/client";
import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Postsgroup from "./blogs/Postsgroup";
import { useRouter } from "next/router";

interface Props {
  data: Data[];
}

const MainPage: NextPage<Props> = ({ data }) => {
  const router = useRouter();
  const { number } = router.query;
  const getNextPageNumber = () => (number && +number > 0 ? +number + 1 : 2);

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Postsgroup data={data} />
        <div className="flex justify-center items-center">
          <Link
            href={`/page/${getNextPageNumber()}`}
            className="inline-flex items-center py-2 px-4 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            Previous
          </Link>
          <Link
            href={`/page/${getNextPageNumber()}`}
            className="inline-flex items-center py-2 px-4 ml-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            Next
          </Link>
        </div>
      </main>
    </>
  );
};

export default MainPage;
