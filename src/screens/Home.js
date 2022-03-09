import React, { useEffect, useState, useCallback, } from 'react';
import { View, Text, Image, FlatList, StyleSheet, ActivityIndicator, RefreshControl, ToastAndroid, Platform, StatusBar, } from 'react-native';
import colors from '../theme/colors';
import yCombinatorLogo from '../assets/yCombinatorLogo.png';
import TopStoriesService from '../api/TopStoriesService';
import Story from '../components/Story';

export default function Home({ navigation }) {

    const topStoriesService = new TopStoriesService()

    const [isLoading, setIsLoading] = useState(false)

    const [topStories, setTopStories] = useState([])

    useEffect(() => {
        fetchTopStories()
    }, [navigation])

    const fetchTopStories = async () => {

        setIsLoading(true)

        const response = await topStoriesService.getTopStoriesIds()

        if (response.status == 'success') {

            let promises = []

            let topStoriesData = []

            for (let i = 0; i < 30; i++) {
                promises.push(topStoriesService.getTopStoriesData(response.payload[i]))
            }

            topStoriesData = await Promise.all(promises)

            setTopStories(topStoriesData)

        } else {

            alert(response.payload)

        }

        setIsLoading(false)

    }

    // useEffect(() => {
    //     console.log('topStories', topStories)
    // }, [topStories])

    const renderStory = ({ item, index }) => (
        <Story
            navigation={navigation}
            index={index}
            title={item.title}
            url={item.url}
            score={item.score}
            by={item.by}
            time={item.time}
            descendants={item.descendants}
            kids={item.kids}
        />
    )

    const [refreshing, setRefreshing] = useState(false)

    const onRefresh = useCallback(() => {
        setRefreshing(true)
        fetchTopStories()
        ToastAndroid.show('Stories refreshed', ToastAndroid.SHORT)
        setRefreshing(false)
    }, [refreshing])

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image style={styles.logo} source={yCombinatorLogo} />
                <Text style={styles.headerText}>Hacker News</Text>
            </View>
            <View style={styles.body}>
                {
                    isLoading
                        ?
                        <ActivityIndicator size="large" color={colors.primary} />
                        :
                        <FlatList
                            data={topStories}
                            renderItem={renderStory}
                            keyExtractor={item => item.id}
                            refreshControl={
                                <RefreshControl
                                    refreshing={refreshing}
                                    onRefresh={onRefresh}
                                    colors={[colors.primary]}
                                />
                            }
                        />
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.secondary,
    },
    header: {
        marginTop: Platform.OS == 'ios' ? 40 : StatusBar.height,
        backgroundColor: colors.primary,
        height: 'auto',
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    logo: {
        height: 40,
        width: 40,
        borderWidth: 1,
        borderColor: colors.tertiary,
        marginHorizontal: 10,
    },
    headerText: {
        color: colors.textPrimary,
        fontSize: 30,
        fontWeight: 'bold',
    },
    body: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: Platform.OS == "ios" ? 20 : 0,
    },
})