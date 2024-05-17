import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';

// Start page that will include options for starting a new game, 
// spectating an exisiting game, or (future)
// participating in a virtual dice/online game. (future)
const Start = ({navigation}) => {
    return(
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor:'#203E11', padding:20 }}>
            <Text style={{ fontSize:100, color:'#F9C300'}}> BANK </Text>
            <TouchableOpacity style={{ backgroundColor:'#F9C300', width:'100%', justifyContent:'center', alignItems:'center',
                    borderRadius:50, height:50, borderWidth:1, borderColor:'#FFD230', marginVertical:5 }}
                    onPress={() => navigation.navigate("Players")}
                >
                    <Text style={{ fontSize:26, color:'#203E11'}}>
                        Start
                    </Text>
                </TouchableOpacity>
        </View>
    );
};

export default Start;