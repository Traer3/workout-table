import {Pressable, Image } from "react-native";
import shareIcon from "../assets/share.png"

export default function IconButton({buttFunction}) {
    return (
        <Pressable
            style={{
                marginTop: 35,
                height: 50,
                width: 50,
                marginBottom: -40,
            }}
            onPressIn={() => {buttFunction()}}
        >
            <Image source={shareIcon} style={{ width: 40, height: 40 }} resizeMode="contain" />
        </Pressable>
    )
}