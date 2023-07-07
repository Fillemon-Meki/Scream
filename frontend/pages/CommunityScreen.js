import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image } from 'react-native';

const CommunityScreen = () => {
  const [posts, setPosts] = useState([]);

  const handleCreatePost = (newPost) => {
    setPosts([...posts, newPost]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Community Screen</Text>
      <PostForm handleCreatePost={handleCreatePost} />
      <PostList posts={posts} />
    </View>
  );
};

const PostForm = ({ handleCreatePost }) => {
  const [text, setText] = useState('');
  const [image, setImage] = useState(null);

  const handleTextChange = (value) => {
    setText(value);
  };

  const handleImageChange = (imageData) => {
    setImage(imageData);
  };

  const handlePostSubmit = () => {
    const newPost = {
      text,
      image,
      timestamp: new Date().getTime(),
    };
    handleCreatePost(newPost);
    setText('');
    setImage(null);
  };

  return (
    <View style={styles.postFormContainer}>
      <TextInput
        style={styles.input}
        placeholder="Enter your post"
        value={text}
        onChangeText={handleTextChange}
        multiline
      />
      <TouchableOpacity style={styles.addButton} onPress={handlePostSubmit}>
        <Text style={styles.buttonText}>Add Post</Text>
      </TouchableOpacity>
      <ImageInput onImageChange={handleImageChange} />
    </View>
  );
};

const ImageInput = ({ onImageChange }) => {
  const [image, setImage] = useState(null);

  const handleImageSelection = (imageData) => {
    setImage(imageData);
    onImageChange(imageData);
  };

  return (
    <View>
      <TouchableOpacity style={styles.imageInputButton} onPress={handleImageSelection}>
        <Text style={styles.buttonText}>Select Image</Text>
      </TouchableOpacity>
      {image && <Image source={{ uri: image }} style={styles.selectedImage} />}
    </View>
  );
};

const PostList = ({ posts }) => {
  return (
    <View style={styles.postListContainer}>
      <Text style={styles.subtitle}>Recent Posts:</Text>
      {posts.map((post, index) => (
        <PostItem key={index} post={post} />
      ))}
    </View>
  );
};

const PostItem = ({ post }) => {
  const { text, image, timestamp } = post;

  return (
    <View style={styles.postItemContainer}>
      <Text style={styles.postText}>{text}</Text>
      {image && <Image source={{ uri: image }} style={styles.postImage} />}
      <Text style={styles.postTimestamp}>{new Date(timestamp).toLocaleString()}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  postFormContainer: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#888888',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: '#888888',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  imageInputButton: {
    backgroundColor: '#888888',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginBottom: 10,
  },
  selectedImage: {
    width: 200,
    height: 200,
    marginBottom: 10,
  },
  postListContainer: {
    flex: 1,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  postItemContainer: {
    borderWidth: 1,
    borderColor: '#888888',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  postText: {
    fontSize: 16,
    marginBottom: 10,
  },
  postImage: {
    width: '100%',
    height: 200,
    marginBottom: 10,
  },
  postTimestamp: {
    color: '#888888',
    fontSize: 12,
  },
});

export default CommunityScreen;
