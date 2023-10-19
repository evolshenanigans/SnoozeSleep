import {
  Text,
  SafeAreaView,
  StyleSheet,
  View,
  TouchableOpacity,
  SafeAreaViewBase,
} from "react-native";
import { FIREBASE_AUTH } from "../services/FirebaseConfig";
import React from "react";

const Account = ({ currentUser }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Account Settings</Text>
      <View style={styles.section}>
        <Text style={styles.section}>Profile Information</Text>
        {renderCard("username")}
        {renderCard("Email")}
        <View style={styles.separator} />
        {renderCard("Birthday")}
        {renderCard("Password Settings")}
        {renderCard("Alarm Settings")}
      </View>
      <View style={styles.separator} />
      {renderCard("Sign Out", () => {
        FIREBASE_AUTH.signOut();
        console.log("tried to sign you out.");
      })}
    </SafeAreaView>
  );
};

function renderCard(text: string, handlePress?) {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.card}>
        <Text style={styles.username}>{text}</Text>
        <TouchableOpacity onPress={handlePress}>
          <Text style={styles.arrow}>&gt;</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: "#ecf0f1",
    padding: 8,
  },
  header: {
    backgroundColor: "#d9d9d9",
    paddingVertical: 10,
    paddingHorizontal: 16,
    fontSize: 18,
    fontWeight: "bold",
  },
  section: {
    marginBottom: 20,
  },
  cardContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 5,
  },
  card: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#F1E8E5",
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  username: {
    fontSize: 16,
  },
  separator: {
    borderBottomWidth: 4,
    borderBottomColor: "#f1e8e5",
    marginVertical: 30,
  },
  arrow: {
    fontSize: 20,
    marginRight: 10,
  },
});

export default Account;
