import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import useUserData from "../hooks/useUserData";
import { addTask, updateTask } from "../services/handleFirestore";
import { Task } from "../types/indexTypes";
import { calculateTime } from "../services/handleTime";
import { colors } from "../utils/colors";
import SleepLogMaker from "./SleepLogMaker";
import { useUserContext } from "../services/Context";
import ProgressBar from "./ProgressBar";

const TaskList = () => {
  const [taskProgress, setTaskProgress] = useState<number>();
  const [currentHours, setCurrentHours] = useState<number>(new Date().getHours());
  const [currentMinutes, setCurrentMinutes] = useState<number>(new Date().getMinutes());
  const [currentSeconds, setCurrentSeconds] = useState<number>(new Date().getSeconds());
  const { tasks } = useUserData();
  const currentUser = useUserContext();

  const handlePress = (taskTitle: string, changeTo: boolean) => {
    updateTask(currentUser.email, taskTitle, { isComplete: changeTo });
  };

  useEffect(() => {
    const intervalID = setInterval(() => {
      const now = new Date();
      setCurrentHours(now.getHours());
      setCurrentMinutes(now.getMinutes());
      setCurrentSeconds(now.getSeconds());
    }, 1000);
    return () => clearInterval(intervalID);
  }, []);

  useEffect(() => {
    if (currentHours == 0) {
      setCurrentHours(12);
    }
  }, [currentHours]);

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.tasksContainer}>
          {tasks ? (
            tasks.length > 0 ? (
              tasks.map((task: Task, index: number) => (
                <View style={styles.card} key={`tasks-${index}`}>
                  <View style={styles.textAndBtnRow}>
                    <View style={styles.textContainer}>
                      <Text style={styles.taskText}>{task.taskTitle}</Text>
                      <Text style={styles.timeframeText}>
                        {calculateTime({
                          time: task.taskStartTime,
                          leadingZero: false,
                        })}{" "}
                        - {calculateTime({ time: task.taskEndTime, leadingZero: false })}
                      </Text>
                    </View>
                    <TouchableOpacity
                      style={[
                        styles.circle,
                        task.isComplete ? styles.circleTrue : styles.circleFalse,
                      ]}
                      onPress={() => handlePress(task.taskTitle, !task.isComplete)}
                    >
                      {task.isComplete && (
                        <Image
                          source={require("../../assets/images/check.png")}
                          style={styles.checkMark}
                        />
                      )}
                    </TouchableOpacity>
                  </View>
                  <View style={styles.progressBar}>
                    <ProgressBar isHomepage={true} progress={20} />
                  </View>
                </View>
                // per card
              ))
            ) : (
              <Text style={styles.message}>You currently have no sleep tasks</Text>
            )
          ) : (
            <Text style={styles.message}>Loading...</Text>
          )}
        </View>
        {/* end of task container */}
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
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.themeAccent4,
    padding: 20,
    marginBottom: 10,
    borderRadius: 10,
  },
  cardCol: {
    display: "flex",
    flexDirection: "column",
  },
  checkMark: {
    width: 25,
    height: 25,
    tintColor: colors.themeWhite,
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  circleFalse: {
    borderColor: colors.themeGray,
    backgroundColor: colors.themeGray,
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
  progressBar: {
    display: "flex",
    flexDirection: "row",
    paddingTop: 20,
  },
  taskText: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 5,
    color: colors.themeWhite,
  },
  tasksContainer: {
    flex: 1,
  },
  textAndBtnRow: {
    display: "flex",
    flexDirection: "row",
  },
  textContainer: {
    flex: 1,
    color: colors.themeWhite,
  },
  timeframeText: {
    fontSize: 12,
    fontWeight: "400",
    color: colors.themeWhite,
  },
});
