import React, { useState } from "react";
import { Image, Platform, View } from "react-native";
import styled from "styled-components";
import { Ionicons } from "@expo/vector-icons";
import PropTypes from "prop-types";
import Swiper from "react-native-swiper";
import { gql } from "apollo-boost";
import constants from "../constants";
import styles from "../styles";
import { useMutation } from "react-apollo-hooks";
import { withNavigation } from "@react-navigation/compat";
import Comment from "./Comment";



export const TOGGLE_LIKE = gql`
mutation toggelLike($postId: String!) {
  toggleLike(postId: $postId)
}
`;

const Container = styled.View`
    margin-bottom: 40px;
`;
const Header = styled.View`
  padding: 15px;
  flex-direction: row;
  align-items: center;
`;
const Touchable = styled.TouchableOpacity``;
const HeaderUserContainer = styled.View`
  margin-left: 10px;
`;
const Bold = styled.Text`
  font-weight: 500;
`;
const Location = styled.Text`
  font-size: 12px;
`;
const IconsContainer = styled.View`
   flex-direction: row;
   margin-bottom: 5px;
`;
const IconContainer = styled.View`
  margin-right: 10px;
`;
const InfoContainer = styled.View`
    padding: 10px;
`;
const CommentList = styled.View`
margin-right: 10px;
`;

const Caption = styled.Text`
    margin: 5px 0px;
`;

const CommentCount = styled.Text`
    margin-top: 3px;
    opacity: 0.5;
    font-size: 13px;
`;



const Post = ({ 
    id,
    user,
    location, 
    files = [], 
    likeCount: likeCountProp, 
    caption, 
    comments = [],
    isLiked: isLikedProp,
    navigation 
    }) => {
        const [isLiked, setIsLiked] = useState(isLikedProp);
        const [likeCount, setLikeCount] = useState(likeCountProp);
        const [toggelLikeMutation] = useMutation(TOGGLE_LIKE, {
            variables: {
                postId: id
            }
        });
        const handleLike = async() => {
            if (isLiked === true) {
                setLikeCount(l => l - 1);
              } else {
                setLikeCount(l => l + 1);
              }
              setIsLiked(p => !p);
            try{
                await toggelLikeMutation();
                
            }catch(e){
              
            }
                     
        }; 
  return (
    <Container>
      <Header>
        <Touchable  onPress={() =>
            navigation.navigate("UserDetail", { username: user.username })
          }>
          <Image
            style={{ height: 40, width: 40, borderRadius: 20 }}
            source={{ uri: user.avatar }}
          />
        </Touchable>
        <Touchable onPress={() =>
            navigation.navigate("UserDetail", { username: user.username })
          }>
          <HeaderUserContainer>
            <Bold>{user.username}</Bold>
            <Location>{location}</Location>
          </HeaderUserContainer>
        </Touchable>
      </Header>
      <Swiper
        style={{ height: constants.height / 2.5 }}
        dot={
            <View
              style={{
                backgroundColor: '#e6e3e4',
                width: 7,
                height: 7,
                borderRadius: 6,
                marginLeft: 6,
                marginRight: 6
              }}
            />
          }
          activeDot={
            <View
              style={{
                backgroundColor: '#5e5f66',
                width: 7,
                height: 7,
                borderRadius: 6,
                marginLeft: 6,
                marginRight: 6
              }}
            />
          }
          paginationStyle={{
            bottom: -25
          }}
          loop={false}
      >
        {files.map(file => (
          <Image
            style={{ width: constants.width, height: constants.height / 2.5 }}
            key={file.id}
            source={{ uri: file.url }}
           />
        ))}
      </Swiper>
      <InfoContainer>
      <IconsContainer>
          <Touchable onPress={handleLike} >
              <IconContainer>
              <Ionicons size={24}
              color={isLiked ? styles.redColor : styles.blackColor}
              name={ Platform.OS === "ios"
              ? isLiked
                ? "ios-heart"
                : "ios-heart-empty"
              : isLiked
              ? "md-heart"
              : "md-heart-empty"} />
              </IconContainer>  
          </Touchable>
          <Touchable onPress={()=> navigation.navigate("Comments",{id : id})}>
              <IconContainer>
              <Ionicons size={24}
              color={styles.blackColor} 
              name={Platform.OS === "ios" ? "ios-text" : "md-text"
              } />
              </IconContainer>  
          </Touchable>
      </IconsContainer>
        <Touchable><Bold>{likeCount === 1 ? "좋아요 1 " : `좋아요 ${likeCount} 개 ` }</Bold></Touchable>
            <Touchable>
             <Caption><Bold>{user.username}</Bold> {caption}</Caption>
            </Touchable>
            <Touchable onPress={()=> navigation.navigate("Comments",{id : id})} >
               <CommentCount>
                    댓글 {comments.length}개 보기
               </CommentCount>
             <CommentList> 
            {comments.slice(0,1).map(comment => (
                <Comment key={comment.id}
                text={comment.text}
                username={comment.user.username} />
            ))}
            </CommentList> 
            </Touchable>   
         
       </InfoContainer>
    </Container>
  );
};

Post.propTypes = {
  id: PropTypes.string.isRequired,
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    avatar: PropTypes.string,
    username: PropTypes.string.isRequired
  }).isRequired,
  files: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired
    })
  ).isRequired,
  likeCount: PropTypes.number.isRequired,
  isLiked: PropTypes.bool.isRequired,
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      user: PropTypes.shape({
        id: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired
      }).isRequired
    })
  ).isRequired,
  caption: PropTypes.string.isRequired,
  location: PropTypes.string,
  createdAt: PropTypes.string.isRequired
};

export default withNavigation(Post);