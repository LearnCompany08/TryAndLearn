import {
    View,
    Text,
    StyleSheet,
    ActivityIndicator
} from 'react-native'
    
import React, {
    useCallback,
    useEffect,
    useMemo,
    useState,
    useRef
} from 'react'

import { makeApiCall } from '../apiConfig/httpRequest'
import { getUserListUrl } from '../apiConfig/Auth'
import {
    CustomButton,
    UserList
} from "../components"
import { useNavigation } from '@react-navigation/native'
import onDisplayNotification from '../notification/Notification'
import useCounter from './CustomHook'

const ITEM_HEIGHT=200;

export default function HomeScreen() {
    const [userData, setUserData] = useState([])
    const navigation = useNavigation()
    const [page, setPage] = useState(1)
    const [isLoading, setIsloading] = useState(false)
    const onEndReachedCalledDuringMomentum = useRef(false);
    const [counter,increment,decrement]= useCounter(0)
    
    const getUserData = useCallback(async () => {
        try {
            setIsloading(true)
            await onDisplayNotification("FETCHING DATA.")
            const data = await makeApiCall({ method: "get", endUrl: getUserListUrl(page, 10) })
            await onDisplayNotification("FETCHING DATA COMPLETE.")
            setIsloading(false)
            setUserData(prev => [...prev, ...data])
        } catch (error) {
            setIsloading(false)
            console.log("---error", error)
        }
    }, [page])

    useEffect(() => {
        getUserData()
    }, [page])

    const goToUserDetail = (id) => {
        navigation.navigate('UserDetail', { id });
    }

    const renderFooter = () => isLoading && <ActivityIndicator color={"red"} style={{ margin: 10 }} size="large" />;

    const onEndReached = () => {
        if (!onEndReachedCalledDuringMomentum.current && !isLoading) {
          console.log("Fetching more data...");
          onEndReachedCalledDuringMomentum.current = true;
          setPage((prev) => prev + 1);
        }
      };

      const onMomentumScrollBegin=() => {
        onEndReachedCalledDuringMomentum.current = false;
      }
      

    const getItemLayout = useCallback((_, index) => ({
        length: ITEM_HEIGHT,
        offset: ITEM_HEIGHT * index,
        index,
      }), []);
    

    const renderListItem = useMemo(() => {
        return <UserList
            data={userData}
            callBackFun={goToUserDetail}
            onEndReachedThreshold={.8}
            onEndReached={onEndReached}
            ListFooterComponent={renderFooter}
            getItemLayout={getItemLayout}
            onMomentumScrollBegin={onMomentumScrollBegin}
        />;
    }, [userData]);

    const RenderAddSubCounter = React.memo(() => (
        <View style={styles.counterContainer}>
            <CustomButton
                title={"Add"}
                onPress={increment}
            />
            <Text style={styles.counterStyle}>{counter}</Text>
            <CustomButton
                title={"Sub"}
                onPress={decrement}
            />
        </View>
    ),[counter])

    const renderCounter = useMemo(() => {
        return <RenderAddSubCounter counter={counter} />
    }, [counter])

    return (
        <View style={styles.container}>
            {renderCounter}
            {renderListItem}
        </View>
    )
}

const styles = StyleSheet.create({
    listBody: {
        flex: 1,
        marginVertical: 10,
        backgroundColor: '#d3d3d3',
        borderRadius: 5,
        padding: 10
    },
    container: {
        flex: 1,
        marginVertical: 10,
        marginHorizontal: 20,
    },
    counterContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center'
    },
    counterStyle: {
        color: "green",
        fontWeight: "bold",
        fontSize: 20,
        alignSelf: "center",
        marginHorizontal: 20
    }
})