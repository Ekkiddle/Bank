import React from 'react';
import {Text, Button, View, FlatList, TextInput, TouchableOpacity, StyleSheet} from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const Player = ({name, onPress}) => (
    <View style={{
        flexDirection:'row',
        width:'100%',
        height: 50,
        borderWidth: 1,
        paddingHorizontal: 5,
        justifyContent:'space-between',
        alignItems:'center',
        marginVertical:5,
    }}>
        <Text style={{
        fontSize: 16,
        margin: 10
        }}>{name}</Text>
        <TouchableOpacity
                style={[styles.roundButton, {width: 25, height: 25, marginHorizontal:5}]}
                onPress={onPress}>
                <AntDesign name="minus" size={20} color="white" />
            </TouchableOpacity>
    </View>
);

// Page to collect the list of players that will be playing in the game
const Players = ({navigation}) => {
    const [text, onChangeText] = React.useState('');
    const [players, setPlayers] = React.useState([]);

    return (
        <View style={{ flex: 1, paddingHorizontal:10, paddingVertical:30 }}>
            {/* User Input Section */}
            <View style={{ flexDirection:'row', justifyContent:'flex-start', alignItems:'center', width:'100%', paddingRight: 6}}>
                <TextInput 
                    style={{
                        width:'90%',
                        height: 30,
                        marginRight:10,
                        marginVertical: 10,
                        borderWidth: 1,
                        paddingHorizontal: 10,
                        fontSize: 16
                    }}
                    onChangeText={onChangeText}
                    value={text}
                    placeholder='Player name'
                />
                <TouchableOpacity
                    style={styles.roundButton}
                    onPress={() => {
                        if(text.trim()){
                            setPlayers([...players, { name: text.trim() , points: 0, banked: false }]);
                            onChangeText('');
                        };
                    }}
                    >
                    <AntDesign name="plus" size={24} color="white" />
                </TouchableOpacity>
            </View>

            <Text> Players </Text>
            <FlatList
                data={players}
                renderItem={({item, index}) => <Player name={item.name} 
                onPress={()=>{setPlayers(players.slice(0,index).concat(players.slice(index+1, players.length)))}} />}
            />
            <Button title="start" disabled={players.length<2} onPress={() => navigation.navigate("Game", {list: players})}/>
        </View>
    );
};

const styles = StyleSheet.create({
    roundButton: {
        borderRadius:50,
        height: 30,
        width: 30,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor: '#147EFB'
    },
  });

export default Players;