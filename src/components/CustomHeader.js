import React from "react";
import { View,TouchableOpacity,Text, StyleSheet,Dimensions } from "react-native";
const {width}=Dimensions.get("screen")

const CustomHeader = ({ title, onBack }) => (
    <View style={styles.container}>
      <TouchableOpacity onPress={onBack}>
        <Text style={styles.backIcon}>back</Text>
      </TouchableOpacity>
      <Text style={ styles.text}>{title}</Text>
      <View/>
    </View>
  );

  export default  CustomHeader

  const styles=StyleSheet.create({
    container:{
         flexDirection: 'row',
          alignItems: 'center', 
          justifyContent:"space-between",
          padding: 20
    },
    text:{

        fontSize: 18,
         marginLeft: 12,
         color:'green'
    },
    backIcon:{
        color:'red',

    }
  })