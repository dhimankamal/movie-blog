import { NextPage } from "next";
//import Link from "next/link";
import { useRouter } from "next/router";

interface Props {}

const Pagination: NextPage<Props> = ({}) => {
  const router = useRouter();
  const { page } = router.query;

  const getNextPageNumber = () => (page && +page > 0 ? +page + 1 : 2);
  const previousPage = () => {
    router.push({
      query: { ...router.query, page: getNextPageNumber() - 2 },
    });
  };
  const nextPage = () => {
    router.push({
      query: { ...router.query, page: getNextPageNumber() },
    });
  };

  return (
    <div className="flex justify-center items-center">
      <button
        disabled={Number(page) == 1 || !page}
        onClick={previousPage}
        className="inline-flex items-center py-2 px-4 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
      >
        Previous
      </button>
      <button
        onClick={nextPage}
        className="inline-flex items-center py-2 px-4 ml-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
