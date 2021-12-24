import React, { useState } from "react";
import api from "../services/api";
import { useNavigation } from "@react-navigation/native";
import { Text, View, StyleSheet, TextInput, Image, TouchableOpacity } from "react-native";
import * as ImagePicker from 'expo-image-picker';


export default function New(){
    const navigation = useNavigation();

    const [preview, setPreview] = useState(null);

    const [data, setData] = useState({
        image: null,
        author: '',
        place: '',
        description: '',
        hashtags: ''
    });
    
    async function pickImage(){
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          base64: true,
          aspect: [4, 3],
          quality: 1,
        });

        if (!result.cancelled) {
          setPreview(result.uri);
        }

        let prefix;
        let ext;
    
        if (!result.cancelled) {
            prefix = new Date().getTime();
            ext = 'jpg';

            const image = {
                uri: result.uri,
                type: result.type,
                name: `${prefix}.${ext}`
            }

            setData({...data, image});
        }
    }

    async function handleSubmit() {
        const form = new FormData();

        form.append('image', data.image);
        form.append('author', data.author);
        form.append('place', data.place);
        form.append('description', data.description);
        form.append('hashtags', data.hashtags);

        const response = await api.post('/posts', form);

        console.log(response);

        // navigation.navigate('Feed');
    }
    
    return(
        <View style={styles.container}>
            <TouchableOpacity style={styles.selectButton} onPress={pickImage}>
                <Text style={styles.selectButtonText}>
                    Selecionar Imagem
                </Text>
            </TouchableOpacity>

            {preview && <Image source={{ uri: preview }} style={{ width: '100%', height: 200 }} />}


            <TextInput 
                style={styles.input}
                autoCorrect={false}
                autoCapitalize="none"
                placeholder="Nome do author"
                placeholderTextColor="#999"
                value={data.author}
                onChangeText={author => setData({...data, author})}
            />

            <TextInput 
                style={styles.input}
                autoCorrect={false}
                autoCapitalize="none"
                placeholder="Local da foto"
                placeholderTextColor="#999"
                value={data.place}
                onChangeText={place => setData({...data, place})}
            />

            <TextInput 
                style={styles.input}
                autoCorrect={false}
                autoCapitalize="none"
                placeholder="Descrição"
                placeholderTextColor="#999"
                value={data.description}
                onChangeText={description => setData({...data, description})}
            />

            <TextInput 
                style={styles.input}
                autoCorrect={false}
                autoCapitalize="none"
                placeholder="Hashtags"
                placeholderTextColor="#999"
                value={data.hashtags}
                onChangeText={hashtags => setData({...data, hashtags})}
            />

            <TouchableOpacity style={styles.shareButton} onPress={handleSubmit}>
                <Text style={styles.shareButtonText}>
                    Compartilhar
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 20,
      paddingTop: 30,
    },
  
    selectButton: {
      borderRadius: 4,
      borderWidth: 1,
      borderColor: '#CCC',
      borderStyle: 'dashed',
      height: 42,
  
      justifyContent: 'center',
      alignItems: 'center',
    },
  
    selectButtonText: {
      fontSize: 16,
      color: '#666',
    },
  
    preview: {
      width: 100,
      height: 100,
      marginTop: 10,
      alignSelf: 'center',
      borderRadius: 4,
    },
  
    input: {
      borderRadius: 4,
      borderWidth: 1,
      borderColor: '#ddd',
      padding: 15,
      marginTop: 10,
      fontSize: 16,
    },
  
    shareButton: {
      backgroundColor: '#7159c1',
      borderRadius: 4,
      height: 42,
      marginTop: 15,
  
      justifyContent: 'center',
      alignItems: 'center',
    },
  
    shareButtonText: {
      fontWeight: 'bold',
      fontSize: 16,
      color: '#FFF',
    },
});