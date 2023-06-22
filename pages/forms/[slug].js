import { Layout } from "../../components/Layout";
import { useTina } from "tinacms/dist/react";
import { client } from "../../tina/__generated__/client";
import * as React from "react";

export default function Home(props) {
  // data passes though in production mode and data is updated to the sidebar data in edit-mode
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  return (
    // <Layout>
    //   {/* <code>
    //     <pre
    //       style={{
    //         backgroundColor: "lightgray",
    //       }}
    //     >
    //       {JSON.stringify(data.form, null, 2)}
    //     </pre>
    //   </code> */}
    // </Layout>

    <div className="relative flex flex-col flex-wrap py-8 px-8 lg:px-12 2xl:px-16 mx-auto md:items-center md:flex-row">
      <form className="w-full max-w-sm">
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
              Full Name
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              className="bg-gray-200 w-full py-2 px-4 text-gray-700 leading-tight"
              id="inline-full-name"
              type="text"
            />
          </div>
        </div>
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
              Password
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              className="bg-gray-200 w-full py-2 px-4 text-gray-700 leading-tight"
              id="inline-password"
              type="password"
            />
          </div>
        </div>
      </form>
    </div>
  );
}

export const getStaticPaths = async () => {
  const { data } = await client.queries.formConnection();
  const paths = data.formConnection.edges.map((x) => {
    return { params: { slug: x.node._sys.filename } };
  });

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps = async (ctx) => {
  const { data, query, variables } = await client.queries.form({
    relativePath: ctx.params.slug + ".md",
  });

  return {
    props: {
      data,
      query,
      variables,
    },
  };
};
