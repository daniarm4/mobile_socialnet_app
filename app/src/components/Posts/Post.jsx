import { StyleSheet, Image, Text, View, ScrollView } from 'react-native'
import React from 'react'

const Post = () => {
    return (
        <View style={styles.container}>

            <View style={styles.postOwner}>
                <View style={styles.ownerInfo}>
                    <Image 
                        style={styles.ownerAvatar}
                        source={{
                            uri: 'https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?size=626&ext=jpg&ga=GA1.1.601401618.1686480699&semt=ais'
                        }}     
                    />
                    <View style={styles.aboutPost}>
                        <Text style={styles.ownerName}>Lucas Forest</Text>
                        <Text style={styles.created}>3 Minutes Ago</Text>
                    </View>
                </View>
                <View style={styles.postSettings}>
                    <Image
                        style={{
                            width: 25,
                            height: 25
                        }}
                        source={{
                            uri: 'https://cdn-icons-png.flaticon.com/128/2311/2311524.png'
                        }}
                     />
                </View>
            </View>

            <View style={styles.postContent}>
                <Text style={styles.postText}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</Text>
                <ScrollView style={styles.images} horizontal>
                    <Image 
                        style={styles.image}
                        source={{
                            uri: 'data:image/jpeg;base64,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'
                        }} 
                    />
                    <Image 
                        style={styles.image}
                        source={{
                            uri: 'data:image/jpeg;base64,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'
                        }} 
                    />
                </ScrollView>
            </View>

            <View style={styles.postFooter}>
                {/* <Image
                    style={{
                        width: 25,
                        height: 25
                    }} 
                    source={{
                        uri: 'https://cdn-icons-png.flaticon.com/128/1077/1077035.png'
                    }}     
                /> */}
                <View style={styles.likes}>
                    <Image
                        style={{
                            width: 25,
                            height: 25
                        }} 
                        source={{
                            uri: 'https://cdn-icons-png.flaticon.com/128/2077/2077502.png'
                        }} 
                    />
                    <Text style={styles.likesCount}>1.3K</Text>
                </View>
                <View style={styles.likes}>
                    <Image
                        style={{
                            width: 25,
                            height: 25
                        }} 
                        source={{
                            uri: 'https://cdn-icons-png.flaticon.com/128/2462/2462719.png'
                        }} 
                    />
                    <Text style={styles.likesCount}>1.3K</Text>
                </View>
            </View>

        </View>
    )
}

export default Post

const styles = StyleSheet.create({
    container: {
        width: '100%',
        maxHeight: '100%',
        display: 'flex',
        marginBottom: 20,
        gap: 5
    },
    postOwner: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    ownerInfo: {
        display: 'flex',
        flexDirection: 'row',
        gap: 10
    },
    ownerAvatar: {
        borderRadius: 50,
        width: 50,
        height: 50
    },
    aboutPost: {
        display: 'flex',
    }, 
    ownerName: {
        fontWeight: '500',
        fontSize: 18
    },
    created: {
        color: '#ADAABB',
        fontSize: 12,
        fontWeight: '300'
    },
    postSettings: {
        marginRight: 5 
    },
    postContent: {
        display: 'flex',
        gap: 2
    },
    image: {
        marginRight: 5,
        height: 300,
        width: 300,
        borderRadius: 10
    },  
    postText: {
        fontWeight: '300'
    },  
    postFooter: {
        display: 'flex',
        flexDirection: 'row',
        gap: 10
    },
    likes: {
        display: 'flex',
        gap: 3,
        flexDirection: 'row',
        alignItems: 'center'
    },
    likesCount: {
        color: '#ADAABB'
    }
})