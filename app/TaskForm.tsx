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
  ScrollView,
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
import TimeSelector from "./(onboarding)/TimeSelector";
import { commonStyles } from "./utils/commonStyles";
import { setupRecurringNotification } from "./services/NotificationsService";

const TaskForm = () => {
  /**
   * This is TASK FORM
   */
  const [taskTitle, setTaskTitle] = useState("");
  const [startTime, setStartTime] = useState("00 00 PM");
  const [prevTime, setPrevTime] = useState("");
  const [repeats, setRepeats] = useState("Everyday");
  const [reminder, setReminder] = useState("5 minutes before");
  const [openModal, setOpenModal] = useState<string>("");
  const [popupOpen, setPopupOpen] = useState(false);
  const [allFieldsFilled, setAllFieldsFilled] = useState(false);
  const [loading, setLoading] = useState(false);

  const currentUser = useUserContext();
  const router = useRouter();

  const handleSubmitTask = async () => {
    if (taskTitle + startTime !== "") {
      setLoading(true);
      try {
        addTask(currentUser.email, {
          taskTitle: taskTitle,
          taskStartTime: formatTimeForDB(startTime),
          repeats: repeats,
          reminder: reminder,
          isComplete: false,
        });
        let [h, m, p] = startTime.split(" ");
        if (p === "PM") {
          h = (parseInt(h) + 12).toString();
        }
        setupRecurringNotification({
          title: `Start Your Task`,
          message: `'${taskTitle}' begins now!`,
          hour: parseInt(h),
          minute: parseInt(m),
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
    setAllFieldsFilled(taskTitle !== "" && startTime !== "");
  }, [taskTitle, startTime]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "position"}
      keyboardVerticalOffset={-300}
      style={{ flex: 1, backgroundColor: colors.themeBackground }}
    >
      <ScrollView style={{ height: "100%" }}>
        <View style={styles.taskFormContainer}>
          <Stack.Screen options={{ headerShown: false }} />
          {/* TASK FORM */}
          <View style={{}}>
            <Link href="/">
              <Pressable onPress={() => router.back()}>
                <Text style={styles.backBtn}>{"\n<"} Back</Text>
              </Pressable>
            </Link>
            <View style={styles.titleContainer}>
              <Image
                source={require("../assets/images/taskSplash.png")}
                style={styles.icon}
              />
              <Text style={styles.heroText}>Create Night Routine Task</Text>
            </View>
            <View style={styles.formFieldContainer}>
              <Image
                source={require("../assets/images/taskName.png")}
                style={styles.emoji}
              />
              <Text style={styles.inputLabel}>{"  "}Name</Text>
            </View>
            <TextInput
              style={styles.input}
              placeholder="Task Name"
              placeholderTextColor={colors.themeGray2}
              autoCapitalize="none"
              value={taskTitle}
              onChangeText={(text) => setTaskTitle(text)}
            />
            <View style={[styles.formFieldContainer, { paddingTop: 30 }]}>
              <Image
                source={require("../assets/images/taskTime.png")}
                style={styles.emoji}
              />
              <Text style={styles.inputLabel}>{"  "}Time</Text>
            </View>
            <View style={styles.timesContainer}>
              <Text style={styles.inputLabel}>{"\n"}Task Starts At</Text>
              <Pressable
                onPress={() => {
                  setPrevTime(startTime);
                  setOpenModal("timeSelector");
                }}
              >
                <Text style={styles.timeInput}>{calculateTime({ time: startTime })}</Text>
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
              </View>
            )}
          </View>
        </View>
        {openModal === "timeSelector" && (
          <View style={commonStyles.modalPositioning}>
            <View style={commonStyles.modalOverlay}>
              <View style={styles.timeSelectorContainer}>
                <Pressable
                  onPress={() => {
                    setStartTime(prevTime);
                    setOpenModal("");
                  }}
                >
                  <Image
                    source={require("../assets/images/cancel.png")}
                    style={styles.cancelBtn}
                  />
                </Pressable>
                <Text style={styles.startsAt}>Starts At</Text>
                <View style={{ paddingHorizontal: 30 }}>
                  <TimeSelector time={startTime} setTime={setStartTime} />
                </View>
                <Pressable style={styles.doneBtn} onPress={() => setOpenModal("")}>
                  <Text style={{ alignSelf: "center", fontWeight: "500" }}>Done</Text>
                </Pressable>
              </View>
            </View>
          </View>
        )}
      </ScrollView>
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
  cancelBtn: {
    tintColor: colors.themeWhite,
    alignSelf: "flex-end",
    margin: 10,
  },
  doneBtn: {
    backgroundColor: colors.themePrimary,
    paddingVertical: 10,
    marginVertical: 30,
    alignSelf: "center",
    width: "80%",
    borderRadius: 20,
  },
  emoji: {
    height: 18,
    width: 16,
    resizeMode: "contain",
  },
  formFieldContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-end",
    paddingBottom: 10,
  },
  heroText: {
    alignSelf: "center",
    fontSize: 16,
    color: colors.themeWhite,
    paddingBottom: 40,
  },
  icon: {
    width: 150,
    height: 125,
    paddingRight: 10,
    alignSelf: "center",
  },
  input: {
    marginVertical: 4,
    width: "100%",
    height: 40,
    borderRadius: 20,
    padding: 10,
    paddingLeft: 20,
    borderColor: "transparent",
    backgroundColor: colors.themeAccent4,
    color: colors.themeWhite,
  },
  inputLabel: {
    alignSelf: "flex-start",
    color: colors.themeWhite,
  },
  startsAt: {
    fontSize: 18,
    color: colors.themeWhite,
    alignSelf: "center",
    paddingBottom: 30,
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
    paddingHorizontal: 40,
    height: 40,
    borderRadius: 20,
    padding: 10,
    borderColor: "transparent",
    textAlign: "center",
    backgroundColor: colors.themeAccent4,
    color: colors.themePrimary,
  },
  timeSelectorContainer: {
    borderRadius: 20,
    width: "80%",
    backgroundColor: colors.themeBackground,
  },
  titleContainer: {
    display: "flex",
    justifyContent: "center",
    paddingTop: 30,
  },
});

export default TaskForm;
