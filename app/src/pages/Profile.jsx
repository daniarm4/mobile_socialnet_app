import { StyleSheet, Text, Image, View, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import FriendList from '../components/Profile/FriendList';
import EditProfile from '../components/Profile/EditProfile';


const Profile = () => {
    const [selectedPageContent, setSelectedPageContent] = useState('friends');

    const pageContents = [
        { title: 'Friends', pageContentName: 'friends' },
        { title: 'Edit profile', pageContentName: 'edit-profile' }
    ]

    return (
        <View style={styles.container}>
            <Image
                style={styles.avatar}
                source={{
                    uri: 'https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?size=626&ext=jpg&ga=GA1.1.601401618.1686480699&semt=ais'
                }}
            />
            <Text style={styles.username}>Timmy Terner</Text>
            <View style={styles.row}>
                {pageContents.map(item => {
                    const isSelected = selectedPageContent === item.pageContentName;
                    return (
                        <TouchableOpacity
                            style={isSelected ? styles.optionActive : styles.option}
                            onPress={() => setSelectedPageContent(item.pageContentName)}
                            key={item.title}
                        >
                            <Text style={isSelected ? styles.optionTextActive : styles.optionText}>{item.title}</Text>
                        </TouchableOpacity>
                    )
                })}
            </View>
            {selectedPageContent === 'friends'
                ?
                <FriendList />
                :
                <EditProfile />
            }
        </View>
    )
}

export default Profile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        display: 'flex',
        alignItems: 'center',
        gap: 15,
        paddingTop: 10,
        paddingHorizontal: 15,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50
    },
    username: {
        fontWeight: '500',
        fontSize: 22
    },
    row: {
        borderRadius: 15,
        width: '100%',
        height: 50,
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: '#F3F3F4',
        paddingHorizontal: 8,
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    option: {
        flex: 0.5,
        padding: 5,
        alignItems: 'center'
    },
    optionActive: {
        backgroundColor: 'white',
        flex: 0.5,
        padding: 8,
        borderRadius: 10,
        alignItems: 'center'
    },
    optionText: {
        color: '#7E7E81',
        fontSize: 16
    },
    optionTextActive: {
        color: '#0068FF',
        fontWeight: '500',
        fontSize: 16
    }
})
