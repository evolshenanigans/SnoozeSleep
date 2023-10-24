import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import useUserData from "../hooks/useUserData";
import { addTask, updateTask } from "../services/handleFirestore";
import { Task } from "../types/indexTypes";
import { calculateTime } from "../services/handleTime";
import { colors } from "../utils/colors";
import SleepLogMaker from "./SleepLogMaker";
import { useUserContext } from "../services/Context";

const TaskList = () => {
  const { tasks } = useUserData();
  const currentUser = useUserContext();

  const handlePress = (taskTitle: string, changeTo: boolean) => {
    updateTask(currentUser.email, taskTitle, { isComplete: changeTo });
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.tasksContainer}>
          {tasks ? (
            tasks.length > 0 ? (
              tasks.map((task: Task, index: number) => (
                <View style={styles.card} key={`tasks-${index}`}>
                  <View style={styles.textContainer}>
                    <Text style={styles.taskText}>{task.taskTitle}</Text>
                    <Text style={styles.timeframeText}>
                      {calculateTime(task.taskStartTime)} -{" "}
                      {calculateTime(task.taskEndTime)}
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={[
                      styles.circle,
                      task.isComplete ? styles.circleTrue : styles.circleFalse,
                    ]}
                    onPress={() => handlePress(task.taskTitle, !task.isComplete)}
                  >
                    {/* {task.isComplete && <Text style={styles.checkMark}>✔</Text>} */}
                    {task.isComplete && (
                      // <Image
                      //   source={require("../../assets/images/loadingStar.png")}
                      //   style={styles.checkMark}
                      // />
                      <Text style={styles.checkMark}>{"\u2713"}</Text>
                    )}
                  </TouchableOpacity>
                </View>
              ))
            ) : (
              <Text style={styles.message}>You currently have no sleep tasks</Text>
            )
          ) : (
            <Text style={styles.message}>Loading...</Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TaskList;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#9174D0",
    padding: 10,
    borderRadius: 20,
    alignItems: "center",
    width: 240,
    marginHorizontal: 20,
    marginVertical: 10,
  },
  buttonText: {
    color: "black",
    fontSize: 18,
  },
  card: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    backgroundColor: colors.themeAccent4,
    padding: 20,
    marginBottom: 10,
    borderRadius: 10,
  },
  checkMark: {
    alignSelf: "center",
    color: colors.themeWhite,
    fontSize: 20,
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  circleFalse: {
    borderColor: colors.themeWhite,
    color: colors.themeWhite,
  },
  circleTrue: {
    backgroundColor: colors.themeSecondary,
    borderColor: colors.themePrimary,
    color: colors.themeWhite,
  },
  message: {
    fontSize: 12,
    textAlign: "center",
    marginTop: 20,
    marginBottom: 10,
    color: "gray",
  },
  taskText: {
    fontSize: 16,
    marginBottom: 5,
    color: colors.themeWhite,
  },
  tasksContainer: {
    flex: 1,
  },
  textContainer: {
    flex: 1,
    color: colors.themeWhite,
  },
  timeframeText: {
    fontSize: 14,
    color: colors.themeWhite,
  },
});
