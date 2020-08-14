/* eslint-disable */
import React, { useEffect } from "react";
import { graphql } from "gatsby";
import { nanoid } from "nanoid";

import Layout from "../components/layout";
import Seo from "../components/seo";
import PostCard from "../components/post-card";
import Header from "../components/header";

import { useLocalStorage } from "../hooks/useLocalStorage";
import { UUID } from "../utils/constants";

const IndexPage = ({ data }) => {
  const { edges: posts } = data.allMdx;

  const [uuid, setUuid] = useLocalStorage(UUID, null);

  useEffect(() => {
    console.log("here");
    !uuid && setUuid(nanoid(23));
  }, []);

  return (
    <Layout>
      <Seo />
      <Header />
      <main className="index">
        <ul>
          {posts.map(({ node: post }) => (
            <li key={post.id}>
              <PostCard article={post} />
            </li>
          ))}
        </ul>
      </main>
    </Layout>
  );
};

export default IndexPage;

export const query = graphql`
  query blogIndex {
    allMdx(
      filter: { frontmatter: { draft: { ne: true } } }
      sort: { fields: [fields___date], order: DESC }
    ) {
      edges {
        node {
          id
          timeToRead
          frontmatter {
            title
            excerpt
            tags
            category
          }
          fields {
            slug
            date
          }
        }
      }
    }
  }
`;
