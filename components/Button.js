import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import constants from "../constants";
import { ActivityIndicator } from "react-native";


const Touchable = styled.TouchableOpacity``;
const Container = styled.View`
  background-color: ${props =>
    props.bgColor ? props.bgColor : props.theme.lightGreyColor };
  padding: 10px;
  margin-top: 7px;
  margin-left: 150px;
  border-radius: 4px;
  width: ${constants.width / 3.4}px;
 

`;
const Text = styled.Text`
     color: white;
     text-align: center;
     font-weight: 600;
`;

const Button = ({text, onPress, loading= false, bgColor= null}) => (
    <Touchable disabled={loading} onPress={onPress}>
        <Container bgColor={bgColor}>
           {loading ? <ActivityIndicator color={"white"} /> :  <Text>{text}</Text> }
        </Container>        
    </Touchable>
);

Button.propTypes = {
    loading: PropTypes.bool,
    text: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired
};

export default Button;