import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import dateFromNow from '../helpers/DateFromNow';
import colors from '../theme/colors';

export default function Item({ index, title, url, score, by, time, descendants, }) {

    const getHostname = (url) => {
        const matches = url.match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i);
        return matches && matches[1];
    }

    return (
        <View style={styles.item}>
            <Text style={styles.heading}>
                <Text style={styles.bigText}>{index + 1}{'. \u25B2 '}</Text>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.bigText}>{` (${getHostname(url)})`}</Text>
            </Text>
            <Text style={styles.smallText}>{score}{' points by '}{by}{' '}{dateFromNow(time)}{descendants && ` | ${descendants} comments`}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    item: {
        margin: 10,
    },
    heading: {
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