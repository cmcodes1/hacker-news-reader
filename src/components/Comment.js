import React, { useState, useEffect, } from 'react';
import { View, Text, StyleSheet, } from 'react-native';
import { decode } from 'html-entities';
import CommentsService from '../api/CommentsService';
import dateFromNow from '../helpers/DateFromNow';
import colors from '../theme/colors';

export default function Comment({ navigation, by, kids, text, time, }) {

    const commentsService = new CommentsService()

    const [firstReply, setFirstReply] = useState({})

    useEffect(() => {
        kids && fetchFirstReply()
    }, [navigation])

    const fetchFirstReply = async () => {

        console.log('kids[0]', kids[0]);

        const responseData = await commentsService.getFirstReply(kids[0])

        if (responseData.status == 'success') {
            setFirstReply(responseData.payload)
        }

    }

    useEffect(() => {
        console.log('firstReply', firstReply)
    }, [firstReply])

    return (
        <View style={styles.item}>
            <Text style={styles.smallText}>{'\u25B2 '}{by}{' '}{dateFromNow(time)}</Text>
            <Text style={styles.title}>{text}</Text>
            {
                kids && firstReply &&
                <View style={styles.item}>
                    <Text style={styles.smallText}>{'\u25B2 '}{firstReply.by}{' '}{dateFromNow(firstReply.time)}</Text>
                    <Text style={styles.title}>
                        {decode(firstReply.text, { level: 'html5' }).replaceAll("<[^>]*>", "")}
                    </Text>
                </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    item: {
        margin: 10,
    },
    row: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    title: {
        fontSize: 14,
        color: colors.textPrimary,
    },
    bigText: {
        fontSize: 14,
    },
    smallText: {
        fontSize: 11,
    },
})