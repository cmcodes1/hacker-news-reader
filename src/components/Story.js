import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import dateFromNow from '../helpers/DateFromNow';
import colors from '../theme/colors';

export default function Story({ navigation, index, title, url, score, by, time, descendants, kids, }) {

    const getHostname = (url) => {
        const matches = url.match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i);
        return matches && matches[1];
    }

    return (
        <View style={styles.item}>
            <Text style={styles.row}>
                <Text style={styles.bigText}>{index + 1}{'. \u25B2 '}</Text>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.bigText}>{` (${getHostname(url)})`}</Text>
            </Text>
            <Text style={styles.row}>
                <Text style={styles.smallText}>{score}{' points by '}{by}{' '}{dateFromNow(time)}</Text>
                <Text
                    style={styles.smallText}
                    onPress={() => navigation.navigate('Item', { kids: kids })}
                >
                    {descendants && ` | ${descendants} comments`}
                </Text>
            </Text>
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