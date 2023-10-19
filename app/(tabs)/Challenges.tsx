import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Modal,
  FlatList,
  ScrollView,
} from "react-native";
import { TabView, TabBar } from "react-native-tab-view";
import useUserData from "../hooks/useUserData";
import { addChallenge, updateChallenge } from "../services/handleFirestore";
import { Challenge } from "../types/indexTypes";

const challengeList = [
  "Challenge 1",
  "Challenge 2",
  "Challenge 3",
  "Challenge 4",
  "Challenge 5",
  "Challenge 6",
  "Challenge 7",
  "Challenge 8",
  "Challenge 9",
  "Challenge 10",
];

const CurrentTab = ({ challenges, onComplete, onAdd }) => (
  <View style={styles.tabContent}>
    {challenges ? (
      challenges.length > 0 ? (
        challenges.map((challenge: Challenge, index: number) => (
          <TouchableOpacity key={index} onPress={() => onComplete(challenge)}>
            <Text>{challenge.challengeTitle}</Text>
          </TouchableOpacity>
        ))
      ) : (
        <View style={styles.emptyContent}>
          <Text>You currently have no challenges</Text>
        </View>
      )
    ) : (
      <Text>Loading...</Text>
    )}
    <Button title="Add Challenges" onPress={onAdd} />
  </View>
);

const CompletedTab = ({ completedChallenges }) => (
  <View style={styles.tabContent}>
    {completedChallenges.map((challenge: string, index: number) => (
      <Text key={index}>{challenge}</Text>
    ))}
  </View>
);

const SavedTab = () => (
  <View style={styles.tabContent}>
    {/* Show saved challenges here */}
    <Text>Saved Challenges</Text>
  </View>
);

export default function Challenges({ currentUser }) {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "current", title: "Current" },
    { key: "completed", title: "Completed" },
    { key: "saved", title: "Saved" },
  ]);
  // const [challenges, setChallenges] = useState(["Challenge 1", "Challenge 2"]);
  const [completedChallenges, setCompletedChallenges] = useState<string[]>([]);
  const { challenges } = useUserData(currentUser ? currentUser.email : null);

  const onComplete = (challenge) => {
    // setChallenges(challenges.filter((item) => item !== challenge));
    updateChallenge(currentUser.email, challenge.challengeTitle, { isComplete: true });
    // MP TODO: should delete challenge from the list
    setCompletedChallenges([...completedChallenges, challenge.challengeTitle]);
  };

  const [isModalVisible, setModalVisible] = useState(false);

  const onAdd = () => {
    setModalVisible(true);
  };

  const onSelectChallenge = (challenge) => {
    // setChallenges([...challenges, challenge]);
    setModalVisible(false);
    addChallenge(currentUser.email, {
      challengeTitle: challenge,
      challengeStartDate: "",
      isComplete: false,
      isCurrent: false,
      isSaved: true,
    });
  };

  const renderScene = ({ route }) => {
    switch (route.key) {
      case "current":
        return (
          <CurrentTab challenges={challenges} onComplete={onComplete} onAdd={onAdd} />
        );
      case "completed":
        return <CompletedTab completedChallenges={completedChallenges} />;
      case "saved":
        return <SavedTab />;
      default:
        return null;
    }
  };

  const shuffledChallenges = challengeList.sort(() => Math.random() - 0.5);

  return (
    <SafeAreaView style={styles.safeArea}>
      <Text> Your Challenges</Text>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: 360 }}
        renderTabBar={(props) => (
          <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: "blue" }}
            labelStyle={{ color: "black" }}
            style={{ backgroundColor: "white" }}
          />
        )}
      />
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContent}>
          <FlatList
            data={challengeList}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => onSelectChallenge(item)}>
                <Text style={styles.listItem}>{item}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </Modal>
      <View style={styles.suggestedChallengesContainer}>
        <Text style={styles.suggestedChallengesHeader}>Suggested Challenges</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {shuffledChallenges.map((challenge, index) => (
            <View style={styles.challengeItem} key={index}>
              <Text>{challenge}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    marginTop: 20,
  },
  tabContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyContent: {
    alignItems: "center",
    justifyContent: "center",
  },
  modalContent: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
  },
  listItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  suggestedChallengesContainer: {
    padding: 10,
  },
  suggestedChallengesHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "left",
  },
  challengeItem: {
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    padding: 10,
    marginRight: 10,
  },
});
