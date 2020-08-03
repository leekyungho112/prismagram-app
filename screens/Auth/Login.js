import React, {useState} from "react";
import styled from "styled-components";
import AuthButton from "../../components/AuthButton";
import AuthInput from "../../components/AuthInput";
import useInput from "../../hooks/useInput";
import { Alert,TouchableWithoutFeedback, Keyboard } from "react-native";
import { useMutation } from "react-apollo-hooks";
import { LOG_IN } from "./AuthQueres";

const View = styled.View`
    justify-content: center;
    align-items: center;
    flex: 1;
`;



export default ({route, navigation}) =>{
    const emailInput = useInput(route.params ? route.params.email : "");
    const [loading, setLoading] = useState(false);
    const [requestSecretMutation] = useMutation(LOG_IN,{
        variables : {
            email: emailInput.value
        }
    });
    const handleLogin = async() => {
        const { value } = emailInput;
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(value === ""){
            return Alert.alert("입력란이 비어 있습니다.");
        } else if(!value.includes("@") || !value.includes(".")){
            return Alert.alert("올바른 이메일을 적어 주세요.");
        }else if(!emailRegex.test(value)){
            return Alert.alert("정확한 이메일을 적어주세요.");
        }
        try {
            setLoading(true);
          const{
              data: {requestSecret}
          } =  await requestSecretMutation();
          if (requestSecret) {
            Alert.alert("이메일을 확인해 주세요!");
            navigation.navigate("Confirm", { email: value});
            return;
        }else {
            Alert.alert("계정 정보가 없습니다.");
            navigation.navigate("Signup",);
        }

        } catch (e) {
            console.log(e);
            Alert.alert("로그인 할 수 없습니다.");
        }finally{
            setLoading(false);
        }

    };
    return(
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
        <AuthInput
         {...emailInput} 
         placeholder="Email"
         keyboardType="email-address"
         returnKeyType="send"
         onSubmitEditing={handleLogin}
         autoCorrect={false}/>
        <AuthButton loading={loading} onPress={handleLogin} text="로그인" />
        </View>
        </TouchableWithoutFeedback>
   );


} ;