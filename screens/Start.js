import * as React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { styles } from "../constants/GlobalStyling.js";
import { start_text} from '../constants/TextParagraphs.js';
import { scrollViewRef as svrCalmness} from './CalmnessScreen.js';

export default function Start({ navigation }) {
  const onTap = () => {
  if(svrCalmness != null){
    svrCalmness.current.scrollTo({ x: 0, y: 0, animated: false})
  }
  navigation.navigate("Calmness");
}

  return (
    <View style={[localStyle.container, styles.background]}>
      <ImageBackground
        source={require("../assets/Grafisk-profil/start-background.png")}
        style={localStyle.backgroundImage}
      >
        <Image
          source={require("../assets/Grafisk-profil/Allequal_profilkit_230315/Allequal-logo/Logo/PNG/AllEqual-GREEN.png")}
          style={localStyle.image}
        />

        <Text style={[styles.plainText, localStyle.text]}>
          {start_text[0]}
        </Text>

        <TouchableOpacity style={localStyle.button} onPress={onTap}>
          <Text style={[localStyle.buttonText, styles.titleText]}>
          {start_text[1]}
          </Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
}
const localStyle = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    alignSelf: "center",
    width: 316,
    height: 78,
    marginTop: 100,
  },
  button: {
    alignSelf: "center",
    backgroundColor: "00FFFFFF",
    marginTop: 100,
  },
  buttonText: {
    fontSize: 32,
    color: "#000000",
  },
  text: {
    textAlign: "left",
    marginHorizontal: 40,
    marginTop: 50,
  },
  backgroundImage: {
    flex: 1,
  },
});
