import React, { useState } from "react";
import { ScrollView, RefreshControl } from "react-native";
import { gql } from "apollo-boost";
import { USER_FRAGMENT } from "../fragments";
import Loader from "../components/Loader";
import { useQuery } from "react-apollo-hooks";
import EditUsers from "../components/EditUsers";


export const ME = gql`
  {
    me {
      ...UserParts
    }
  }
  ${USER_FRAGMENT}
`;




export default ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  const { loading, data, refetch } = useQuery(ME);
  const onRefresh = async () => {
    try {
      setRefreshing(true);
      await refetch();
    } catch (e) {
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <ScrollView refreshControl={<RefreshControl onRefresh={onRefresh} refreshing={refreshing} />}>
      {loading ? <Loader /> : data && data.me && <EditUsers {...data.me} />}
    </ScrollView>
  );
};