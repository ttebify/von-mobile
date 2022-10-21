//import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import { ScrollView, View } from 'react-native';
import PostComp from '../components/PostComp';

  function PostScreen({navigation, route}) {
    const isFocused = navigation.isFocused();
    const id = route.params?.title ? route.params?.id : 0;

    const args = {navigation, isFocused, id};
  
      return (
          <ScrollView style={{flex:1}}>
            <PostComp {...args} />
          </ScrollView>
      );

  }

export default PostScreen;