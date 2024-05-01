import React from 'react';
import {Text, View, Button, FlatList, Dimensions, TouchableOpacity} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

// index of player
let ind = 0;

const StretchButton = ({onPress, title, disabled}) => {
    let color = disabled?  '#9c9c9c':'#147EFB'
    return(
        <TouchableOpacity
            style={{justifyContent:'center',
                alignItems:'center',
                backgroundColor: color,
                flexGrow:1,
                margin:1,
                borderRadius:5, }}
            onPress={onPress}
            disabled={disabled}
        >
            <Text style={{ color:'white' }}>{title}</Text>
        </TouchableOpacity>
    );
};

const Item = ({index, players, num, roll, player, score, bank}) => {
    let content;
    if(index){
        content = (<FlatList
            data={players}
            renderItem={({item, index}) => <Player players={players} index={index} score={score} onPress={bank}
            extraData={num}
            />}
        />);
    }
    else if (num>=3) {
        content = (
            <View style={{ flex:1, alignItems:'stretch' }}>
                <View style={{ flex:1, flexDirection:'row', width:'100%' }}>
                    <StretchButton title={3} onPress={()=>{roll(3)}}/>
                    <StretchButton title={4} onPress={()=>{roll(4)}}/>
                </View>
                <View style={{ flex:1, flexDirection:'row', width:'100%' }}>
                    <StretchButton title={5} onPress={()=>{roll(5)}}/>
                    <StretchButton title={6} onPress={()=>{roll(6)}}/>
                </View>
                <View style={{ flex:1, flexDirection:'row', width:'100%' }}>
                    <StretchButton title={7} onPress={()=>{roll(7)}}/>
                </View>
                <View style={{ flex:1, flexDirection:'row', width:'100%' }}>
                    <StretchButton title={8} onPress={()=>{roll(8)}}/>
                    <StretchButton title={9} onPress={()=>{roll(9)}}/>
                </View>
                <View style={{ flex:1, flexDirection:'row', width:'100%' }}>
                    <StretchButton title={10} onPress={()=>{roll(10)}}/>
                    <StretchButton title={11} onPress={()=>{roll(11)}}/>
                </View>
                <View style={{ flex:1, flexDirection:'row', width:'100%' }}>
                    <StretchButton title={'Doubles'} onPress={()=>{roll(0)}}/>
                </View>
            </View>
            ); 
    }
    else {
        content = (
        <View style={{ flex:1, alignItems:'stretch' }}>
            <View style={{ flex:1, flexDirection:'row', width:'100%' }}>
                <StretchButton title={2} onPress={()=>{roll(2)}}/>
                <StretchButton title={3} onPress={()=>{roll(3)}}/>
            </View>
            <View style={{ flex:1, flexDirection:'row', width:'100%' }}>
                <StretchButton title={4} onPress={()=>{roll(4)}}/>
                <StretchButton title={5} onPress={()=>{roll(5)}}/>
                <StretchButton title={6} onPress={()=>{roll(6)}}/>
            </View>
            <View style={{ flex:1, flexDirection:'row', width:'100%' }}>
                <StretchButton title={7} onPress={()=>{roll(7)}}/>
            </View>
            <View style={{ flex:1, flexDirection:'row', width:'100%' }}>
                <StretchButton title={8} onPress={()=>{roll(8)}}/>
                <StretchButton title={9} onPress={()=>{roll(9)}}/>
            </View>
            <View style={{ flex:1, flexDirection:'row', width:'100%' }}>
                <StretchButton title={10} onPress={()=>{roll(10)}}/>
                <StretchButton title={11} onPress={()=>{roll(11)}}/>
                <StretchButton title={12} onPress={()=>{roll(12)}}/>
            </View>
            <View style={{ flex:1, flexDirection:'row', width:'100%' }}>
                <StretchButton title={'Doubles'} onPress={()=>{roll(0)}} disabled={true}/>
            </View>
        </View>
        );
    }
    return (
        <View style={{ padding:10, height:'100%', width:'100%' }}>
            <Text> {player}'s turn to roll </Text>
            {content}
        </View>
    );
};

const Player = ({players, index, score, onPress}) => (
    <View style={{
        flexDirection:'row',
        width:'100%',
        height: 50,
        borderWidth: 1,
        paddingHorizontal: 5,
        justifyContent:'space-between',
        alignItems:'center',
        marginVertical:5,
        backgroundColor: players[index].banked? '#147EFB': '#fff'
    }}>
        <View style={{flex:1, flexDirection:'row', alignItems:'center'}}>
        <Text style={{ width:50, padding:5 }}>
            {players[index].points}
        </Text>
        <Text style={{
        fontSize: 16,
        margin: 10
        }}>{players[index].name}</Text>
        </View>
        <Button title="BANK" onPress={()=>onPress(players[index])} disabled={players[index].banked} />
    </View>
);

// Page that handles the actual game functionality (no virtual dice yet)
const Game = ({route, navigation }) => {
    const [players, setPlayers] = React.useState([...route.params.list]);
    const width = Dimensions.get('screen').width;

    // current score
    const [score, setScore] = React.useState(0);
    // The current number of rolls
    const [rollNumber, setRoll] = React.useState(0);
    // current player
    const [currPlayer, setCurrPlayer] = React.useState(route.params.list[0]);
    // current round
    const [round, setRound] = React.useState(1);

    // total rounds
    const rounds = 15;
    // number of players
    const playerNo = players.length;

    const rollDie = (roll) => {
        if(roll == 7){
            if(rollNumber < 3){
                setScore(score+70);
            }
            else{
                nextRound();
                return;
            }
        }
        // I'm having this represent doubles
        else if(roll == 0){
            setScore(score*2);
        }
        else {
            setScore(score + roll);
        }
        setRoll(rollNumber + 1);
        ind = (ind + 1)%playerNo;
        checkBanked();
    };

    const nextRound = () => {
        for(let i = 0; i<players.length; i++){
            players[i].banked = false;
        };
        setRoll(0);
        setScore(0);
        
        setRound(round+1);
        if(round >= rounds){
            navigation.navigate("Final", {list: players})
        }
        ind = (ind + 1)%playerNo;
        checkBanked();
    };

    const checkBanked = () => {
        let count=0;
        while(route.params.list[ind].banked){
            if(count>=playerNo){
                nextRound();
                return
            }
            ind = (ind + 1)%playerNo;
            count+=1;
        }
        setCurrPlayer(route.params.list[ind]);
    };

    const bank = (player) => {
        if(rollNumber>=3){
            player.banked = true;
            player.points += score;
            let temp = players.sort((a, b) => {
                return b.points - a.points;})
            setPlayers(temp)
            setRoll(rollNumber+1);
            checkBanked();
        };
    }

    return (
        <View style={{ justifyContent:'center', alignItems:'center', flex:1 , padding:10, paddingVertical: 30}}>
            <View style={{ justifyContent:'center', alignItems:'center', height:'35%', width:'100%', borderWidth:1}}>
                <Text>Round {round}/{rounds}</Text>
                <Text style={{ fontSize:100}}> {score} </Text>
            </View>
            <View style={{ height:'65%' }}>
                <Carousel
                    loop
                    width={width}
                    autoPlay={false}
                    data={[...new Array(2).keys()]}
                    scrollAnimationDuration={500}
                    renderItem={({ index }) => (
                        <Item index={index} 
                            players={players} 
                            num={rollNumber} 
                            roll={rollDie} 
                            player={currPlayer.name} 
                            score={score}
                            bank={bank} 
                        />
                    )}
                />
            </View>
        </View>
    );
};

export default Game;