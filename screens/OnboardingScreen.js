import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
import React from "react";
import { theme } from "../infrastructure/theme";
import Onboarding from "react-native-onboarding-swiper";
import { Button } from "react-native-elements";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

const Square = ({ isLight, selected }) => {
  let backgroundColor;
  if (isLight) {
    backgroundColor = selected ? "rgba(0, 0, 0, 0.8)" : "rgba(0, 0, 0, 0.3)";
  } else {
    backgroundColor = selected ? "#fff" : "rgba(255, 255, 255, 0.5)";
  }
  return (
    <View
    // style={{
    //     width: 6,
    //     height: 6,
    //     marginHorizontal: 3,
    //     backgroundColor,
    // }}
    />
  );
};

const backgroundColor = (isLight) => (isLight ? "blue" : "lightblue");
const color = (isLight) => backgroundColor(!isLight);

const nextAndDoneStyle = {
  backgroundColor: theme.colors.bg.primary,
  borderRadius: 50,
  width: 50,
  height: 50,
  justifyContent: "center",
  alignItems: "center",
  marginRight: 10,
  marginBottom: 20,
};

const Done = ({ isLight, ...props }) => (
  <Button
    title={
      <AntDesign name="arrowright" size={24} color={theme.colors.text.white} />
    }
    buttonStyle={nextAndDoneStyle}
    containerViewStyle={{
      marginVertical: 10,
      width: 70,
      backgroundColor: backgroundColor(isLight),
    }}
    textStyle={{ color: color(isLight) }}
    {...props}
  />
);

const Skip = ({ isLight, skipLabel, ...props }) => (
  <Text style={styles.skipStyle} {...props}>Skip</Text>
);

const Next = ({ isLight, ...props }) => (
  <Button
    title={
      <AntDesign name="arrowright" size={24} color={theme.colors.text.white} />
    }
    buttonStyle={nextAndDoneStyle}
    containerViewStyle={{
      marginVertical: 10,
      width: 70,

      backgroundColor: theme.colors.bg.primary,
    }}
    textStyle={{ color: color(isLight) }}
    {...props}
  />
);

export default function OnboardingScreen() {
  const navigation = useNavigation()
  const handleDone = () => {
    navigation.navigate("Auth")
  }
  return (
    <View style={styles.container}>
      <Onboarding
        onDone={handleDone}
        onSkip={handleDone}
        bottomBarHeight={70}
        bottomBarColor={theme.colors.bg.white}
        DotComponent={Square}
        NextButtonComponent={Next}
        SkipButtonComponent={Skip}
        DoneButtonComponent={Done}
        subTitleStyles={{
          fontFamily: theme.fonts.heading,
          color: theme.colors.text.primary,
          fontSize: 35,
          fontWeight: "600",
          lineHeight: 60,
          paddingHorizontal: 20,
          marginLeft: 0,
          width: width,
          marginTop: 20,
        }}
        titleStyles={{
          height: 0,
        }}
        imageContainerStyles={{
          paddingBottom: 0,
        }}
        pages={[
          {
            backgroundColor: "#fff",
            image: (
              <View style={styles.onboardContainer}>
                <Image
                  style={styles.onboradImage}
                  source={require("../assets/onboard-1.png")}
                />
              </View>
            ),
            title: "",
            subtitle: (
              //   <Text style={styles.titleStyles}>
              "Find fuel stations nearby, anytime, anywhere."
              //   </Text>
            ),
            subTitleStyles: {
              textAlign: "left",
            }
          },
          {
            backgroundColor: "#fff",
            image: (
              <View style={styles.onboardContainer}>
                <Image
                  style={styles.onboradImage}
                  source={require("../assets/onboard-2.png")}
                />
              </View>
            ),
            title: "",
            subtitle: (
              //   <Text style={styles.titleStyles}>
              "Navigate fuel options and filter through prices effortlessly."
              //   </Text>
            ),
            subTitleStyles: {
              textAlign: "right",
            },
          },
          {
            backgroundColor: "#fff",
            image: (
              <View style={styles.onboardContainer}>
                <Image
                  style={styles.onboradImage}
                  source={require("../assets/onboard-3.png")}
                />
              </View>
            ),
            title: "",
            subtitle: (
              //   <Text style={styles.titleStyles}>
              "Receive instant alerts on fuel availability and price fluctuations."
              //   </Text>
            ),
            subTitleStyles: {
              textAlign: "left",
            },
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.bg.white,
  },
  skipStyle: {
    color: theme.colors.text.primary,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.text.primary,
    fontSize: 16,
    marginLeft: 10,
    marginBottom: 20,
  },
  nextStyle: {},
  titleStyles: {
    color: theme.colors.text.primary,
    fontSize: 35,
    fontWeight: "600",
    lineHeight: 60,
    paddingLeft: 20,
    marginLeft: 0,
    width: width,
    marginTop: 20,
  },
  onboardContainer: {
    justifyContent: "center",
    alignItems: "flex-end",
    width: width * 0.9,
    height: height * 0.5,
    marginLeft: "auto",
    marginTop: 10,
    paddingBottom: 0,
  },
  onboradImage: {
    width: width * 0.85,
    resizeMode: "contain",
    padding: 0,
  },
});
