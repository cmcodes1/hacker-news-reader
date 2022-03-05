import React from 'react';
import { View, Text, Image, } from 'react-native';
import colors from '../theme/colors';
import yCombinatorLogo from '../assets/yCombinatorLogo.png';

export default function Home() {
    return (
        <View style={{ flex: 1, backgroundColor: colors.secondary, }}>
            <View style={{ backgroundColor: colors.primary, height: 50, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', }}>
                <Image style={{ height: 40, width: 40, borderWidth: 1, borderColor: colors.tertiary, marginHorizontal: 10, }} source={yCombinatorLogo} />
                <Text style={{ color: colors.textPrimary, fontSize: 30, fontWeight: 'bold', }}>Hacker News</Text>
            </View>
        </View>
    )
}