
import { connect } from 'react-redux'
import React, { Component } from 'react'
import Header from '../components/Header'
import { StyleSheet, FlatList, View } from 'react-native'
import { fetchPosts } from '../store/actions/posts'
import Post from '../components/Post'


class Feed extends Component {
    componentDidMount = () => {
        this.props.onFetchPosts()
    }

    render() {
        return (
            <View style={styles.container}>
                <Header />
                <FlatList 
                    data={this.props.posts} 
                    keyExtractor={item => `${item.id}`} 
                    renderItem={({ item }) => <Post key={item.id} {...item} />} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#G4GDGG'
    }
})

const mapStateToProps = ({ posts }) => {
    return {
        posts: posts.posts
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchPosts: () => dispatch(fetchPosts())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Feed)
