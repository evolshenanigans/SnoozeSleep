import { View, Text, Pressable, StyleSheet } from "react-native";
import React from "react";
import { colors } from "./utils/colors";
import { useRouter } from "expo-router";

const SetupLaterModal = ({ setShowModal, whereToNext }) => {
  const router = useRouter();
  return (
    <View style={{ position: "absolute", width: "100%", height: "100%", top: 0 }}>
      <View style={styles.overlay}>
        <View style={styles.modalContent}>
          <Text style={{ color: colors.themeWhite, textAlign: "center" }}>
            Are you sure you want to set up later?
          </Text>
          <Pressable
            style={[styles.btn, styles.cancelBtn]}
            onPress={() => setShowModal(false)}
          >
            <Text style={[styles.btnText, styles.cancelBtnText]}>Cancel</Text>
          </Pressable>
          <Pressable
            style={[styles.btn, styles.continueBtn]}
            onPress={() => router.replace(whereToNext)}
          >
            <Text style={[styles.btnText]}>Yes, Set Up Later</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default SetupLaterModal;

const styles = StyleSheet.create({
  btn: {
    width: "80%",
    paddingVertical: 10,
    alignSelf: "center",
    marginTop: 20,
    borderRadius: 20,
  },
  btnText: {
    textAlign: "center",
    fontWeight: "500",
  },
  modalContent: {
    width: 250,
    padding: 20,
    borderRadius: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.themeBackground,
  },
  cancelBtn: {
    backgroundColor: colors.themeSecondary,
  },
  cancelBtnText: {
    color: colors.themeWhite,
  },
  overlay: {
    position: "fixed",
    left: 0,
    top: 0,
    height: "100%",
    width: "100%",
    backgroundColor: "rgba(255,255,255, 0.6)",
    zIndex: 100,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  continueBtn: {
    backgroundColor: colors.themePrimary,
  },
});
