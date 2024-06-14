import React from 'react';
import {Text, TouchableOpacity} from 'react-native';

const StretchButton = ({onPress, title, disabled, color, borderColor}) => {
    let color1 = disabled?  '#8E6F00':color;
    if(!color1){
        color1 = '#F9C300'
    }
    return(
        <TouchableOpacity
            style={{justifyContent:'center',
                alignItems:'center',
                backgroundColor: color1,
                flexGrow:1,
                margin:5,
                borderRadius:20, }}
            onPress={onPress}
            disabled={disabled}
        >
            <Text style={{ color:'#203E11', fontSize:20 }}>{title}</Text>
        </TouchableOpacity>
    );
};

export default StretchButton;