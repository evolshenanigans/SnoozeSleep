import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { colors } from "./utils/colors";
import ContinueButton from "./common components/ContinueButton";
import { Link, Stack, useRouter } from "expo-router";
import { RepeatsPopup } from "./common components/RepeatsPopup";
import RepeatsButton from "./common components/RepeatsButton";
import { addTask, updateUserFields } from "./services/handleFirestore";
import { useUserContext } from "./services/Context";
import { calculateTime, formatTimeForDB } from "./services/handleTime";

const TaskForm = () => {
  /**
   * This is TASK FORM
   */
  const [taskTitle, setTaskTitle] = useState("");
  const [startTime, setStartTime] = useState("09:00 PM");
  const [endTime, setEndTime] = useState("10:00 PM");
  const [repeats, setRepeats] = useState("Everyday");
  const [reminder, setReminder] = useState("5 minutes before");
  const [popupOpen, setPopupOpen] = useState(false);
  const [allFieldsFilled, setAllFieldsFilled] = useState(false);
  const [loading, setLoading] = useState(false);
  const currentUser = useUserContext();

  const router = useRouter();

  const handleSubmitTask = async () => {
    if (taskTitle + startTime + endTime !== "") {
      setLoading(true);
      try {
        addTask(currentUser.email, {
          taskTitle: taskTitle,
          taskStartTime: formatTimeForDB(startTime),
          taskEndTime: formatTimeForDB(endTime),
          repeats: repeats,
          reminder: reminder,
          isComplete: false,
        });
        router.back();
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    setAllFieldsFilled(taskTitle !== "" && startTime !== "" && endTime !== "");
  }, [taskTitle, startTime, endTime]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "position"}
      keyboardVerticalOffset={-300}
      style={{ flex: 1 }}
    >
      <View style={styles.taskFormContainer}>
        <Stack.Screen options={{ headerShown: false }} />
        {/* LOGIN FORM */}
        <View style={{}}>
          <View style={styles.titleContainer}>
            <Image
              source={require("../assets/images/clipboard.png")}
              style={styles.icon}
            />
            <Text style={styles.heroText}>{"  "}Create Task</Text>
          </View>
          <Text style={styles.inputLabel}>{"\n"}Enter Task Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Task Name"
            placeholderTextColor={colors.themeGray2}
            autoCapitalize="none"
            value={taskTitle}
            onChangeText={(text) => setTaskTitle(text)}
          />
          <Text style={styles.inputLabel}>{"\n"}Time</Text>
          <View style={styles.timesContainer}>
            <Text style={styles.inputLabel}>{"\n"}Starts At</Text>
            <Pressable>
              <Text style={styles.timeInput}>{startTime}</Text>
            </Pressable>
          </View>
          <View style={styles.timesContainer}>
            <Text style={styles.inputLabel}>{"\n"}Ends At</Text>
            <Pressable>
              <Text style={styles.timeInput}>{endTime}</Text>
            </Pressable>
          </View>

          {/* Repeats and Reminders Settings */}
          <View style={{ paddingVertical: 15 }}>
            <RepeatsButton
              setPopupOpen={setPopupOpen}
              repeats={repeats}
              setRepeats={setRepeats}
              reminder={reminder}
              setReminder={setReminder}
            />
          </View>

          {loading ? (
            <ActivityIndicator size="large" color="white" />
          ) : (
            <View style={styles.buttonContainer}>
              <ContinueButton
                activeCondition={allFieldsFilled}
                onPressFn={handleSubmitTask}
              />
              <Link href="/">
                <Pressable onPress={() => router.back()}>
                  <Text style={styles.backBtn}>{"\n<"} Back</Text>
                </Pressable>
              </Link>
            </View>
          )}
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  backBtn: {
    alignSelf: "center",
    color: colors.themeWhite,
    paddingTop: 20,
  },
  buttonContainer: {
    width: "100%",
  },
  heroText: {
    alignSelf: "center",
    fontSize: 22,
    color: colors.themeWhite,
    paddingBottom: 40,
  },
  icon: {
    width: 20,
    height: 25,
    paddingRight: 10,
  },
  input: {
    marginVertical: 4,
    width: "100%",
    height: 40,
    borderRadius: 20,
    padding: 10,
    borderColor: "transparent",
    backgroundColor: colors.themeAccent4,
    color: colors.themeWhite,
  },
  inputLabel: {
    alignSelf: "flex-start",
    color: colors.themeWhite,
  },
  taskFormContainer: {
    height: "100%",
    flexDirection: "column",
    justifyContent: "center",
    padding: 40,
    paddingTop: 50,
    backgroundColor: colors.themeBackground,
  },
  timesContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 5,
  },
  timeInput: {
    marginVertical: 4,
    width: "100%",
    paddingHorizontal: 20,
    height: 40,
    borderRadius: 20,
    padding: 10,
    borderColor: "transparent",
    textAlign: "center",
    backgroundColor: colors.themeAccent4,
    color: colors.themePrimary,
  },
  titleContainer: {
    display: "flex",
    flexDirection: "row",
  },
});

export default TaskForm;
