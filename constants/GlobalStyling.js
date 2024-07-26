/* 
HOW TO IMPORT:
import {styles} from '../constants/GlobalStyling.js'

HOW TO USE:
<Text style = {styles.plainText}> (for example)

It is possible to combine inline style with this style const:
 <View style={[{ flex: 1, alignItems: "center", justifyContent: "center" }, styles.background]}> (for example)
*/

import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  // For use in plain text, content
   // For use in plain text, content
   plainText: {
    fontFamily: "InterRegular",
    fontSize: 16
  },
  // Use for styling of 'Read More' button
  readMore_text:{
    fontFamily: "DMSerif",
    fontSize: 26,
  },
   // Use for styling of 'Next step/Start page' button
   nextStep_text:{
    fontFamily: "DMSerif",
    fontSize: 22,
    
  },


  // For use in drawer items, titles, etc
  titleText: {
    fontFamily: "DMSerif",
    fontSize: 30
  }, // Standard background color
   // Standard background color
   background: {
    backgroundColor: "#F2EEE3"
  },

});
