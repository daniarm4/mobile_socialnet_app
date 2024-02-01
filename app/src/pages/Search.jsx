import { StyleSheet, Text, TextInput, View, Image, FlatList, TouchableOpacity, Button } from 'react-native';
import React, { useState } from 'react';
import { useSearchUserQuery } from '../store/api/userAPI';

const Search = () => {
    const [searchInput, setSearchInput] = useState('');
    const [searchParam, setSearchParam] = useState('');
    const [page, setPage] = useState(1);
    const { data, isFetching, isError, error } = useSearchUserQuery({ page: page, searchParam: searchParam }, { skip: Boolean(!searchParam) });

    if (isError) {
        console.error(error);
    }

    const loadMore = () => {
        if (!isFetching && data.next) {
            setPage(page => page + 1);
        }
    };

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
                <View>
                    <TextInput
                        style={styles.input}
                        placeholder='Search'
                        value={searchInput}
                        onChangeText={(text) => {
                            setSearchInput(text);
                            setPage(1);
                        }}
                    />
                </View>
            </View>
            <Button
                onPress={() => {
                    setPage(1);
                    setSearchParam(searchInput);
                }}
                title='search'
            />
            {data
                ?
                < FlatList
                    data={data.results}
                    style={styles.userList}
                    onEndReached={loadMore}
                    onEndReachedThreshold={0.3}
                    renderItem={({ item }) => {
                        return (
                            <View style={styles.userContainer} key={item.username}>
                                <TouchableOpacity style={styles.user}>
                                    <Image
                                        style={styles.avatar}
                                        source={{
                                            uri: item.avatar
                                        }}
                                    />
                                    <Text style={styles.username}>{item.username}</Text>
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
                :
                <Text>
                    No result</Text>}
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