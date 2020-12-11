import React, { Component } from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'

export default class Splash extends Component {
    componentDidMount = () => {
        setTimeout(() => { this.props.navigation.navigate('App') }, 2000)
    }

    render() {
        return (
            <View style={styles.container}>
                <Image source={require('../../assets/imgs/icon.png')} style={styles.image} />
                <Text style={styles.header}>Instagram</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 3,
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        height: 198,
        width: 198,
        resizeMode: 'contain'
    },
    header: {
        fontSize: 48,
        fontWeight: 'bold'
    }
})
