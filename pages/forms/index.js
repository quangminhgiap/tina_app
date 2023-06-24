import { Layout } from "../../components/Layout";
import Link from "next/link";
import { useTina } from "tinacms/dist/react";
import { client } from "../../tina/__generated__/client";
// import * as React from "react";

export default function FormList(props) {
  // data passes though in production mode and data is updated to the sidebar data in edit-mode
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });
  const formsList = data.formConnection.edges;
  return (
    <Layout>
      <h1 style={{ color: red }}>Forms</h1>
      <div>
        {formsList.map((form) => (
          <div key={form.node.id}>
            <Link href={`/forms/${form.node._sys.filename}`}>
              <a>{form.node._sys.filename}</a>
            </Link>
          </div>
        ))}
      </div>
    </Layout>
  );
}

export const getStaticProps = async () => {
  const { data, query, variables } = await client.queries.formConnection();

  return {
    props: {
      data,
      query,
      variables,
      //myOtherProp: 'some-other-data',
    },
  };
};
