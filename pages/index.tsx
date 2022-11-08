import { Data } from "@prisma/client";
import { useRouter } from "next/router";
import { prisma } from "../db";
import { GetStaticProps, NextPage } from "next";
import MainPage from "../components/MainPage";
import Pagination from "../components/Pagination";
import Search from "../components/Search";
import { useEffect, useState } from "react";
interface Props {
  data: Data[];
}
const Home: NextPage<Props> = ({ data }) => {
  const router = useRouter();
  const [postData, setpostData] = useState(data);
  const { search, page } = router.query;

  const updatePosts = async () => {
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
    } catch (error) {
      setpostData(data);
      console.log("error", error);
    }
  };

  useEffect(() => {
    if (search || page) {
      updatePosts();
    } else {
      setpostData(data);
    }
  }, [search, page]);

  return (
    <div>
      <Search />
      <MainPage data={postData} />
      <Pagination />
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const data: Data[] = await prisma.data.findMany({
    take: 8,
  });
  return {
    props: { data },
  };
};

export default Home;
