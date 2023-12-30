import { StyleSheet, Image, View } from 'react-native'
import React from 'react'

const HeaderRight = () => {
    return (
        <View style={styles.container}>
            <Image
                style={styles.avatar}
                source={{
                    uri: 'https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?size=626&ext=jpg&ga=GA1.1.601401618.1686480699&semt=ais'
                }} 
            />
        </View>
    )
}

export default HeaderRight

const styles = StyleSheet.create({
    container: {
        marginRight: 15
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 50
    }
})