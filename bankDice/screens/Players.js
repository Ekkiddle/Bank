import React from 'react';
import {Text, Button, View, FlatList, TextInput, TouchableOpacity, StyleSheet} from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const Player = ({name, onPress}) => (
    <View style={{
        flexDirection:'row',
        width:'100%',
        height: 50,
        borderRadius: 15,
        paddingHorizontal: 5,
        justifyContent:'space-between',
        alignItems:'center',
        marginVertical:8,
        backgroundColor:'#274A17',
    }}>
        <Text style={{
        fontSize: 16,
        margin: 10, color:'#F9C300', fontSize:24
        }}>{name}</Text>
        <TouchableOpacity
                style={{width: 45, height: 35, marginHorizontal:5, justifyContent:'center',
                alignItems:'center', backgroundColor:'#396922', borderRadius:20}}
                onPress={onPress}>
                <AntDesign name="minus" size={28} color="#F9C300" />
            </TouchableOpacity>
    </View>
);

// Page to collect the list of players that will be playing in the game
const Players = ({navigation}) => {
    const [text, onChangeText] = React.useState('');
    const [players, setPlayers] = React.useState([]);

    return (
        <View style={{ flex: 1, paddingHorizontal:10, paddingVertical:30, backgroundColor:'#203E11' }}>
            {/* User Input Section */}
            <Text style={{ width:'100%', textAlign:'center', fontSize:36, color:'#F9C300'}}>Add Players</Text>
            <View style={{ flexDirection:'row', justifyContent:'flex-start', alignItems:'center', width:'100%', paddingRight: 6}}>
                <TextInput 
                    style={{
                        width:'85%',
                        height: 40,
                        marginRight:10,
                        marginVertical: 10,
                        borderWidth: 1,
                        paddingHorizontal: 10,
                        fontSize: 16,
                        backgroundColor:'#274A17',
                        borderColor:'#396922',
                        borderRadius:20,
                    }}
                    color={'#F9C300'}
                    onChangeText={onChangeText}
                    value={text}
                    placeholder='Player name'
                    placeholderTextColor={'#396922'}
                />
                <TouchableOpacity
                    style={{borderRadius:50,
                        height: 40,
                        width: 40,
                        justifyContent:'center',
                        alignItems:'center',
                        backgroundColor: '#30571E',
                        marginLeft:'auto'}}
                    onPress={() => {
                        if(text.trim()){
                            setPlayers([...players, { name: text.trim() , points: 0, banked: false }]);
                            onChangeText('');
                        };
                    }}
                    >
                    <AntDesign name="plus" size={24} color="#F9C300" />
                </TouchableOpacity>
            </View>
            <View style={{backgroundColor:'#AE8800', height:5, width:'110%', marginVertical:10, marginLeft:-15}}></View>
            <View style={{backgroundColor:'#AE8800', height:2, width:'110%', marginBottom:15, marginLeft:-15}}></View>
            <FlatList
                data={players}
                renderItem={({item, index}) => <Player name={item.name} 
                onPress={()=>{setPlayers(players.slice(0,index).concat(players.slice(index+1, players.length)))}} />}
            />
            <TouchableOpacity style={{ backgroundColor:players.length<2?'#274A17':'#F9C300', width:'100%', justifyContent:'center', alignItems:'center',
                    borderRadius:50, height:50, borderWidth:1, borderColor:players.length<2?'#274A17':'#FFD230', marginVertical:5 }}
                    onPress={() => navigation.navigate("Game", {list: players})} disabled={players.length<2}
                >
                    <Text style={{ fontSize:26, color:'#203E11'}}>
                        Start
                    </Text>
                </TouchableOpacity>
        </View>
    );
};

export default Players;