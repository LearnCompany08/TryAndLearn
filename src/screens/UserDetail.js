import { View, Text, StyleSheet } from 'react-native'
import React ,{useEffect, useState,useLayoutEffect} from 'react'
import { getUserdetailList } from '../apiConfig/Auth'
import { makeApiCall } from '../apiConfig/httpRequest'
import { useNavigation } from '@react-navigation/native'
import CustomHeader from '../components/CustomHeader'

export default function UserDetail(props) {
  const {id}=props?.route?.params
  const [userDetail,setUserDetail]=useState(null)
  const navigation=useNavigation()

  const getUserDetail = async () => {
    try {
        const data = await makeApiCall({ method: "get", endUrl: getUserdetailList(id) })
        setUserDetail(data)
    } catch (error) {
        console.log("error", error)
    }
}

useLayoutEffect(() => {
    navigation.setOptions({
      header: () => (
        <CustomHeader title="Detail" onBack={() => navigation.goBack()} />
      ),
    });
  }, [navigation]);

useEffect(() => {
    getUserDetail()
}, [])

  return (
    <View style={styles.container}>
      <Text>{userDetail?.userId}</Text>
      <Text>{userDetail?.title}</Text>
      <Text>{userDetail?.body}</Text>

    </View>
  )
}
const styles=StyleSheet.create({
    container:{
      backgroundColor:'grey',
      marginHorizontal:20,
      padding:10,
      borderRadius:5
    }
})