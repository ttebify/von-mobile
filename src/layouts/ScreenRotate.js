import React from "react";
import { View } from "react-native";
import * as ScreenOrientation from 'expo-screen-orientation';

export default class ScreenRotate extends React.Component {
  UNSAFE_componentWillMount() {
    /*        Dimensions.addEventListener('change', ()=>{
            if(this.props.onChange){
                this.props.onChange();
            }
        });
*/
  }

  componentWillUnmount() {
    //Dimensions.removeEventListener('change');
  }

  componentDidMount() {
    (async function changeScreenOrientation() {
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.ALL);
    })();
  }

  render() {
    const { children } = this.props;
    return <View>{children ? children : null}</View>;
  }
}
