import { NextPage } from "next";
import Posts from "./Posts";

interface Props {}

const Postsgroup: NextPage<Props> = ({}) => {
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap -m-4">
          <Posts />
          <Posts />
          <Posts />
          <Posts />
          <Posts />
          <Posts />
        </div>
      </div>
    </section>
  );
};

export default Postsgroup;
