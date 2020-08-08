import React from "react";
import { useQuery } from "react-apollo-hooks";
import styled from "styled-components";
import { gql } from "apollo-boost";
import Loader from "../components/Loader";
import { ScrollView } from "react-native";
import AllComment from "../components/AllComment";
import { POST_FRAGMENT } from "../fragments";

const COMMENT_DETAIL= gql`
 query seeFullPost($id: String!) {
      seeFullPost(id: $id) {
        ...PostParts
      }
  }
  ${POST_FRAGMENT}
`;

const View = styled.View``;




export default ({ route,navigation }) => {
    const { loading, data } = useQuery(COMMENT_DETAIL, {
        variables: { id: route.params.id }
      });

      return (
        
        <ScrollView>
          {loading ? (
            <Loader />
          ) : (
            data && data.seeFullPost && <AllComment {...data.seeFullPost}  />
          )}
        </ScrollView>
        
      );
};