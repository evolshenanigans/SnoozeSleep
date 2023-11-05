import { View, Text, Image, Pressable, StyleSheet } from "react-native";
import React from "react";
import { commonStyles } from "../utils/commonStyles";
import TimeSelector from "../(onboarding)/TimeSelector";
import { colors } from "../utils/colors";
import { updateUserFields } from "../services/handleFirestore";
import { useUserContext } from "../services/Context";

const SetBedtimeModal = ({ bedtime, setBedTime, setShowModal }) => {
  const currentUser = useUserContext();
  const handleSubmitSleepTime = () => {
    updateUserFields(currentUser.email, { generalSleepTime: bedtime });
  };
  return (
    <View style={commonStyles.modalPositioning}>
      <View style={commonStyles.modalOverlay}>
        <View style={styles.timeSelectorModal}>
          <Pressable onPress={() => setShowModal("")}>
            <Image
              source={require("../../assets/images/cancel.png")}
              style={styles.cancelIcon}
            />
          </Pressable>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <Image
              source={require("../../assets/images/blue_moon.png")}
              style={[styles.icon, { tintColor: colors.themeBlue }]}
            />
            <Text style={styles.bedtimeModalText}>{"  "}Bedtime</Text>
          </View>
          <View style={{ paddingHorizontal: 30 }}>
            <TimeSelector time={bedtime} setTime={setBedTime} />
          </View>
          <Pressable
            style={styles.btn}
            onPress={() => {
              handleSubmitSleepTime();
              setShowModal("set wake up time");
            }}
          >
            <Text style={{ fontWeight: "500", fontSize: 14 }}>Next</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default SetBedtimeModal;
const styles = StyleSheet.create({
  bedtimeModalText: {
    color: colors.themeWhite,
    textAlign: "center",
    fontSize: 18,
    paddingBottom: 20,
  },
  btn: {
    marginTop: 30,
    width: "80%",
    alignSelf: "center",
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: "center",
    backgroundColor: colors.themePrimary,
  },
  cancelIcon: {
    tintColor: colors.themeWhite,
    alignSelf: "flex-end",
    margin: 10,
  },
  icon: {
    height: 20,
    width: 20,
    resizeMode: "contain",
    tintColor: colors.themeWhite,
  },
  timeSelectorModal: {
    paddingBottom: 30,
    width: "80%",
    backgroundColor: colors.themeBackground,
    borderRadius: 20,
  },
});
