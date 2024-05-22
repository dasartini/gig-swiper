import { Button, Text } from "react-native";
import { signOut } from "firebase/auth";
import { auth } from "../config/Config";
import { Search } from "../components/Search";
import { useState } from "react";

function handleLogout() {
  return signOut(auth)
    .then((data) => {
      console.log(data, "was an error");
    })
    .catch((err) => {
      console.log(err, "EEEEEEEEEEEEEEEE");
    });
}

export const headerStyle = {
  headerStyle: {
    backgroundColor: "#f4511e",
  },
  headerTintColor: "#fff",
  headerTitleStyle: {
    fontWeight: "bold",
  },
  headerRight: () => (
    <Button
      onPress={handleLogout}
      title="Log Out"
      color="#666"
      style={(marginHorizontal = 50)}
    ></Button>
  ),
};
