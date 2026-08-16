import {Pressable, Image } from "react-native";
import shareIcon from "../assets/share.png"
import createDayIcon from "../assets/dayCreatorIcon.png";

const icons = {
    share: shareIcon,
    createDay: createDayIcon,

}

export default function IconButton({buttFunction, iconName}) {
    return (
        <Pressable
            style={{ height: 50,width: 50,}}
            onPressIn={() => {buttFunction()}}
        >
            <Image source={icons[iconName]} style={{ width: 40, height: 40 , }} resizeMode="contain"/>
        </Pressable>
    )
}