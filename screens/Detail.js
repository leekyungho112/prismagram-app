import React from "react";
import { useQuery } from "react-apollo-hooks";
import styled from "styled-components";
import { gql } from "apollo-boost";
import { POST_FRAGMENT } from "../fragments";
import Loader from "../components/Loader";
import Post from "../components/Post";
import { ScrollView } from "react-native";

const POST_DETAIL= gql`
  query seeFullPost($id: String!) {
    seeFullPost(id: $id) {
      ...PostParts
    }
  }
  ${POST_FRAGMENT}
`;

const View = styled.View``;




export default ({ route,navigation }) => {
    const { loading, data } = useQuery(POST_DETAIL, {
        variables: { id: route.params.id }
      });

      return (
        
        <ScrollView>
          {loading ? (
            <Loader />
          ) : (
            data && data.seeFullPost && <Post {...data.seeFullPost} />
          )}
        </ScrollView>
        
      );
};