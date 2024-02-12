import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import React, { useState } from 'react';
import { useAcceptFriendRequestMutation, useGetFriendRequestsQuery, useGetFriendsQuery } from '../../store/api/userAPI';
import { useDispatch } from 'react-redux';
import { api } from '../../store/api/base';

const FriendList = () => {
    const options = [
        'friends',
        'requests'
    ]
    const dispatch = useDispatch();

    const [selectedOption, setSelectedOption] = useState('friends');

    const { data: requests, isError, error, isSuccess } = useGetFriendRequestsQuery(undefined, {
        skip: selectedOption !== 'requests'
    })

    const { data: friends, isSuccess: friendsSuccess } = useGetFriendsQuery(undefined, {
        skip: selectedOption !== 'friends'
    })

    const [_acceptRequest, { isError: isAcceptError, isSuccess: isAcceptSuccess }] = useAcceptFriendRequestMutation();

    const acceptRequest = async (requestData, userData) => {
        dispatch(
            api.util.updateQueryData('getFriends', undefined, (draft) => {
                draft.push(userData);
             })
        );
        dispatch(
            api.util.updateQueryData('getFriendRequests', undefined, (draft) => {
                return draft.filter(item => item.id !== userData.id);
            })
        );
        _acceptRequest(requestData);
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Friends</Text>
            <SelectDropdown
                data={options}
                onSelect={(selectedItem, _) => {
                    setSelectedOption(selectedItem);
                }}
                buttonTextAfterSelection={(selectedItem, _) => {
                    return selectedItem
                }}
                rowTextForSelection={(item, _) => {
                    return item
                }}
            />
            <FlatList
                data={selectedOption === 'requests' ? requests : friends}
                style={styles.userList}
                renderItem={({ item }) => {
                    return (
                        <View key={item.id} style={styles.userContainer}>
                            <TouchableOpacity style={styles.user}>
                                <Image
                                    style={styles.avatar}
                                    source={{
                                        uri: 'https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?size=626&ext=jpg&ga=GA1.1.601401618.1686480699&semt=ais'
                                    }}
                                />
                                <Text style={styles.username}>{item.username}</Text>
                            </TouchableOpacity>
                            {
                                selectedOption === 'requests' &&
                                <TouchableOpacity
                                    style={{
                                        padding: 10,
                                        borderRadius: 20,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        backgroundColor: '#0068FF'
                                    }}
                                    onPress={() => {
                                        console.log(item.requestID)
                                        acceptRequest({id: item.requestID}, {id: item.id, username: item.username, avatar: item.avatar})
                                    }}
                                >
                                    <Text style={{ color: 'white', fontWeight: '500' }}>Add</Text>
                                </TouchableOpacity>

                            }
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