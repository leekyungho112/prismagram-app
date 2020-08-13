import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import useInput from "../../hooks/useInput";
import { gql } from "apollo-boost";
import { Alert, Image, ActivityIndicator } from "react-native";
import styles from "../../styles";
import constants from "../../constants";
import { useMutation } from "react-apollo-hooks";
import { FEED_QUERY } from "../Tabs/Home";

const UPLOAD = gql`
   mutation upload($caption: String!, $location:String, $files: [String!]!){
    upload(caption: $caption, location:$location, files: $files){
      id
      caption
      location
    }
   }

`;


const View = styled.View`
 
  flex: 1;
`;
const Container = styled.View`
  padding: 20px;
  flex-direction: row;
`;

const Form = styled.View`
  justify-content: flex-start;
`;

const STextInput = styled.TextInput`
  margin-bottom: 10px;
  border: 0px solid ${styles.lightGreyColor};
  border-bottom-width: 1px;
  padding-bottom: 10px;
  width: ${constants.width - 180}px;
`;

const Button = styled.TouchableOpacity`
  background-color: ${props => props.theme.blueColor};
  padding: 10px;
  border-radius: 4px;
  align-items: center;
  justify-content: center;
`;

const Text = styled.Text`
  color: white;
  font-weight: 600;
`;

export default ({ navigation, route }) => {
    
      const [loading, setIsLoading] = useState(false);
      const photo = route.params.photo;
      const captionInput = useInput("");
      const locationInput = useInput("");
      const [uploadMutation] = useMutation(UPLOAD, {
          refetchQueries: () => [{ query: FEED_QUERY}]
        
      });
      
      
      
      const handleSubmit = async() => {
        if (captionInput.value === "" || locationInput.value === "") {
          Alert.alert("모든 항목을 기입해주세요");
        }
        const formData = new FormData();
        const name = photo.filename;
        const [, type] = name.split(".");
         formData.append("file", {
         name,
         type: "image/jpeg",
        uri: photo.uri
        });
      try {
      setIsLoading(true);
      const {
        data: { location }
      } = await axios.post("https://keanghogram-backend.herokuapp.com/", formData, {
        headers: {
          "content-type": "multipart/form-data"
        }
      });
      const {
        data: { upload }
      } = await uploadMutation({
        variables: {
          files: [location],
          caption: captionInput.value,
          location: locationInput.value
        }
      });
      if (upload.id) {
        navigation.navigate("Home");
      }
    } catch (e) {
      Alert.alert("업로드 할수 없습니다. 다시시도해주세요");
    }finally {
      setIsLoading(false);
    }
  };
 return(
  <View>
    <Container>
    <Image source={{uri: photo.uri}}
           style={{height:80, width:80, marginRight:30}} />
    <Form >
      <STextInput
      onChangeText={captionInput.onChange}
      value={captionInput.value}
      placeholder="문구입력.."
      multiline={true}
      placeholderTextColor={styles.darkGreyColor}
      />
      <STextInput
      onChangeText={locationInput.onChange}
      value={locationInput.value}
      placeholder="위치추가.."
      multiline={true}
      placeholderTextColor={styles.darkGreyColor}
      />
      <Button onPress={handleSubmit}>
          {loading ? (<ActivityIndicator color="white" />
          ) : (
            <Text>공 유</Text>
          )}

      </Button>
    
    </Form>
    </Container>
  </View>
 );
};