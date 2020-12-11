import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Gravatar } from 'react-native-gravatar'
import { 
    StyleSheet,
    Text,
    View,
    Platform,
    Image 
} from 'react-native'
import icon from '../../assets/imgs/icon.png'

class Header extends Component {
    render() {
        const name = this.props.name || 'Guest'
        const gravatar = this.props.email ?
            <Gravatar options={{ email: this.props.email, secure: true }} style={styles.avatar} /> : null
            
        return (
            <View style={styles.container}>
                <View style={styles.rowContainer}>
                    <Image source={icon} style={styles.image} />
                    <Text style={styles.title}>Instagram</Text>
                </View>
                <View style={styles.userContainer}>
                    <Text style={styles.user}>{name}</Text>
                    {gravatar}
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: Platform.OS === 'ios' ? 19 : 1,
        padding: 8,
        borderBottomWidth: 3,
        borderColor: '#DDD',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    image: {
        height: 28,
        width: 28,
        resizeMode: 'contain'
    },
    title: {
        color: '#222',
        height: 28,
        fontSize: 30
    },
    userContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    user: {
        fontSize: 8,
        color: '#666'
    },
    avatar: {
        width: 28,
        height: 28,
        marginLeft: 8
    }
})

const mapStateToProps = ({ user }) => {
    return {
        email: user.email,
        name: user.name
    }
}

export default connect(mapStateToProps)(Header)