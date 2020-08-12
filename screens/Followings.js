import  React, { useState } from "react";
import {gql} from "apollo-boost";
import { useQuery } from "react-apollo-hooks";
import { ScrollView, RefreshControl } from "react-native";
import Loader from "../components/Loader";
import FollowingUser from "../components/FollowingUser";
import { USER_FRAGMENT } from "../fragments";



const FOLLOWING = gql`
   query seeUser($username: String!) {
    seeUser(username: $username) {
      ...UserParts
    }
  }
  ${USER_FRAGMENT}
`;


export default ({route}) => {
  const [refreshing, setRefreshing] = useState(false);
  const { loading, data, refetch } = useQuery(FOLLOWING, {
    variables: { username: route.params.username }
    
  });
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
      {loading ? (<Loader />) : (data && data.seeUser && <FollowingUser {...data.seeUser}  />)}
    </ScrollView>
  );


};