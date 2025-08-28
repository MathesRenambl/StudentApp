import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import StudentApp from './student';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import student from './student';
// import CustomizerAssessment from './customizerAssessment'
import ExamApp from './ExamApp';
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="student" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="student" component={student} />
        <Stack.Screen name="ExamApp" component={ExamApp} />
        </Stack.Navigator>
    </NavigationContainer>

  );
}

