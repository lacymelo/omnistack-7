import React, { useState, useEffect } from "react";
import api from '../services/api';
import io from 'socket.io-client';

import './Feed.css';

import more from "../assets/more.svg";
import like from "../assets/like.svg";
import comment from "../assets/comment.svg";
import send from "../assets/send.svg";

export default function Feed() {

    const [feed, setFeed] = useState([]);

    const socket = io('http://localhost:3333');

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
        api.post(`/posts/${id}/like`);
    }

    return (
        <>
            <section id="post-list">
                {
                    feed.map(post => (
                        <article key={post._id}>
                        <header>
                            <div className="user-info">
                                <span>{post.author}</span>
                                <span className="place">{post.place}</span>
                            </div>

                            <img src={more} alt="Mais" />
                        </header>

                        <img src={`http://localhost:3333/files/${post.image}`} alt="" />
                        <footer>
                            <div className="actions">
                                {/* passagem de função como referência */}
                                <button onClick={ () => handleLike(post._id)}>
                                    <img src={like} alt="" />
                                </button>

                                <img src={comment} alt="" />
                                <img src={send} alt="" />
                            </div>

                            <strong>{post.likes} curtidas</strong>

                            <p>{post.description}
                                <span>{post.hashtags}</span>
                            </p>
                        </footer>
                    </article>
                    ))
                }
            </section>
        </>
    );
}