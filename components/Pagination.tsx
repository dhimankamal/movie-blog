import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";

interface Props {}

const Pagination: NextPage<Props> = ({}) => {
  const router = useRouter();
  const { number } = router.query;
  const getNextPageNumber = () => (number && +number > 0 ? +number + 1 : 2);
  return (
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
  );
};

export default Pagination;
