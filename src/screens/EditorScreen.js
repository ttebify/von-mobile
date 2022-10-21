import React from 'react';
//import {TestForm} from '../builder/TestForm';
import AppEditor from '../builder/containers/AppEditorContainer';
import { IconButton } from 'react-native-paper';



function EditorScreen({navigation}) {

  const isFocused = navigation.isFocused();
  
  if(isFocused){
    return <AppEditor navigation={navigation} isFocused={isFocused} />;
  }else{
    return null;
  }
}



export default EditorScreen;