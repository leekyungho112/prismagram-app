import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { gql } from "apollo-boost";
import { TouchableWithoutFeedback, Keyboard, Alert } from "react-native";
import { useMutation } from "react-apollo-hooks";
import AuthInput from "./AuthInput";
import useInput from "../hooks/useInput";
import AuthButton from "./AuthButton";

export const EDIT_PROFILE= gql`
 mutation editUser(
      $username: String
      $firstName: String 
      $lastName: String
      $bio: String
      
    ){
      editUser(
      username: $String
      firstName: $String 
      lastName: $String
      bio: $String
      ){
        username
      }
      
    }

`;


const View = styled.View`
    justify-content: center;
    align-items: center;
    flex: 1;
`;



const EditUsers  = ({
   username,
   firstName,
   lastName,
   bio,
   route,
   navigation
}) => {

  const fNameInput = useInput(firstName);
  const lNameInput = useInput(lastName);
  const usernameInput = useInput(username);
  const BioInput = useInput(bio);
  const [loading, setLoading] = useState(false);
  const [editUserMutation] = useMutation(EDIT_PROFILE,{
      variables: {
          username:usernameInput.value,
          firstName:fNameInput.value,
          lastName:lNameInput.value,
          bio:BioInput.value
      }
  });
  const editsignup = async() =>{
    const { value: uname } = usernameInput;
    const { value: fName } = fNameInput;
    const { value: lName } = lNameInput;
    const { value: bio } = BioInput;

    if(fName === ""){
        return Alert.alert("성을 입력해 주세요.");
    }
    if(lName === ""){
        return Alert.alert("이름을 입력해주세요");
    } 
    if(uname === ""){
        return Alert.alert("사용자이름을 입력해주세요.");
    }
    try {
        setLoading(true);
        const { 
            data : { editUser }
        } = await editUserMutation();
        if(editUser){
            Alert.alert("프로필 수정 완료");
            navigation.navigate("Home");
        }
    } catch (e) {
        Alert.alert("변경할수 없습니다.");
        console.log(e);
    }finally{
        setLoading(false);
    }
    
};
return(
        
  <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
  <View>

  <AuthInput
   {...fNameInput} 
   placeholder="성"
   autoCapitalize="words"
 
   />
  <AuthInput
   {...lNameInput} 
   placeholder="이름"
   autoCapitalize="words"
   />
  <AuthInput
   {...usernameInput}
   placeholder="사용자이름"
   autoCorrect={false}/>
   <AuthInput
   {...BioInput} 
   placeholder="소개"
   autoCorrect={false}/>
  <AuthButton 
  loading={loading} 
  onPress={editsignup} 
  text="완료" />
  </View>
  </TouchableWithoutFeedback>
 
);

};

EditUsers.propTypes = {
  
  username: PropTypes.string.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  bio: PropTypes.string.isRequired
  
  
  
};
 


export default EditUsers;