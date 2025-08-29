import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import StudentApp from './student';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import student from './student';
// import CustomizerAssessment from './customizerAssessment'
import ExamApp from './ExamApp';
import MatchTheFollowing from './MatchTheFollowing';
import Login from './Login';
import OnboardingScreen from './OnboardingScreen';
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="OnboardingScreen" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="OnboardingScreen" component={OnboardingScreen} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="student" component={student} />
        <Stack.Screen name="ExamApp" component={ExamApp} />
        <Stack.Screen name="MatchTheFollowing" component={MatchTheFollowing} />
        </Stack.Navigator>
    </NavigationContainer>

  );
}

