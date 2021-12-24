import React, { useEffect, useState } from "react";
import { Text, FlatList, StyleSheet, View, Image, TouchableOpacity } from "react-native";
import io from 'socket.io-client';
import api from '../services/api';

import more from '../assets/more.png';
import like from '../assets/like.png';
import comment from '../assets/comment.png';
import send from '../assets/send.png';

export default function Feed(){

    const [feed, setFeed] = useState([]);

    const socket = io('http://192.168.10.165:3333');

    useEffect(() => {
        async function componentDidMount() {

            socket.on('post', newPost => {
                setFeed([...feed, newPost]);
            });
   
            socket.on('like', likePost => {
                feed.map(post => post._id === likePost._id ? likePost : post)
            });      
    
            const response = await api.get('posts');
    
            setFeed(response.data);
        }

        componentDidMount();
        
    }, [feed, socket]);

    async function handleLike(id ) {
        await api.post(`/posts/${id}/like`);
    }

    return(
        <View style={styles.container}>
            <FlatList 
                data={feed}
                keyExtractor={post => post._id}
                renderItem={({ item }) => (
                    <View style={styles.feedItem}>
                        <View style={styles.feedItemHeader}>
                            <View style={styles.userInfo}>
                                <Text styles={styles.name}>{item.author}</Text>
                                <Text styles={styles.place}>{item.place}</Text>
                            </View>

                            <Image source={more} />
                        </View>

                        <Image style={styles.feedImage} source={{ uri: `http://192.168.10.165:3333/files/${item.image}` }} />

                        <View style={styles.feedItemFooter}>
                            <View style={styles.actions}> 
                                <TouchableOpacity style={styles.action} onPress={() => handleLike(item._id)}>
                                    <Image source={like}/>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.action} onPress={() => {}}>
                                    <Image source={comment}/>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.action} onPress={() => {}}>
                                    <Image source={send}/>
                                </TouchableOpacity>
                            </View>

                            <Text style={styles.likes}>
                                {item.likes} curtidas
                            </Text>

                            <Text style={styles.description}>
                                {item.description}
                            </Text>

                            <Text style={styles.hashtags}>
                                {item.hashtags}
                            </Text>
                        </View>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
    },

    feedItem: {
        marginTop: 20,
    },

    feedItemHeader: {
        paddingHorizontal: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    name: {
        fontSize: 14,
        color: '#000',
    },

    place: {
        fontSize: 12,
        color: '#666',
        marginTop: 2,
    },

    feedImage: {
        width: '100%',
        height: 400,
        marginVertical: 15,
    },

    feedItemFooter: {
        paddingHorizontal: 15,    
    },

    actions: {
        flexDirection: 'row',
    },

    action: {
        marginRight: 8,
    },

    likes: {
        marginTop: 15,
        fontWeight: 'bold',
        color: '#000',
    },

    description: {
        lineHeight: 18,
        color: '#000',
    },

    hashtags: {
        color: '#7159c1'
    },

    userInfo: {

    },










});