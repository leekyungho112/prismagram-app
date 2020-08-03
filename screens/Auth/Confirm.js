import React, {useState} from "react";
import styled from "styled-components";
import AuthButton from "../../components/AuthButton";
import AuthInput from "../../components/AuthInput";
import useInput from "../../hooks/useInput";
import { Alert,TouchableWithoutFeedback, Keyboard } from "react-native";
import { useMutation } from "react-apollo-hooks";
import { LOG_IN, CONFIRM_SECRET } from "./AuthQueres";
import { useLogIn } from "../../AuthContext";

const View = styled.View`
    justify-content: center;
    align-items: center;
    flex: 1;
`;



export default ({route ,navigation}) =>{
    const confirmInput = useInput("");
    const logIn = useLogIn();
    const [loading, setLoading] = useState(false);
    const [confirmSecretMutation] = useMutation(CONFIRM_SECRET,{
        variables: {
            secret: confirmInput.value,
            email: route.params.email
        }
    })
    const handleConfirm = async() => {
        const { value } = confirmInput;
        if(value === "" || !value.includes(" ")){
            return Alert.alert("인증문자를 다시 확인해주세요.");
        }
        try {
            setLoading(true);
            const{
                data: { confirmSecret }
            } = await confirmSecretMutation();
            if(confirmSecret !== "" || confirmSecret !== false){
                logIn(confirmSecret);
            }
        } catch (e) {
            console.log(e);
            Alert.alert("인증 할 수 없습니다.");
        }finally{
            setLoading(false);
        }

    };
    return(
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
        <AuthInput
         {...confirmInput} 
         placeholder="Secret"
         returnKeyType="send"
         onSubmitEditing={handleConfirm}
         autoCorrect={false}
         secureTextEntry={true}/>
        <AuthButton loading={loading} onPress={handleConfirm} text="인증" />
        </View>
        </TouchableWithoutFeedback>
   );


} ;