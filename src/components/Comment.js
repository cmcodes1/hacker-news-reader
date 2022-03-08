import React, { useState, useEffect, } from 'react';
import { View, Text, StyleSheet, useWindowDimensions, } from 'react-native';
import RenderHtml from 'react-native-render-html';
import CommentsService from '../api/CommentsService';
import dateFromNow from '../helpers/DateFromNow';

export default function Comment({ navigation, by, kids, text, time, }) {

    const commentsService = new CommentsService()

    const [firstReply, setFirstReply] = useState({})

    useEffect(() => {
        kids && fetchFirstReply()
    }, [navigation])

    const fetchFirstReply = async () => {

        const responseData = await commentsService.getFirstReply(kids[0])

        if (responseData.status == 'success') {
            setFirstReply(responseData.payload)
        }

    }

    // useEffect(() => {
    //     console.log('firstReply', firstReply)
    // }, [firstReply])

    const { width } = useWindowDimensions()

    const sourceComment = { html: `${text}` }

    const sourceReply = { html: `${firstReply.text}` }

    return (
        <View style={styles.container}>
            <Text style={styles.smallText}>{'\u25B2 '}{by}{' '}{dateFromNow(time)}</Text>
            <RenderHtml contentWidth={width} source={sourceComment} />
            {
                kids && firstReply &&
                <View style={styles.container}>
                    <Text style={styles.smallText}>{'\u25B2 '}{firstReply.by}{' '}{dateFromNow(firstReply.time)}</Text>
                    <RenderHtml contentWidth={width} source={sourceReply} />
                </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        margin: 10,
    },
    smallText: {
        fontSize: 11,
    },
})