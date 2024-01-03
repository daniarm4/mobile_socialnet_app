import { FlatList, StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, Dimensions } from 'react-native'
import React from 'react'

const Comments = () => {

    const commentList = [
        { id: 1, username: 'adam', text: 'Good post', createdAt: '12.05.2023', level: 0 },
        { id: 2, username: 'vladik', text: 'Normas', createdAt: '12.05.2023', level: 1 },
        { id: 3, username: 'serega', text: 'Я хлеб купил', createdAt: '12.05.2023', level: 2 },
        { id: 2, username: 'vladik', text: 'Normas NormasNormasNormasNormasNormasNormas NormasNormasNormasNormasNormas NormasNormasNormasNormas', createdAt: '12.05.2023', level: 0 },
        { id: 2, username: 'vladik', text: 'Normas', createdAt: '12.05.2023', level: 0 },
        { id: 2, username: 'vladik', text: 'Normas', createdAt: '12.05.2023', level: 1 },
        { id: 2, username: 'vladik', text: 'Normas', createdAt: '12.05.2023', level: 1 },
    ]

    return (
        <View style={styles.container}>
            <View style={styles.title}>
                <Text style={styles.titleText}>Comments</Text>
                <Text style={styles.count}>1.3K</Text>
            </View>
            <ScrollView horizontal>
                <ScrollView>
                    {commentList.map(item => (
                        <View style={{
                            display: 'flex',
                            flexDirection: 'row',
                            gap: 10,
                            marginLeft: item.level * 50,
                            marginBottom: 12
                        }}>
                            <Image
                                style={styles.avatar}
                                source={{
                                    uri: 'https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?size=626&ext=jpg&ga=GA1.1.601401618.1686480699&semt=ais'
                                }}
                            />
                            <View style={styles.commentContent}>
                                <View style={styles.commentInfo}>
                                    <Text style={styles.owner}>{item.username}</Text>
                                    <Text style={styles.created}>{item.createdAt}</Text>
                                </View>
                                <Text style={styles.text}>{item.text}</Text>
                                <TouchableOpacity>
                                    <Text style={styles.reply}>Reply</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))}
                </ScrollView>
            </ScrollView>
            
        </View>
    )
}

export default Comments

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    title: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10
    },
    titleText: {
        fontWeight: '500',
        fontSize: 20
    },
    count: {
        fontWeight: '400',
        fontSize: 18
    },
    avatar: {
        borderRadius: 50,
        width: 50,
        height: 50
    },
    commentContent: {
        display: 'flex'
    },
    commentInfo: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5
    },
    reply: {
        color: 'blue'
    },
    owner: {
        fontWeight: '500',
        fontSize: 16
    },
    text: {
        fontSize: 12,
        width: Dimensions.get('window').width - 50 - 10 - 30
    },
    created: {
        fontSize: 12,
        color: '#A7A7A7'
    }
})