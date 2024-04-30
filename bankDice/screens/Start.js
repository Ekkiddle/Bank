import React from 'react';
import {Text, View, Button} from 'react-native';

// Start page that will include options for starting a new game, 
// spectating an exisiting game, or (future)
// participating in a virtual dice/online game. (future)
const Start = ({navigation}) => {
    return(
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text> Bank </Text>
            <Button 
                title="Play" 
                onPress={() => navigation.navigate("Players")} />
        </View>
    );
};

export default Start;