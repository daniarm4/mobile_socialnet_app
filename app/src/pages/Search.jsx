import { StyleSheet, Text, TextInput, View, Image, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'

const Search = () => {
    const userList = [
        { id: 1, name: 'Alan Walker' },
        { id: 2, name: 'William Olwer' },
        { id: 3, name: 'Oskar Holocoe' },
        { id: 1, name: 'Alan Walker' }
    ]

    return (
        <View style={styles.container}>
            <View style={styles.search}>
                <Image
                    source={{
                        uri: 'https://cdn-icons-png.flaticon.com/128/149/149852.png'
                    }}
                    style={{
                        width: 20,
                        height: 20,
                        opacity: 0.5
                    }}
                />
                <TextInput
                    style={styles.input}
                    placeholder='Search'
                />
            </View>
            {/* <Text style={styles.noResult}>No result</Text>  */}
            <FlatList
                data={userList}
                style={styles.userList}
                renderItem={({ item }) => {
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
                            <TouchableOpacity
                                style={{
                                    padding: 10,
                                    borderRadius: 20,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: '#0068FF'
                                }}
                                onPress={() => console.log(`add friend #${item.id}`)}
                            >
                                <Text style={{ color: 'white', fontWeight: '500' }}>Add</Text>
                            </TouchableOpacity>
                        </View>
                    )
                }}
                keyExtractor={item => item.id}
            />
        </View>
    )
};

export default Search;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingVertical: 10,
        display: 'flex',
        gap: 20
    },
    search: {
        width: '100%',
        height: 50,
        backgroundColor: '#f2f0f0',
        borderRadius: 30,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20
    },
    input: {
        padding: 10,
    },
    noResult: {
        fontSize: 26,
        fontWeight: '600',
        alignSelf: 'center',
        paddingBottom: 5
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
        gap: 10,
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