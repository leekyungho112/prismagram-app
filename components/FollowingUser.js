import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { withNavigation } from "@react-navigation/compat";
import { Image, TouchableOpacity } from "react-native";
import styles from "../styles";
import UserCard from "./UserCard";


const Container = styled.View``;

const Stat = styled.View`
  align-items: center;
  
  
`;

const StatName = styled.Text`
  margin-top: 5px;
  font-size: 12px;
  color: ${styles.darkGreyColor};
`;

const Bold = styled.Text`
  font-weight: 600;
`;


const Follower =styled.View`
     margin-top: 10px;
     border: 1px solid ${styles.lightGreyColor};
`;




const FollowingUser= ({ 
    username,
    followingCount,
    following,
    navigation
    
}) => {
   return (
        <Container>
             <Stat>
                  <Bold>{followingCount}</Bold>
                  <StatName>팔로잉</StatName>
              </Stat>
            <TouchableOpacity onPress={()=> navigation.navigate("UserDetail",{username: username})} >
            <Follower>
                {following && 
                following.map(followings => (
                    <UserCard key={followings.id}
                    id={followings.id}
                    avatar={<Image style={{ height: 40, width: 40, borderRadius: 20, marginLeft: 5 }}
                     source={{ uri: followings.avatar }}/>}                     
                     username={followings.username}
                     isFollowing={followings.isFollowing}
                     isSelf={followings.isSelf}
                   />
                 ))}
            </Follower>
            </TouchableOpacity>
       </Container>
                 );
          };


  FollowingUser.propTypes={
    username: PropTypes.string.isRequired,
    followingCount: PropTypes.number.isRequired,
    following:PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            avatar: PropTypes.string,
            username: PropTypes.string.isRequired,
            isFollowing: PropTypes.bool.isRequired,
            isSelf: PropTypes.bool.isRequired
        })
    ).isRequired,
    id: PropTypes.string.isRequired


};


export default withNavigation(FollowingUser);