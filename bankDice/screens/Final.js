import React from "react";
import { View, FlatList, Text, SafeAreaView, TouchableOpacity } from "react-native";


const Player = ({player, index}) => {
    let size = 16;
    let color = '#203E11'
    let bColor = '#203E11'
    let height = 50
    if(index == 0){
        size = 30
        color = '#396922'
        bColor = '#AE8800'
        height = 100
    }
    else if(index == 1){
        size = 24
        color = '#30571E'
        bColor = '#30571E'
        height = 80
    }
    else if(index == 2){
        size = 20
        color = '#274A17'
        bColor = '#274A17'
        height = 60
    }

    return (
        <View style={{ height:height, width:'100%', flex:1, flexDirection:'row', alignItems:'center', marginVertical:5, 
            justifyContent:'space-between', paddingHorizontal:10, borderRadius:height/4, borderWidth:2, borderColor:bColor, backgroundColor:color}}>
            <Text style={{ fontSize: size, margin: 10, color:'#F9C300' }}>
                {player.name}
            </Text>
            <Text style={{ padding:5, fontSize:size, color:'#F9C300' }}>
                {player.points}
            </Text>
        </View>
    );
};

const Final = ({route, navigation}) => {
    const [players, setPlayers] = React.useState([...route.params.list]);

    return(
        <View style={{ flow:1, padding:10, paddingVertical:30, backgroundColor:'#203E11', height:'100%', width:'100%' }}>
            <SafeAreaView style={{ justifyContent:"center", alignItems:"center", flex:1, width:'100%' }}>
                <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                    <Text style={{ fontSize:36, color:'#AE8800', margin:10 }}>Game Over</Text>
                    <FlatList
                    data={players}
                    renderItem={({item, index}) => 
                        <Player player={item} index={index} />}
                    />
                </View>
                <TouchableOpacity style={{ backgroundColor:'#F9C300', width:'100%', justifyContent:'center', alignItems:'center',
                    borderRadius:50, height:50, borderWidth:2, borderColor:'#FFD230', marginVertical:5 }}
                    onPress={() => navigation.navigate("Players")}
                >
                    <Text style={{ fontSize:26, color:'#203E11'}}>
                        Play Again
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ backgroundColor:'#F9C300', width:'100%', justifyContent:'center', alignItems:'center',
                    borderRadius:50, height:50, borderWidth:2, borderColor:'#FFD230', marginVertical:5 }}
                    onPress={() => navigation.navigate("Start")}
                >
                    <Text style={{ fontSize:26, color:'#203E11'}}>
                        Exit
                    </Text>
                </TouchableOpacity>
            </SafeAreaView>
        </View>
    );
};

export default Final;