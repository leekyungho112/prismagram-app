import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { withNavigation } from "@react-navigation/compat";
import { Image } from "react-native";
import Comment from "./Comment";
import styles from "../styles";

const Container = styled.View`
    margin-bottom: 40px;
`;
const Header = styled.View`
  margin-top: 10px;
  flex-direction: row;

  
`;
const HeaderList = styled.View`

    padding-left: 10px;
`;
const Touchable = styled.TouchableOpacity`
    
`;

const Bold = styled.Text`
    font-weight: 600;
    margin-left: 5px;
    margin-top: 10px;
`;

const Caption = styled.Text`
    margin-top: 10px;
    margin-left: 5px;
`;
const CommentList = styled.View`
  margin-top: 10px;
  padding-vertical: 5px;
  border: 1px solid ${styles.lightGreyColor};
`;



const Text = styled.Text`
  
`;



const AllComment = ({
    
    user,
    comments = [],
    caption,
    navigation

 
}) => {

    
    return(
        <Container>
            <Header>
            <HeaderList>
            <Touchable  onPress={() =>
            navigation.navigate("UserDetail", { username: user.username })
          }>
             <Image
            style={{ height: 35, width: 35, borderRadius: 20, marginLeft: 10 }}
            source={{ uri: user.avatar }}
            />
            </Touchable>
            </HeaderList>
            <Bold>{user.username}</Bold>
            <Caption>{caption}</Caption>
            </Header>
          
            <CommentList>
               {comments.map(comment => (
                  <Comment key={comment.id}
                  user={<Image
                   style={{ height: 30, width: 30, borderRadius: 20, marginLeft: 5 }}
                   source={{ uri: user.avatar }}
                   />}                     
                   username={comment.user.username}
                       text={comment.text}
                  />
            ))}
           
            </CommentList>
            
        </Container>

    );


};

AllComment.propTypes = {
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
          avatar: PropTypes.string,
          username: PropTypes.string.isRequired
        }).isRequired
      })
    ).isRequired,
    caption: PropTypes.string.isRequired,
    location: PropTypes.string,
    createdAt: PropTypes.string.isRequired
  };

  export default withNavigation(AllComment);