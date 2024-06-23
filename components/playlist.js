// import React, { useState } from 'react';
// import { View, StyleSheet, FlatList, ImageBackground, Alert } from 'react-native';
// import { List, Avatar, IconButton, Searchbar, Divider,ActivityIndicator  } from 'react-native-paper';

// const initialPlaylist = [
//   { id: '1', title: 'Song One', artist: 'Artist One' },
//   { id: '2', title: 'Song Two', artist: 'Artist Two' },
//   { id: '3', title: 'Song Three', artist: 'Artist Three' },
//   // Add more songs as needed
// ];

// const PlaylistScreen = () => {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [playlist, setPlaylist] = useState(initialPlaylist);

//   const onChangeSearch = query => setSearchQuery(query);

//   const filteredPlaylist = playlist.filter(song =>
//     song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     song.artist.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const renderItem = ({ item }) => (
//     <View>
//       <List.Item
//         title={item.title}
//         description={item.artist}
//         left={props => <Avatar.Icon {...props} icon="music" />}
//         right={props => <IconButton {...props} icon="play-circle" onPress={() => {}} />}
//       />
//       <Divider />
//     </View>
//   );

//   return (
//     <ImageBackground source={require('../assets/mbg2.png')} style={styles.backgroundImage}>
//       <View style={styles.overlay} />
//       <View style={styles.container}>
//         <Searchbar
//           placeholder="Search"
//           onChangeText={onChangeSearch}
//           value={searchQuery}
//           style={styles.searchbar}
//         />
//         <FlatList
//           data={filteredPlaylist}
//           renderItem={renderItem}
//           keyExtractor={item => item.id}
//         />
//       </View>
//     </ImageBackground>
//   );
// };

// const styles = StyleSheet.create({
//   backgroundImage: {
//     flex: 1,
//     resizeMode: 'cover',
//     justifyContent: 'center',
//   },
//   overlay: {
//     ...StyleSheet.absoluteFillObject,
//     backgroundColor: 'rgba(0,0,0,0.5)', // Optional: adds a dark overlay for better text visibility
//   },
//   container: {
//     flex: 1,
//     padding: 16,
//     backgroundColor: 'rgba(255, 255, 255, 0.6)', // Optional: adds a slight background color to the content
//     borderRadius: 10,
//     margin: 10,
//   },
//   searchbar: {
//     marginBottom: 16,
//   },
// });

// export default PlaylistScreen;


import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, ImageBackground, Alert } from 'react-native';
import { List, Avatar, IconButton, Searchbar, Divider, ActivityIndicator } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import axiosInstance from './axiosInstance';
import axios from 'axios';
// import RNFS from 'react-native-fs';
import Video from 'react-native-video';
import { parseM3U } from '../utils/m3uParser';

const PlaylistScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [playlist, setPlaylist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentMedia, setCurrentMedia] = useState(null);
 const playlistUrl = useSelector((state) => state.auth.user.playlist);
  useEffect(() => {
    const fetchPlaylist = async () => {
      try {
        const response = await axios.get(playlistUrl); // Replace with your server URL
        const parsedPlaylist = parseM3U(response.data);
        setPlaylist(parsedPlaylist);
      } catch (error) {
        Alert.alert('Error', 'Failed to fetch playlist: ' + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPlaylist();
  }, []);

  const onChangeSearch = query => setSearchQuery(query);

  const playMedia = async (mediaUrl) => {
    setCurrentMedia(mediaUrl);
  };

  const renderItem = ({ item }) => (
    <View>
      <List.Item
        title={item.title}
        description={`Duration: ${item.duration}s`}
        left={props => <Avatar.Icon {...props} icon="video" />}
        right={props => <IconButton {...props} icon="play-circle" onPress={() => playMedia(item.url)} />}
      />
      <Divider />
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator animating={true} size="large" />
      </View>
    );
  }

  return (
    <ImageBackground source={require('../assets/mbg2.png')} style={styles.backgroundImage}>
      <View style={styles.overlay} />
      <View style={styles.container}>
        <Searchbar
          placeholder="Search"
          onChangeText={onChangeSearch}
          value={searchQuery}
          style={styles.searchbar}
        />
        <FlatList
          data={playlist.filter(item => item.title.toLowerCase().includes(searchQuery.toLowerCase()))}
          renderItem={renderItem}
          keyExtractor={item => item.url}
        />
        {currentMedia && (
          <Video
            source={{ uri: currentMedia }}
            style={styles.videoPlayer}
            controls={true}
            resizeMode="contain"
            onEnd={() => setCurrentMedia(null)}
          />
        )}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 10,
    margin: 10,
  },
  searchbar: {
    marginBottom: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoPlayer: {
    height: 300,
    marginTop: 16,
  },
});

export default PlaylistScreen;

