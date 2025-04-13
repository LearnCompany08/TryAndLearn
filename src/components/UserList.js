import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import React, { memo, useCallback } from 'react'
import { makeApiCall } from '../apiConfig/httpRequest'
import { getUserdetailList } from '../apiConfig/Auth'

function UserList({
    data = [],
    callBackFun = () => { },
    keyExtractor = (_, index) => index.toString(),
    onEndReached = () => { },
    ListFooterComponent = () => { },
    getItemLayout=()=>{},
    initialNumToRender=10,
    maxToRenderPerBatch=10,
    ...restProps
}) {

    const renderItem = useCallback(({ item }) => (
        <TouchableOpacity onPress={() => callBackFun(item?.id)} style={styles.listBody}>
            <Text>{item?.userId}</Text>
            <Text>{item?.title}</Text>
            <Text>{item?.body}</Text>
        </TouchableOpacity>
    )
    )

    return (
        <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            onEndReached={onEndReached}
            ListFooterComponent={ListFooterComponent}
            getItemLayout={getItemLayout}
            initialNumToRender={initialNumToRender}
            maxToRenderPerBatch={maxToRenderPerBatch}
            windowSize={5}
            {...restProps}
        />
    )
}
export default memo(UserList)

const styles = StyleSheet.create({
    listBody: {
        flex: 1,
        marginVertical: 10,
        backgroundColor: '#d3d3d3',
        borderRadius: 5,
        padding: 10
    },
})