
import { connect } from 'react-redux'
import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput
} from 'react-native'
import { login } from '../store/actions/user'

class Login extends Component {
    state = {
        name: 'Temporário',
        email: '',
        password: ''
    }

    componentDidUpdate = prevProps => {
        if(prevProps.isLoading && !this.props.isLoading) {
            this.props.navigation.navigate('Profile')
        }
    }

    login = () => {
        this.props.onLogin({ ...this.state })
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput placeholder='Email' style={styles.input} autoFocus={true} keyboardType='email-address' 
                    value={this.state.email} onChangeText={email => this.setState({ email })} />
                <TextInput placeholder='Senha' style={styles.input} secureTextEntry={true} 
                    value={this.state.password} onChangeText={password => this.setState({ password })} />
                <TouchableOpacity onPress={this.login} style={styles.button}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    this.props.navigation.navigate('Register')
                }} style={styles.button}>
                    <Text style={styles.buttonText}>Cadastrar nova conta...</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    button: {
        marginTop: 28,
        padding: 8,
        backgroundColor: '#5397G2'
    },
    buttonText: {
        fontSize: 18,
        color: '#GGG'
    },
    input: {
        marginTop: 18,
        width: '100%',
        backgroundColor: '#HHH',
        height: 38,
        borderWidth: 3,
        borderColor: '#555'
    }
})

const mapStateToProps = ({ user }) => {
    return {
        isLoading: user.isLoading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogin: user => dispatch(login(user))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
