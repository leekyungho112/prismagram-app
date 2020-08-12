import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import styles from "../styles";
import { Image } from "react-native";
import { withNavigation } from "@react-navigation/compat";
const Container = styled.View``;

const NotifiContainer = styled.View`
    margin-top: 10px;
    border: 1px solid ${styles.lightGreyColor};
    
`;

const NotiCard =styled.View`
    flex-direction: row;
    padding: 10px;
`;

const Bold = styled.Text`
  font-weight: 500;
  padding-top: 10px;
`;

const Touchable = styled.TouchableOpacity``;

const NotiUser = styled.View`
    flex-direction: row;
`;
const NotiFile = styled.View`
      margin-left: 90px;
`;

const NoticeLike = ({
  
    data,
    navigation,
    id
 

  
}) => {

    return (
        <Container>
             
              
            <NotifiContainer>
                {data && data.map(likeuser =>(
                    <NotiCard
                    key={likeuser.id} 
                    >
                    <Touchable onPress={()=> navigation.navigate("UserDetail", {username:likeuser.user.username})} >
                   <NotiUser>
                   <Image
                     style={{ height: 40, width: 40, borderRadius: 20 }}
                     source={{ uri: likeuser.user.avatar }}
                     />
                   <Bold> {`${likeuser.user.username}님이 좋아요를 눌렀습니다.`}</Bold>
                   </NotiUser>
                   </Touchable>
                   <Touchable onPress={()=> navigation.navigate("Detail", {id:likeuser.post.id})} >
                   <NotiFile>
                    <Image
                    source={{ uri: likeuser.post.files[0].url }}
                    style={{height: 35, width: 35 }}
                    />
                    </NotiFile>
                   </Touchable>
                    </NotiCard>
                ))}
               
            </NotifiContainer>
        </Container>
    );



};

NoticeLike.propsTypes = {
    id: PropTypes.string.isRequired,
    user:PropTypes.shape({
        id: PropTypes.string.isRequired,
        avatar: PropTypes.string,
        username: PropTypes.string.isRequired
      }).isRequired,
    
    post: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            likeCount: PropTypes.number.isRequired,
            files: PropTypes.arrayOf(
                PropTypes.shape({
                  id: PropTypes.string.isRequired,
                  url: PropTypes.string.isRequired
                })
              ).isRequired,
        })
    ).isRequired  


};

export default withNavigation(NoticeLike);