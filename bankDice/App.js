import * as React from 'react';
import Start from './screens/Start';
import Players from './screens/Players';
import Game from './screens/Game';
import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen 
            name="Start"
            component={Start}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Players"
            component={Players}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Game"
            component={Game}
            options={{ headerShown: false }}
          />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
