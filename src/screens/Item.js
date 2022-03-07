import React, { useState, useEffect, } from 'react'
import { View, Text, StyleSheet, Image, ActivityIndicator, FlatList, } from 'react-native'
import CommentsService from '../api/CommentsService'
import yCombinatorLogo from '../assets/yCombinatorLogo.png'
import Comment from '../components/Comment'
import colors from '../theme/colors'

export default function Item({ navigation, route }) {

    const commentsService = new CommentsService()

    const [isLoading, setIsLoading] = useState(false)

    const [comments, setComments] = useState([])

    useEffect(() => {
        fetchComments()
    }, [navigation])

    const fetchComments = async () => {

        setIsLoading(true)

        let promises = []

        let commentsData = []

        route.params.kids.forEach((commentId) => {
            promises.push(commentsService.getComments(commentId));
        })

        commentsData = await Promise.all(promises)

        setComments(commentsData)

        setIsLoading(false)

    }

    // useEffect(() => {
    //     console.log('comments', comments)
    // }, [comments])

    const renderComment = ({ item }) => (
        <Comment
            navigation={navigation}
            by={item.by}
            kids={item.kids}
            text={item.text}
            time={item.time}
        />
    )

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
                            data={comments}
                            renderItem={renderComment}
                            keyExtractor={item => item.id}
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
        backgroundColor: colors.primary,
        height: 50,
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
    },
})