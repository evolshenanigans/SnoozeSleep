import AsyncStorage from '@react-native-async-storage/async-storage';

export const checkNewUser = async (): Promise<boolean> => {
  const userStatus = await AsyncStorage.getItem('isNewUser');

  if (userStatus === null) {
    await AsyncStorage.setItem('isNewUser', 'true');
    return true;
  }

  return false;
};

export const onboardingComplete = async (): Promise<void> => {
  await AsyncStorage.setItem('isNewUser', 'false');
};
