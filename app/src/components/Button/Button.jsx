import { Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'

const Button = ({ onPress, title, width, margin, colorBg, borderWidth, textColor, borderColor, iconName }) => {
  return (
    <TouchableOpacity
        onPress={onPress}
        style={{
            backgroundColor: colorBg,
            padding: 15,
            borderRadius: 50,
            width: width,
            margin: margin,
            borderWidth: borderWidth,
            borderColor: borderColor,
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'row',
        }}
    >
        {iconName &&
            <Icon 
                name={iconName}
                size={20}
                style={{
                    marginRight: 10
                }}
            />
        }
        <Text
            style={{
                color: textColor,
                fontSize: 16,
                fontWeight: 'bold',
            }}
        >
            {title}
        </Text>
    </TouchableOpacity>
  )
}

export default Button
