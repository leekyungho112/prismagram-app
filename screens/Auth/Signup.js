import React, {useState} from "react";
import styled from "styled-components";
import AuthButton from "../../components/AuthButton";
import AuthInput from "../../components/AuthInput";
import useInput from "../../hooks/useInput";
import { Alert,TouchableWithoutFeedback, Keyboard } from "react-native";
import { useMutation } from "react-apollo-hooks";
import * as Facebook from 'expo-facebook';
import * as Google from 'expo-google-app-auth';
import { LOG_IN, CREATE_ACCOUNT } from "./AuthQueres";

const View = styled.View`
    justify-content: center;
    align-items: center;
    flex: 1;
`;

const FBContainer = styled.View`
  margin-top: 25px;
  padding-top: 25px;
  border-top-width: 1px;
  border-color: ${props => props.theme.lightGreyColor};
  border-style: solid;
`;

const GoolgeContainer = styled.View`
    margin-top: 20px;
`;

export default ({route,navigation}) =>{
    const fNameInput = useInput("");
    const lNameInput = useInput("");
    const emailInput = useInput(route.params ? route.params.email : "");
    const usernameInput = useInput("");
    const [loading, setLoading] = useState(false);
    const [createAccountMutation] = useMutation(CREATE_ACCOUNT,{
        variables:{
            username: usernameInput.value,
            firstName: fNameInput.value,
            email: emailInput.value,
            lastName: lNameInput.value

        }
    });
    const handleSignup = async() => {
        const { value: email } = emailInput;
        const { value: fName } = fNameInput;
        const { value: lName } = lNameInput;
        const { value: username } = usernameInput;



        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(!emailRegex.test(email)){
            return Alert.alert("정확한 이메일을 적어주세요.");
        }
        if(fName === ""){
            return Alert.alert("성을 입력해 주세요.");
        }
        if(username === ""){
            return Alert.alert("닉네임을 기입해주세요.");
        }
        try {
            setLoading(true);
            const {
                data: { createAccount }
              } = await createAccountMutation();
              if (createAccount) {
                Alert.alert("계정생성 완료!", "Log in now!");
                navigation.navigate("Login", { email });
              }
        } catch (e) {
            console.log(e);
            Alert.alert("사용중인 이메일/닉네임입니다");
            navigation.navigate("Login", { email });
        }finally{
            setLoading(false);
        }

    };

    const fbLogin = async () => {
        try{
            setLoading(true);
            await Facebook.initializeAsync('330822494896159');
            const {type,token} = await Facebook.logInWithReadPermissionsAsync({
                permissions: ['public_profile', "email"],
            });
            if (type === 'success') {
                const response = await fetch(`https://graph.facebook.com/me?access_token=${token}&fields=id,last_name,first_name,email`);
                const {email, first_name, last_name} = await response.json();
                updateFormData(email, first_name, last_name);
                setLoading(false);
              } else {
             
              }
            } catch ({ message }) {
              alert(`Facebook Login Error: ${message}`);
            }         
    };
    const googleLogin = async () => {
        const GOOGLE_ID = "648937580389-a7v7fj3ofk07ae0kpohikl26br478fk2.apps.googleusercontent.com";
        try {
            setLoading(true);
            const result = await Google.logInAsync({
                iosClientId: GOOGLE_ID,
                scopes: ['profile', 'email']
              });
              if (result.type === 'success') {
                const user = await fetch("https://www.googleapis.com/userinfo/v2/me", {
                 headers: { Authorization: `Bearer ${result.accessToken}` }
             }); 
             const { email, family_name, given_name } = await user.json();
             updateFormData(email, given_name, family_name);
             } else {
             return { cancelled: true };
           }
        } catch (e) {
            console.log(e);
        }finally{
            setLoading(false);
        }
    };
    const updateFormData = (email, firstName, lastName) => {
        emailInput.setValue(email);
        fNameInput.setValue(firstName);
        lNameInput.setValue(lastName);
        const [username] = email.split("@");
        usernameInput.setValue(username);
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
         {...emailInput} 
         placeholder="이메일"
         keyboardType="email-address"
         autoCorrect={false}/>
         <AuthInput
         {...usernameInput} 
         placeholder="닉네임"
         autoCorrect={false}/>
        <AuthButton 
        loading={loading} 
        onPress={handleSignup} 
        text="회원가입" />
        <FBContainer>
            <AuthButton 
            bgColor={"#2D4DA7"}
            loading={false} 
            onPress={fbLogin} 
            text="페이스북으로 가입" />
        </FBContainer>
        <GoolgeContainer>
            <AuthButton 
            bgColor={"#EE1922"}
            loading={false} 
            onPress={googleLogin}
            text="구글로 가입" 
            />
        </GoolgeContainer>
        </View>
        </TouchableWithoutFeedback>
       
   );


} ;
