import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions, TextInput, Button } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { useAddCommentMutation } from '../../store/api/postAPI';

const Comment = ({ comment, groupedComments, postId }) => {
    const [isReplyVisible, setIsReplyVisible] = useState(false);
    const textInputRef = useRef();
    const [ replyCommentText, setReplyCommentText ] = useState();

    const [ addComment, { isError, error } ] = useAddCommentMutation();
    if (isError) {
        console.log(error);
    }

    useEffect(() => {
        if (isReplyVisible && textInputRef) {
            textInputRef.current.focus();
        }
    }, [isReplyVisible])

    const createReply = () => {
        const formData = new FormData();
        
        formData.append('text', replyCommentText);
        formData.append('post', postId);
        formData.append('parent', comment.id);

        console.log(postId);        

        addComment(formData);
        setIsReplyVisible(false);
    }

    return (
        <View>
            <View
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 10,
                    marginLeft: (comment.level) * 50,
                    marginBottom: 12
                }}
                key={comment.id}
            >
                <Image
                    style={styles.avatar}
                    source={{
                        uri: 'https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?size=626&ext=jpg&ga=GA1.1.601401618.1686480699&semt=ais'
                    }}
                />
                <View style={styles.commentContent}>
                    <View style={styles.commentInfo}>
                        <Text style={styles.owner}>{comment.owner_username}</Text>
                        <Text style={styles.created}>{comment.created_at}</Text>
                    </View>
                    <Text style={styles.text}>{comment.text}</Text>
                    <TouchableOpacity
                        onPress={() => setIsReplyVisible(true)}
                    >
                        <Text style={styles.reply}>Reply</Text>
                    </TouchableOpacity>
                    <View
                        style={{
                            display: isReplyVisible ? 'flex' : 'none'
                        }}
                    >
                        <TextInput
                            placeholder='Reply'
                            style={{
                                paddingVertical: 10,
                                paddingLeft: 10,
                                borderWidth: 1,
                                borderRadius: 20,
                                marginVertical: 10,
                                maxHeight: 300,
                                maxWidth: 300
                            }}
                            ref={textInputRef}
                            value={replyCommentText}
                            onChangeText={text => setReplyCommentText(text)}
                        />
                        <View style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'flex-end',
                            gap: 10
                        }}>
                            <Button
                                title='Reply'
                                onPress={() => createReply()}
                            />
                            <Button
                                title='Cancel'
                                onPress={() => setIsReplyVisible(false)}
                            />
                        </View>
                    </View>
                </View>
            </View>
            {groupedComments[comment.id] && groupedComments[comment.id].map(comm => (
                <Comment
                    key={comm.id}
                    comment={comm}
                    groupedComments={groupedComments}
                    postId={postId}
                />
            ))}
        </View>
    )
}

export default Comment;

const styles = StyleSheet.create({
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