import * as React from "react";
import { StyleSheet, View } from "react-native";
import Logo1 from "../assets/logo.svg";
import { Color } from "../GlobalStyles";

export type LogoType = {
  /** Variant props */
  shape?: string;
};

const Logo = ({ shape = "square" }: LogoType) => {
  return (
    <View style={styles.logo}>
      <View style={styles.brandColor} />
      <Logo1 style={styles.logoIcon} width={39} height={40} />
    </View>
  );
};

const styles = StyleSheet.create({
  brandColor: {
    height: "100%",
    width: "100%",
    top: "0%",
    right: "0%",
    bottom: "0%",
    left: "0%",
    backgroundColor: Color.aIColorsAiBrandColor,
    overflow: "hidden",
    display: "none",
    position: "absolute",
  },
  logoIcon: {
    marginTop: -19.8,
    marginLeft: -19.8,
    top: "50%",
    left: "50%",
    position: "absolute",
  },
  logo: {
    width: 40,
    borderRadius: 44,
    height: 40,
  },
});

export default Logo;
