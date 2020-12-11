import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import { connect } from 'react-redux'
import { createUser } from '../store/actions/user'

class Register extends Component {
    state = {
        name: '',
        email: '',
        password: ''
    }

    componentDidUpdate = prevProps => {
        if(prevProps.isLoading && !this.props.isLoading) {
            this.setState({
                name: '',
                email: '',
                password: ''
            })

            this.props.navigation.navigate('Feed')
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput placeholder='Nome' style={styles.input} autoFocus={true} value={this.state.name}
                    onChangeText={name => this.setState({ name })} />
                <TextInput placeholder='Email' style={styles.input} keyboardType='email-address'
                    value={this.state.email} onChangeText={email => this.setState({ email })} />
                <TextInput placeholder='Senha' style={styles.input} secureTextEntry={true} 
                    value={this.state.password} onChangeText={password => this.setState({ password })} />
                <TouchableOpacity onPress={() => { 
                    this.props.onCreateUser(this.state) }} 
                    style={styles.button}>
                    <Text style={styles.buttonText}>Salvar</Text>
                </TouchableOpacity>
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
    button: {
        marginTop: 28,
        padding: 8,
        backgroundColor: '#3175G3'
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
        borderColor: '#555',
        paddingLeft: 13
    }
})

const mapStateToProps = ({ user }) => {
    return {
        isLoading: user.isLoading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onCreateUser: user => dispatch(createUser(user))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)
