import React from 'react';
import {Text, View, Button, FlatList, Dimensions, TouchableOpacity} from 'react-native';
import StretchButton from '../components/buttons'
import Carousel from 'react-native-reanimated-carousel';
import { FontAwesome } from '@expo/vector-icons';

// index of player
let ind = 0;
// last player
let lastPlayer = 0;
/* Undo stack in form:
    (action [bank = 0, roll = 1], player who did action, points before action, turn before action, round before action) */
    let undoStack = [];

const Item = ({index, players, update, num, roll, player, score, bank}) => {
    let content;
    if(index){
        content = (<FlatList
            data={players}
            renderItem={({item, index}) => <Player players={players} index={index} score={score} onPress={bank}
            extraData={update}
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
                    <StretchButton title={7} color={'#AE5E00'} onPress={()=>{roll(7)}}/>
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
    let color1 = index? '#6E5600':'#F9C300'
    let color2 = index? '#F9C300':'#6E5600'
    return (
        <View style={{ padding:10, height:'100%', width:'100%', backgroundColor:'#274A17' }}>
            <Text style={{ color:'#F9C300', width:'100%', textAlign:'center', padding:5 }}> {player}'s turn to roll </Text>
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
        backgroundColor: players[index].banked? '#F9C300': '#396922',
        borderColor: players[index].banked? '#FFD230':'#396922',
        borderRadius:20,
    }}>
        <View style={{flex:1, flexDirection:'row', alignItems:'center'}}>
            <Text style={{ fontSize:20, width:75, padding:5, color: players[index].banked? '#203E11':'#F9C300', }}>
                {players[index].points}
            </Text>
            <Text style={{
                fontSize: 16,
                margin: 10, color: players[index].banked? '#203E11':'#F9C300',
                }}>{players[index].name}
            </Text>
        </View>
        <TouchableOpacity onPress={()=>onPress(players[index])} disabled={players[index].banked} 
            style={{ marginHorizontal:6, backgroundColor:'#F9C300', padding:8, paddingHorizontal:15, borderRadius:20, }}>
            <Text style={{ color: players[index].banked? '#F9C300':'#1D3910' }}>BANK</Text></TouchableOpacity>
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
    // generic value used to update scores. Useless
    const [updateScore, setUpdate] = React.useState(0);
    // current player
    const [currPlayer, setCurrPlayer] = React.useState(route.params.list[0]);
    // current round
    const [round, setRound] = React.useState(1);

    // total rounds
    const rounds = 15;
    // number of players
    const playerNo = players.length;

    // reset player scores (if for some reason they weren't)
    if(round==1 && rollNumber==0){
    for(let i = 0; i<players.length; i++){
        players[i].points = 0;
        players[i].banked = false;
    }};

    const rollDie = (roll) => {
        let temp = { action:1, player:route.params.list[ind], score: score, turn:ind, roll:rollNumber, round: round}
        undoStack.push(temp);
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
        lastPlayer = ind;
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
        ind = (lastPlayer + 1)%playerNo;
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
            let temp1 = {action:0, player:player, score:score, turn:ind, roll:rollNumber, round:round}
            undoStack.push(temp1);
            player.banked = true;
            player.points += score;
            let temp = players.sort((a, b) => {
                return b.points - a.points;})
            setPlayers(temp);
            setUpdate(updateScore + 1);
            checkBanked();
        };
    }

    const undo = () => {
        console.log(undoStack);
        if(undoStack.length != 0){
            let action = undoStack.pop()
            // bank action
            if(action.action == 0){
                // undo add score
                action.player.points -= action.score;
                action.player.banked = false;
                let temp = players.sort((a, b) => {
                    return b.points - a.points;})
                setPlayers(temp);
                setUpdate(updateScore + 1);
            }
            // roll action
            else{
                // undo add to score
                setScore(action.score);
            }
            // go back to previous turn and round
            // undo roll number
            setRoll(action.roll);
            ind = action.turn;
            setCurrPlayer(route.params.list[ind]);
            setRound(action.round);
        }
    };

    return (
        <View style={{ justifyContent:'center', alignItems:'center', flex:1 , paddingHorizontal:10, paddingTop: 30, backgroundColor:'#203E11'}}>
            <View style={{ justifyContent:'center', alignItems:'center', height:'35%', width:'100%',}}>
                <Text style={{ fontSize:20, color:'#F9C300', marginTop:20}}>Round {round}/{rounds}</Text>
                <Text style={{ fontSize:100, color:'#F9C300', marginTop:'auto'}}> {score} </Text>
                <View style={{ flex:1, justifyContent:'space-between', alignItems:'center', flexDirection:'row', padding:5, paddingHorizontal:15}}>
                    <Text style={{ fontSize:16, color:'#F9C300', width:'100%', marginTop:'auto'}}> Roll count: {rollNumber} </Text>
                    <TouchableOpacity style={{ marginTop:'auto', }} onPress={undo}>
                        <FontAwesome name="repeat" size={24} color="#F9C300" />
                    </TouchableOpacity>
                </View>
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
                            update={updateScore}
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