import { Data } from "@prisma/client";
import { useRouter } from "next/router";
import { prisma } from "../db";
import { GetStaticProps, NextPage } from "next";
import MainPage from "../components/MainPage";
import Pagination from "../components/Pagination";
import Search from "../components/Search";
import { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
interface Props {
  data: Data[];
}
const Home: NextPage<Props> = ({ data }) => {
  const router = useRouter();
  const [postData, setpostData] = useState(data);
  const [loading, setLoading] = useState(true);
  const { search, page } = router.query;

  const updatePosts = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ search, page }),
      });

      const postDataRes = await res.json();
      if (postDataRes) setpostData(postDataRes);
      setLoading(false);
    } catch (error) {
      setpostData(data);
      setLoading(false);
      console.log("error", error);
    }
  };

  useEffect(() => {
    if (search || page) {
      updatePosts();
    } else {
      setpostData(data);
      setLoading(false);
    }
  }, [search, page]);

  return (
    <div className="space-y-4 mx-4">
      <Search />
      <div className="border container mx-auto py-4 md:p-10">
        {loading ? (
          <div className="flex justify-center items-center">
            <Spinner />
          </div>
        ) : (
          <>
            <MainPage data={postData} />
            <Pagination />{" "}
          </>
        )}
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const data: Data[] = await prisma.data.findMany({
    take: 8,
    orderBy: {
      date: "desc",
    },
  });
  return {
    props: { data },
  };
};

export default Home;
