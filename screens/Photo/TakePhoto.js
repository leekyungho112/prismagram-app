import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { Camera } from "expo-camera";
import * as Permissions from 'expo-permissions';
import * as MediaLibrary from 'expo-media-library';
import Loader from "../../components/Loader";
import constants from "../../constants";
import { TouchableOpacity, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "../../styles";

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;
const Icon = styled.View``;

const Button = styled.View`
  width: 80px;
  height: 80px;
  border-radius: 40px;
  border: 10px solid ${styles.darkGreyColor};

`;

export default ({ navigation }) => {
    const cameraRef = useRef();
    const [canTakePhoto, setCanTakePhoto] = useState(true);
    const [loading, setLoading] = useState(true);
    const [hasPermission, setHasPermission] = useState(false);
    const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
    const takePhoto = async() => {
      if(!canTakePhoto){
        return;
      }
        try{
          const {uri} = await cameraRef.current.takePictureAsync({
          quality : 1
          
        });
        const asset = await MediaLibrary.createAssetAsync(uri);
        navigation.navigate("UploadPhoto", {photo: asset});
    }catch(e){
      console.log(e);
      setCameraType(true);
    }
  };
    const askPermission = async() => {
      try {

        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        if(status === "granted" ){
          setHasPermission(true);
          
        }
        
      } catch (e) {
        console.log(e);
        setHasPermission(false);
      }finally{
        setLoading(false);
      }
      
    };
    const toggleType = () => {
      if(cameraType === Camera.Constants.Type.back){
          setCameraType(Camera.Constants.Type.front);
      } else {
          setCameraType(Camera.Constants.Type.back);
      }
    };
    useEffect(() => {
      askPermission();

    }, [] );
 
    return ( 
      <View>
        {loading ? ( <Loader /> ) : hasPermission ? (
         <> 
        <Camera 
        ref={cameraRef}
        type={cameraType}
        style={{
                 justifyContent: "flex-end",
                 padding: 15,
                 width: constants.width ,
                 height:constants.height / 2}} > 
          <TouchableOpacity onPress={toggleType}>
             <Icon>
               <Ionicons name={Platform.OS === "ios" ? "ios-sync"
                    : "md-sync" } size={32} color={"white"} />
             </Icon> 
          </TouchableOpacity>        
         </Camera> 
         <View>
           <TouchableOpacity onPress={takePhoto} disabled={!canTakePhoto}>
             <Button />
             </TouchableOpacity>    
         </View>
         </>  
         ) : null }
      </View>
      );
};