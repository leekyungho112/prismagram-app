import React from "react";
import styled from "styled-components";
import { Ionicons } from "@expo/vector-icons";
import { Platform } from "@unimodules/core";


const Container = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 10px;
  margin-right: 10px;
`;


const Comments = styled.View`
flex-direction: row;
`;


const UserCard= styled.View`
  padding: 5px;

`;

const Bold = styled.Text`
  margin-right: 10px;
  margin-top: 10px;
  font-weight: 600;
`;

const Text = styled.Text`
   margin-right: 10px;
   margin-top: 10px;
`;

export default ({ writer, text , user =[] }) => (
 
 
 <Container>
      <Comments>
      <UserCard>{user}</UserCard>
      <Bold>{writer}</Bold>
      <Text>{text}</Text>
      </Comments>
      <Ionicons size={12}
      name={Platform.OS === "ios" ? "ios-heart-empty" : "md-heart-empty"}
      style={{marginTop:10}}
    />
  </Container>
 );
