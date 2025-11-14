import React from "react-native";
import { Image } from "react-native";

const logo = require("../assets/logo.png");

export default function Logo(props) {

  return <Image source={logo} style={{ width: 200, height: 200 }} />;

}