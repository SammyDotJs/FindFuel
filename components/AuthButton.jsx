import React from "react";
import { theme } from "../infrastructure/theme";
import { Button } from "react-native-elements";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function AuthButton(props) {
  return (
    <Button
      title={props.title}
      buttonStyle={{
        backgroundColor: props.backgroundColor,
        width: props.width ? props.width : wp(90),
        borderRadius: 23,
        color: props.color,
        borderWidth: props.borderWidth,
        borderColor: props.borderColor,
      }}
      containerViewStyle={{
        marginVertical: 10,
        width: 70,
        backgroundColor: theme.colors.bg.primary,
      }}
      titleStyle={{
        color: props.color,
        fontFamily: theme.fonts.bold,
        fontSize: props.fontSize ? props.fontSize : hp(2),
        fontWeight: "600",
        paddingVertical: props.paddingVertical && hp(0.6),
      }}
      onPress={props.handleAction}
    />
  );
}
