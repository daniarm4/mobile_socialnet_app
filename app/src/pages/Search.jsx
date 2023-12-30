import { StyleSheet, Text, TextInput, View, Image } from 'react-native'
import React from 'react'

const Search = () => {
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
        </View>
    )
}

export default Search

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingVertical: 10
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
    }
})