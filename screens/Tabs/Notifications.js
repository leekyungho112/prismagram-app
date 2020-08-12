import  React, { useState } from "react";
import styled from "styled-components";
import {gql} from "apollo-boost";
import { useQuery } from "react-apollo-hooks";
import { ScrollView, RefreshControl } from "react-native";
import Loader from "../../components/Loader";
import NoticeLike from "../../components/NoticeLike";
import { USER_FRAGMENT } from "../../fragments";


export const SEE_LIKE = gql`
{
    seeLike {
      id
      user {
        id
        username
        avatar
      }
      post {
        id
        likeCount
        files{
          id
          url
        }
      }
    }
  }
  
  



`;




export default ({}) => {
  const [refreshing, setRefreshing] = useState(false);
  const {loading, data,  refetch } = useQuery(SEE_LIKE);

  const onRefresh = async () => {
    try {
      setRefreshing(true);
      await refetch();
    } catch (e) {
    } finally {
      setRefreshing(false);
    }
  };

  return(
    <ScrollView  refreshControl={<RefreshControl onRefresh={onRefresh} refreshing={refreshing} />} >
      {loading ? <Loader /> : data && data.seeLike && <NoticeLike data={data.seeLike} />  }
    </ScrollView>
  )

};