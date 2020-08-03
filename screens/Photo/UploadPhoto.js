import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import useInput from "../../hooks/useInput";
import { Alert, Image, ActivityIndicator } from "react-native";
import styles from "../../styles";
import constants from "../../constants";

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

export default ({  route }) => {
    
      const [loading, setIsLoading] = useState(false);
      const [fileUrl, setFileUrl] = useState("");
      const photo = route.params.photo;
      const captionInput = useInput("");
      const locationInput = useInput("");
      const handleSubmit = async() => {
        if (captionInput.value === "" || locationInput.value === "") {
          Alert.alert("모든 항목을 기입해주세요");
        }
        const formData = new FormData();
        const name = photo.filename;
        const [, type] = name.split(".");
         formData.append("file", {
         name,
         type: type.toLowerCase(),
        uri: photo.uri
        });
      try {
      const {
        data: { path }
      } = await axios.post("http://192.168.0.7:4000/api/upload", formData, {
        headers: {
          "content-type": "multipart/form-data"
        }
      });
      setFileUrl(path);
    } catch (e) {
      Alert.alert("Cant upload", "Try later");
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