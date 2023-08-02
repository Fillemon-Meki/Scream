import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';
import { Video } from 'expo-av';
import Modal from 'react-native-modal';

const CommentList = ({ post, handleAddComment }) => {
  const [newComment, setNewComment] = useState('');

  const addComment = () => {
    handleAddComment(post, newComment);
    setNewComment('');
  };

  return (
    <Modal isVisible={true} backdropOpacity={0.5}>
      <View style={styles.commentFormContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add your comment..."
          value={newComment}
          onChangeText={setNewComment}
        />
        <TouchableOpacity style={styles.addButton} onPress={addComment}>
          <Text style={styles.buttonText}>Add Comment</Text>
        </TouchableOpacity>
        {post.comments.map((comment, index) => (
          <View key={index} style={styles.comment}>
            <Text>{comment}</Text>
          </View>
        ))}
      </View>
    </Modal>
  );
};

const CommunityScreen = ({ userName }) => {
  const [posts, setPosts] = useState([]);
  const [postFormVisible, setPostFormVisible] = useState(false);
  const [cameraVisible, setCameraVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUri, setImageUri] = useState('');
  const [videoUri, setVideoUri] = useState('');
  const [isCameraReady, setCameraReady] = useState(false);
  const [commentsVisibleIndex, setCommentsVisibleIndex] = useState(-1);
  const cameraRef = useRef(null);

  const handleCreatePost = (newPost) => {
    setPosts([...posts, { ...newPost, comments: [] }]);
  };

  const handleImagePick = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        base64: true,
      });

      if (!result.cancelled) {
        setImageUri(`data:image/jpeg;base64,${result.base64}`);
      }
    } catch (error) {
      console.log('ImagePicker Error:', error);
    }
  };

  const handleOpenCamera = () => {
    setCameraVisible(true);
    setVideoUri('');
  };

  const handlePostSubmit = () => {
    if (title.trim() === '' || description.trim() === '') {
      return;
    }

    handleCreatePost({ title, description, imageUri, videoUri });
    setTitle('');
    setDescription('');
    setImageUri('');
    setVideoUri('');
    setPostFormVisible(false);
  };

  const togglePostForm = () => {
    setPostFormVisible(!postFormVisible);
  };

  const toggleCommentsVisible = (index) => {
    setCommentsVisibleIndex(commentsVisibleIndex === index ? -1 : index);
  };

  const handleTakePicture = async () => {
    if (cameraRef.current) {
      try {
        let photo = await cameraRef.current.takePictureAsync();
        setImageUri(photo.uri);
      } catch (error) {
        console.log('Error taking picture:', error);
      }
    }
  };

  const handleRecordVideo = async () => {
    if (cameraRef.current) {
      try {
        if (!videoUri) {
          // Start recording
          let videoRecordPromise = cameraRef.current.recordAsync();
          if (videoRecordPromise) {
            const data = await videoRecordPromise;
            setVideoUri(data.uri);
          }
        } else {
          // Stop recording
          await cameraRef.current.stopRecording();
        }
      } catch (error) {
        console.log('Video recording failed:', error);
      }
    }
  };

  const handleAddComment = (post, comment) => {
    const updatedPosts = posts.map((p) => {
      if (p === post) {
        return { ...p, comments: [...p.comments, comment] };
      }
      return p;
    });
    setPosts(updatedPosts);
  };

  const getGreeting = () => {
    const currentHour = new Date().getHours();
    if (currentHour >= 5 && currentHour < 12) {
      return 'Good Morning';
    } else if (currentHour >= 12 && currentHour < 18) {
      return 'Good Afternoon';
    } else {
      return 'Good Evening';
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Community</Text>
      <Text style={styles.userNameText}>{getGreeting()}: {userName}</Text>

      {/* "New Post" button with absolute positioning */}
      <TouchableOpacity
        style={[styles.addButton, styles.newPostButton]}
        onPress={togglePostForm}
      >
        <Ionicons name="create-outline" size={24} color="#000" />
      </TouchableOpacity>

      <Modal 
        isVisible={postFormVisible || cameraVisible}
        onBackdropPress={() => {
          setPostFormVisible(false);
          setCameraVisible(false);
        }}
        backdropOpacity={0.5}
      >
        {cameraVisible ? (
          <View style={styles.cameraContainer}>
            <Camera
              ref={cameraRef}
              style={styles.camera}
              type={Camera.Constants.Type.back}
              ratio="4:3"
              onCameraReady={() => setCameraReady(true)}
            >
              <View style={styles.cameraButtonsContainer}>
                <TouchableOpacity
                  style={styles.cameraButton}
                  onPressIn={handleRecordVideo}
                  onPressOut={() => handleRecordVideo()}
                >
                  <Ionicons name={videoUri ? 'stop-circle-outline' : 'radio-button-on'} size={50} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.cameraButton} onPress={handleTakePicture}>
                  <Ionicons name="camera-outline" size={40} color="#fff" />
                </TouchableOpacity>
              </View>
            </Camera>
            <TouchableOpacity
              style={styles.closeCameraButton}
              onPress={() => setCameraVisible(false)}
            >
              <Ionicons name="close-outline" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.postFormContainer}>
            <TextInput
              style={styles.input}
              placeholder="Title..."
              value={title}
              onChangeText={setTitle}
            />
            <TextInput
              style={styles.input}
              placeholder="Description..."
              value={description}
              onChangeText={setDescription}
            />
            <TouchableOpacity style={styles.addButton} onPress={handleImagePick}>
              <Text style={styles.buttonText}>Pick Image</Text>
            </TouchableOpacity>
            {imageUri !== '' && <Image source={{ uri: imageUri }} style={styles.imagePreview} />}
            <TouchableOpacity style={styles.addButton} onPress={handleOpenCamera}>
              <Text style={styles.buttonText}>Open Camera</Text>
            </TouchableOpacity>
            {videoUri !== '' && (
              <Video
                source={{ uri: videoUri }}
                style={styles.videoPreview}
                useNativeControls
                resizeMode="contain"
              />
            )}
            <TouchableOpacity style={styles.addButton} onPress={handlePostSubmit}>
              <Text style={styles.buttonText}>Create Post</Text>
            </TouchableOpacity>
          </View>
        )}
      </Modal>
      <View style={styles.postListContainer}>
        <Text style={styles.subtitle}>Posts:</Text>
        {posts.map((post, index) => (
          <View key={index} style={styles.postContainer}>
            <Text style={styles.postTitle}>{post.title}</Text>
            <Text style={styles.postDescription}>{post.description}</Text>
            {post.imageUri !== '' && <Image source={{ uri: post.imageUri }} style={styles.postImage} />}
            <TouchableOpacity
              style={styles.commentsButton}
              onPress={() => toggleCommentsVisible(index)}
            >
              <Ionicons name="chatbubble-ellipses-outline" size={24} color="#000" />
              <Text style={styles.buttonText}>
                Comments ({post.comments.length})
              </Text>
            </TouchableOpacity>
            {commentsVisibleIndex === index && (
              <CommentList post={post} handleAddComment={handleAddComment} />
            )}
          </View>
        ))}
      </View>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#fb5b5a',
  },
  userNameText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#000000',
  },
  addButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    borderRadius: 50,
    marginVertical: 5,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    backgroundColor: 'white', 
  },
  buttonText: {
    color: '#000000',
    fontSize: 18,
    marginLeft: 10,
  },
  newPostButton: {
    position: 'absolute',
    bottom: 10,
    right: 20,
    width: 80,
    height: 80,
    backgroundColor: '#fb5b5a',
  },
postFormContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#fff',
    marginVertical: 10,
    elevation: 2,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 15,
    fontSize: 18,
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: '#f5f5f5',
  },
  imagePreview: {
    width: '100%',
    height: 200,
    marginBottom: 10,
    borderRadius: 10,
  },
  cameraContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  cameraButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  cameraButton: {
    padding: 15,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginHorizontal: 20,
  },
  closeCameraButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
    borderRadius: 20,
  },
  postListContainer: {},
  postContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
    elevation: 2,
  },
  postTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#fb5b5a',
  },
  postDescription: {
    fontSize: 16,
    marginBottom: 10,
    color: '#333',
  },
  postImage: {
    width: '100%',
    height: 200,
    marginBottom: 10,
    borderRadius: 10,
  },
  commentsButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fb5b5a',
    padding: 15,
    borderRadius: 30,
    marginVertical: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
  },
  commentsContainer: {},
  comment: {
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: '#f5f5f5',
  },
  subtitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2089dc',
  },
});


export default CommunityScreen;
