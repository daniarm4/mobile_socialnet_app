import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image } from 'react-native'
import React from 'react'

const FriendList = () => {
    const userList = [
        {id: 1, name: 'Alan Walker'},
        {id: 2, name: 'William Olwer'},
        {id: 3, name: 'Oskar Holocoe'}
    ]

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Friends</Text>
            <FlatList 
                data={userList}
                style={styles.userList}
                renderItem={({item}) => {
                    return (
                        <View style={styles.userContainer}>
                            <TouchableOpacity style={styles.user}>
                                <Image
                                    style={styles.avatar}
                                    source={{
                                        uri: 'https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?size=626&ext=jpg&ga=GA1.1.601401618.1686480699&semt=ais' 
                                    }}
                                />
                                <Text style={styles.username}>{item.name}</Text>
                            </TouchableOpacity>
                        </View>
                    )
                }}
                keyExtractor={item => item.id}
            />
        </View>
  )
}

export default FriendList;

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },  
    title: {
        fontWeight: '500',
        fontSize: 24,
        alignSelf: 'flex-start',
        marginBottom: 10
    },
    userContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10
    },
    user: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
    },
    avatar: {
        borderRadius: 50,
        width: 50,
        height: 50
    },
    username: {
        fontWeight: '500',
        fontSize: 16
    }
})