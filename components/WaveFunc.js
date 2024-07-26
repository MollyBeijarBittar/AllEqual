import { MotiView } from "moti";
import * as React from "react";
import { StyleSheet, View } from "react-native";
import { Easing } from "react-native-reanimated";

const _color = "#FFA819";
const _size = 100;

//Use wavefunction wherever by: import {WaveFunction} from "/components/Wavefunc.js"
//Then implementing it wherever by <WaveFunction />
export class WaveFunction extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <View style={[styles.dot, styles.center]}>
          {[...Array(6).keys()].map((index) => {
            return (
              <MotiView
                from={{ opacity: 0.7, scale: 1 }}
                animate={{
                  opacity: 0,
                  scale: 4,
                }}
                transition={{
                  type: "timing",
                  duration: 4500,
                  easing: Easing.out(Easing.ease),
                  delay: index * 200,
                  loop: true,
                }}
                key={index}
                style={[
                  StyleSheet.absoluteFillObject,
                  styles.dot,
                  styles.center,
                ]}
              />
            );
          })}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  dot: {
    width: _size,
    height: _size,
    borderRadius: _size,
    backgroundColor: _color,
    opacity: 0.7,
    zIndex: 1,
  },
  center: { alignItems: "center", justifyContent: "center" },
});

// Items to add after fixing calmness
/*   
import { WaveFunction } from "../components/WaveFunc.js";
const [showBreathing, setShowBreathing] = useState(false);
function WaveClassToFunc() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <WaveFunction />
      </View>
    );
  }

    <View style={localStyles.container}>
        <Text style={localStyles.subHeaderText}>Breathe in...</Text>
        {showBreathing ? null : <WaveClassToFunc />}
        {Next Step Text & Next Step Icon }
        <Text style={[styles.titleText, localStyles.nextStepText]}>
          Next Step
        </Text>

        <TouchableOpacity
          style={[localStyles.nextStepArrow]}
          onPress={() => {
            handleNextStep();
          }}
        >
          <AntDesign name="circledowno" size={48} color="black" />
        </TouchableOpacity>
      </View>
  */
