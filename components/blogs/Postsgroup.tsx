import { Data, PrismaClient } from "@prisma/client";
import { GetStaticProps, NextPage } from "next";
import Posts from "./Posts";

interface Props {
  data: Data[];
}

const Postsgroup: NextPage<Props> = ({ data }) => {
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap -m-4">
          {data &&
            data.map((element: Data) => (
              <Posts key={element.id} data={element} />
            ))}
        </div>
      </div>
    </section>
  );
};

export default Postsgroup;
