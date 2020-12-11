import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Gravatar } from 'react-native-gravatar'

export default props => {
    return (
        <View style={styles.container}>
            <Gravatar options={{ email: props.email, secure: true }} style={styles.avatar} />
            <Text style={styles.nickname}>{props.nickname}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    avatar: {
        width: 28,
        height: 28,
        borderRadius: 13,
        marginHorizontal: 11
    },
    nickname: {
        color: '#666',
        marginVertical: 11,
        fontSize: 13,
        fontWeight: 'bold'
    }
})