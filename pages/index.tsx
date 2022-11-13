import { Data } from "@prisma/client";
import { useRouter } from "next/router";
import { prisma } from "../db";
import { GetStaticProps, NextPage } from "next";
import MainPage from "../components/MainPage";
import Pagination from "../components/Pagination";
import Search from "../components/Search";
import { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import { NextSeo } from "next-seo";
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
    <>
      <NextSeo
        title={"Home - " + process.env.NEXT_PUBLIC_SITE_NAME}
        description={`Access largest movie collection with ${process.env.NEXT_PUBLIC_NAME} Now. Watch & download HD Movies, TV Shows.`}
        canonical={process.env.NEXT_PUBLIC_DOMAIN_URL}
        openGraph={{
          url: process.env.NEXT_PUBLIC_DOMAIN_URL,
          title:
            "Access largest movie collection - " +
            process.env.NEXT_PUBLIC_SITE_NAME,
          description: `Access largest movie collection with ${process.env.NEXT_PUBLIC_NAME} Now. Watch & download HD Movies, TV Shows.`,
          siteName: process.env.NEXT_PUBLIC_SITE_NAME,
        }}
      />

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
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  let data: Data[] = [];
  try {
    data = await prisma.data.findMany({
      take: 8,
      orderBy: {
        date: "desc",
      },
    });
  } catch (error) {
    console.log(error);
  }

  return {
    props: { data },
  };
};

export default Home;
