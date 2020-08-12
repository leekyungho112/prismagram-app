import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { withNavigation } from "@react-navigation/compat";
import { Image, TouchableOpacity } from "react-native";
import styles from "../styles";
import UserCard from "./UserCard";
import FollowButton from "../components/FollowButton";

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




const FollowerUser= ({ 
    username,
    followersCount,
    followers,
    navigation
    
}) => {
   return (
        <Container>
              <Stat>
                  <Bold>{followersCount}</Bold>
                  <StatName>팔로워</StatName>
              </Stat>
              <TouchableOpacity onPress={()=> navigation.navigate("UserDetail",{username: username})} >
            <Follower>
                {followers && 
                followers.map(follower => (
                    <UserCard key={follower.id}
                    id={follower.id}
                    avatar={<Image style={{ height: 40, width: 40, borderRadius: 20, marginLeft: 5 }}
                     source={{ uri: follower.avatar }}/>}  
                     username={follower.username}
                     isFollowing={follower.isFollowing}
                     isSelf={follower.isSelf}
                   />
                 ))}
            </Follower>
                    </TouchableOpacity>
       </Container>
                 );
          };


FollowerUser.propTypes={
    username: PropTypes.string.isRequired,
    followersCount: PropTypes.number.isRequired,
    followers:PropTypes.arrayOf(
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


export default withNavigation(FollowerUser);