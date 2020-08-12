import React from "react";
import styled from "styled-components";
import FollowButton from "../components/FollowButton";
import { withNavigation } from "@react-navigation/compat";

const Container =styled.View``;

const UserList =styled.View`
    flex-direction: row;
`;

const UserAvatar =styled.View`
    padding: 5px;
`;
const Touchable = styled.TouchableOpacity``;

const Bold = styled.Text`
     font-weight: 600;
     margin-top: 15px;
`;



const UserCard= ({id, isSelf, avatar, username, isFollowing, navigation }) => {
    
    
    return(
      
   
    <Container>
      <UserList>
      <UserAvatar>{avatar}</UserAvatar>
      <Touchable onPress={()=> navigation.navigate("UserDetail",{username})}>
      <Bold>{username}</Bold>
      </Touchable>
        {!isSelf && <FollowButton id={id} isFollowing={isFollowing} />}
      </UserList>
    
  </Container>

    );

};

export default withNavigation(UserCard);