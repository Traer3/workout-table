import { createContext, useContext, useEffect, useState } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing'

export const DatabaseContext = createContext()

const STORAGE_NAME = '@workout_dataTEST';

const initTable = [ //сделать нормальную генерацию , а не эту хуйню 
    {
        "day": "25.06.26",
        "PU": { "fullName": "Push Ups", "reps1": { "color": "", "value": 1 }, "rest1": { "color": "", "value": 1 }, "reps2": { "color": "", "value": 1 }, "rest2": { "color": "", "value": 1 } },
        "RWC": { "fullName": "Reverse Wrist Curl", "reps1": { "color": "", "value": 1 }, "rest1": { "color": "", "value": 1 }, "reps2": { "color": "", "value": 1 }, "rest2": { "color": "", "value": 1 } },
        "WC": { "fullName": "Wrist Curl", "reps1": { "color": "", "value": 1 }, "rest1": { "color": "", "value": 1 }, "reps2": { "color": "", "value": 1 }, "rest2": { "color": "", "value": 1 } },
        "WSC": { "fullName": "Wrist Side Curl", "reps1": { "color": "", "value": 1 }, "rest1": { "color": "", "value": 1 }, "reps2": { "color": "", "value": 1 }, "rest2": { "color": "", "value": 1 } },
        "WP": { "fullName": "Wrist Pronation", "reps1": { "color": "", "value": 1 }, "rest1": { "color": "", "value": 1 }, "reps2": { "color": "", "value": 1 }, "rest2": { "color": "", "value": 1 } },
        "WS": { "fullName": "Wrist Suplination", "reps1": { "color": "", "value": 1 }, "rest1": { "color": "", "value": 1 }, "reps2": { "color": "", "value": 1 }, "rest2": { "color": "", "value": 1 } },
        "weights": {
            "PU": { "fullName": "Push Ups", "data": { "color": "green", "value": 10 } },
            "RWC": { "fullName": "Reverse Wrist Curl", "data": { "color": "blue", "value": 15 } },
            "WC": { "fullName": "Wrist Curl", "data": { "color": "", "value": 10 } },
            "WSC": { "fullName": "Wrist Side Curl", "data": { "color": "", "value": 15 } },
            "WP": { "fullName": "Wrist Pronation", "data": { "color": "", "value": 10 } },
            "WS": { "fullName": "Wrist Suplination", "data": { "color": "", "value": 1.5 } }
        }
    },
    {
        "day": "28.06.26",
        "SU": { "fullName": "Sit-Ups", "reps1": { "color": "", "value": 1 }, "rest1": { "color": "", "value": 1 }, "reps2": { "color": "", "value": 1 }, "rest2": { "color": "", "value": 1 } },
        "Sq": { "fullName": "Squats", "reps1": { "color": "", "value": 1 }, "rest1": { "color": "", "value": 1 }, "reps2": { "color": "", "value": 1 }, "rest2": { "color": "", "value": 1 } },
        "ETK": { "fullName": "Elbow To Knee", "reps1": { "color": "", "value": 1 }, "rest1": { "color": "", "value": 1 }, "reps2": { "color": "", "value": 1 }, "rest2": { "color": "", "value": 1 } },
        "SCR": { "fullName": "Standing Calf Raise", "reps1": { "color": "", "value": 1 }, "rest1": { "color": "", "value": 1 }, "reps2": { "color": "", "value": 1 }, "rest2": { "color": "", "value": 1 } },
        "BSS": { "fullName": "Bulgarian Slit Squats", "reps1": { "color": "", "value": 1 }, "rest1": { "color": "", "value": 1 }, "reps2": { "color": "", "value": 1 }, "rest2": { "color": "", "value": 1 } },
        "LR": { "fullName": "Leg Raises", "reps1": { "color": "", "value": 1 }, "rest1": { "color": "", "value": 1 }, "reps2": { "color": "", "value": 1 }, "rest2": { "color": "", "value": 1 } },
        "EP": { "fullName": "Elbow Plank", "reps1": { "color": "", "value": 1 }, "rest1": { "color": "", "value": 1 }, "reps2": { "color": "", "value": 1 }, "rest2": { "color": "", "value": 1 } },
        "weights": {
            "SU": { "fullName": "Sit-Ups", "data": { "color": "", "value": 1 } },
            "Sq": { "fullName": "Squats", "data": { "color": "", "value": 1 } },
            "ETK": { "fullName": "Elbow To Knee", "data": { "color": "", "value": 1 } },
            "SCR": { "fullName": "Standing Calf Raise", "data": { "color": "", "value": 1 } },
            "BSS": { "fullName": "Bulgarian Slit Squats", "data": { "color": "", "value": 1 } },
            "LR": { "fullName": "Leg Raises", "data": { "color": "", "value": 1 } },
            "EP": { "fullName": "Elbow Plank", "data": { "color": "", "value": 1 } }
        }
    },
    {
        "day": "29.06.26",
        "BR": { "fullName": "Barbell Row", "reps1": { "color": "", "value": 1 }, "rest1": { "color": "", "value": 1 }, "reps2": { "color": "", "value": 1 }, "rest2": { "color": "", "value": 1 } },
        "weights": {
            "BR": { "fullName": "Barbell Row", "data": { "color": "", "value": 1 } }
        }
    },
    {
        "day": "01.07.26",
        "PU": { "fullName": "Push Ups", "reps1": { "color": "", "value": 1 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
        "RWC": { "fullName": "Reverse Wrist Curl", "reps1": { "color": "", "value": 1 }, "rest1": { "color": "", "value": 1 }, "reps2": { "color": "", "value": 1 }, "rest2": { "color": "", "value": 1 } },
        "WC": { "fullName": "Wrist Curl", "reps1": { "color": "", "value": 1 }, "rest1": { "color": "", "value": 1 }, "reps2": { "color": "", "value": 1 }, "rest2": { "color": "", "value": 1 } },
        "WSC": { "fullName": "Wrist Side Curl", "reps1": { "color": "", "value": 1 }, "rest1": { "color": "", "value": 1 }, "reps2": { "color": "", "value": 1 }, "rest2": { "color": "", "value": 1 } },
        "WP": { "fullName": "Wrist Pronation", "reps1": { "color": "", "value": 1 }, "rest1": { "color": "", "value": 1 }, "reps2": { "color": "", "value": 1 }, "rest2": { "color": "", "value": 1 } },
        "WS": { "fullName": "Wrist Suplination", "reps1": { "color": "", "value": 1 }, "rest1": { "color": "", "value": 1 }, "reps2": { "color": "", "value": 1 }, "rest2": { "color": "", "value": 1 } },
        "weights": {
            "PU": { "fullName": "Push Ups", "data": { "color": "green", "value": 10 } },
            "RWC": { "fullName": "Reverse Wrist Curl", "data": { "color": "blue", "value": 15 } },
            "WC": { "fullName": "Wrist Curl", "data": { "color": "", "value": 10 } },
            "WSC": { "fullName": "Wrist Side Curl", "data": { "color": "", "value": 15 } },
            "WP": { "fullName": "Wrist Pronation", "data": { "color": "", "value": 10 } },
            "WS": { "fullName": "Wrist Suplination", "data": { "color": "", "value": 1.5 } }
        }
    },
    /*
    {
        "day": "04.07.26",
        "SU": { "fullName": "Sit-Ups", "reps1": { "color": "", "value": 1 }, "rest1": { "color": "", "value": 1 }, "reps2": { "color": "", "value": 1 }, "rest2": { "color": "", "value": 1 } },
        "Sq": { "fullName": "Squats", "reps1": { "color": "", "value": 1 }, "rest1": { "color": "", "value": 1 }, "reps2": { "color": "", "value": 1 }, "rest2": { "color": "", "value": 1 } },
        "ETK": { "fullName": "Elbow To Knee", "reps1": { "color": "", "value": 1 }, "rest1": { "color": "", "value": 1 }, "reps2": { "color": "", "value": 1 }, "rest2": { "color": "", "value": 1 } },
        "SCR": { "fullName": "Standing Calf Raise", "reps1": { "color": "", "value": 1 }, "rest1": { "color": "", "value": 1 }, "reps2": { "color": "", "value": 1 }, "rest2": { "color": "", "value": 1 } },
        "BSS": { "fullName": "Bulgarian Slit Squats", "reps1": { "color": "", "value": 1 }, "rest1": { "color": "", "value": 1 }, "reps2": { "color": "", "value": 1 }, "rest2": { "color": "", "value": 1 } },
        "LR": { "fullName": "Leg Raises", "reps1": { "color": "", "value": 1 }, "rest1": { "color": "", "value": 1 }, "reps2": { "color": "", "value": 1 }, "rest2": { "color": "", "value": 1 } },
        "EP": { "fullName": "Elbow Plank", "reps1": { "color": "", "value": 1 }, "rest1": { "color": "", "value": 1 }, "reps2": { "color": "", "value": 1 }, "rest2": { "color": "", "value": 1 } },
        "weights": {
            "SU": { "fullName": "Sit-Ups", "data": { "color": "", "value": 1 } },
            "Sq": { "fullName": "Squats", "data": { "color": "", "value": 1 } },
            "ETK": { "fullName": "Elbow To Knee", "data": { "color": "", "value": 1 } },
            "SCR": { "fullName": "Standing Calf Raise", "data": { "color": "", "value": 1 } },
            "BSS": { "fullName": "Bulgarian Slit Squats", "data": { "color": "", "value": 1 } },
            "LR": { "fullName": "Leg Raises", "data": { "color": "", "value": 1 } },
            "EP": { "fullName": "Elbow Plank", "data": { "color": "", "value": 1 } }
        }
    },
    {
        "day": "05.07.26",
        "BR": { "fullName": "Barbell Row", "reps1": { "color": "", "value": 1 }, "rest1": { "color": "", "value": 1 }, "reps2": { "color": "", "value": 1 }, "rest2": { "color": "", "value": 1 } },
        "weights": {
            "BR": { "fullName": "Barbell Row", "data": { "color": "", "value": 1 } }
        }
    },
    {
        "day": "07.07.26",
        "PU": { "fullName": "Push Ups", "reps1": { "color": "", "value": 1 }, "rest1": { "color": "", "value": 1 }, "reps2": { "color": "", "value": 1 }, "rest2": { "color": "", "value": 1 } },
        "RWC": { "fullName": "Reverse Wrist Curl", "reps1": { "color": "", "value": 1 }, "rest1": { "color": "", "value": 1 }, "reps2": { "color": "", "value": 1 }, "rest2": { "color": "", "value": 1 } },
        "WC": { "fullName": "Wrist Curl", "reps1": { "color": "", "value": 1 }, "rest1": { "color": "", "value": 1 }, "reps2": { "color": "", "value": 1 }, "rest2": { "color": "", "value": 1 } },
        "WSC": { "fullName": "Wrist Side Curl", "reps1": { "color": "", "value": 1 }, "rest1": { "color": "", "value": 1 }, "reps2": { "color": "", "value": 1 }, "rest2": { "color": "", "value": 1 } },
        "WP": { "fullName": "Wrist Pronation", "reps1": { "color": "", "value": 1 }, "rest1": { "color": "", "value": 1 }, "reps2": { "color": "", "value": 1 }, "rest2": { "color": "", "value": 1 } },
        "WS": { "fullName": "Wrist Suplination", "reps1": { "color": "", "value": 1 }, "rest1": { "color": "", "value": 1 }, "reps2": { "color": "", "value": 1 }, "rest2": { "color": "", "value": 1 } },
        "weights": {
            "PU": { "fullName": "Push Ups", "data": { "color": "green", "value": 10 } },
            "RWC": { "fullName": "Reverse Wrist Curl", "data": { "color": "blue", "value": 15 } },
            "WC": { "fullName": "Wrist Curl", "data": { "color": "", "value": 10 } },
            "WSC": { "fullName": "Wrist Side Curl", "data": { "color": "", "value": 15 } },
            "WP": { "fullName": "Wrist Pronation", "data": { "color": "", "value": 10 } },
            "WS": { "fullName": "Wrist Suplination", "data": { "color": "", "value": 1.5 } }
        }
    },
    {
        "day": "10.07.26",
        "SU": { "fullName": "Sit-Ups", "reps1": { "color": "", "value": 1 }, "rest1": { "color": "", "value": 1 }, "reps2": { "color": "", "value": 1 }, "rest2": { "color": "", "value": 1 } },
        "Sq": { "fullName": "Squats", "reps1": { "color": "", "value": 1 }, "rest1": { "color": "", "value": 1 }, "reps2": { "color": "", "value": 1 }, "rest2": { "color": "", "value": 1 } },
        "ETK": { "fullName": "Elbow To Knee", "reps1": { "color": "", "value": 1 }, "rest1": { "color": "", "value": 1 }, "reps2": { "color": "", "value": 1 }, "rest2": { "color": "", "value": 1 } },
        "SCR": { "fullName": "Standing Calf Raise", "reps1": { "color": "", "value": 1 }, "rest1": { "color": "", "value": 1 }, "reps2": { "color": "", "value": 1 }, "rest2": { "color": "", "value": 1 } },
        "BSS": { "fullName": "Bulgarian Slit Squats", "reps1": { "color": "", "value": 1 }, "rest1": { "color": "", "value": 1 }, "reps2": { "color": "", "value": 1 }, "rest2": { "color": "", "value": 1 } },
        "LR": { "fullName": "Leg Raises", "reps1": { "color": "", "value": 1 }, "rest1": { "color": "", "value": 1 }, "reps2": { "color": "", "value": 1 }, "rest2": { "color": "", "value": 1 } },
        "EP": { "fullName": "Elbow Plank", "reps1": { "color": "", "value": 1 }, "rest1": { "color": "", "value": 1 }, "reps2": { "color": "", "value": 1 }, "rest2": { "color": "", "value": 1 } },
        "weights": {
            "SU": { "fullName": "Sit-Ups", "data": { "color": "", "value": 1 } },
            "Sq": { "fullName": "Squats", "data": { "color": "", "value": 1 } },
            "ETK": { "fullName": "Elbow To Knee", "data": { "color": "", "value": 1 } },
            "SCR": { "fullName": "Standing Calf Raise", "data": { "color": "", "value": 1 } },
            "BSS": { "fullName": "Bulgarian Slit Squats", "data": { "color": "", "value": 1 } },
            "LR": { "fullName": "Leg Raises", "data": { "color": "", "value": 1 } },
            "EP": { "fullName": "Elbow Plank", "data": { "color": "", "value": 1 } }
        }
    },
    {
        "day": "11.07.26",
        "BR": { "fullName": "Barbell Row", "reps1": { "color": "", "value": 1 }, "rest1": { "color": "", "value": 1 }, "reps2": { "color": "", "value": 1 }, "rest2": { "color": "", "value": 1 } },
        "weights": {
            "BR": { "fullName": "Barbell Row", "data": { "color": "", "value": 1 } }
        }
    },
    {
        "day": "13.07.26",
        "PU": { "fullName": "Push Ups", "reps1": { "color": "", "value": 1 }, "rest1": { "color": "", "value": 1 }, "reps2": { "color": "", "value": 1 }, "rest2": { "color": "", "value": 1 } },
        "RWC": { "fullName": "Reverse Wrist Curl", "reps1": { "color": "", "value": 1 }, "rest1": { "color": "", "value": 1 }, "reps2": { "color": "", "value": 1 }, "rest2": { "color": "", "value": 1 } },
        "WC": { "fullName": "Wrist Curl", "reps1": { "color": "", "value": 1 }, "rest1": { "color": "", "value": 1 }, "reps2": { "color": "", "value": 1 }, "rest2": { "color": "", "value": 1 } },
        "WSC": { "fullName": "Wrist Side Curl", "reps1": { "color": "", "value": 1 }, "rest1": { "color": "", "value": 1 }, "reps2": { "color": "", "value": 1 }, "rest2": { "color": "", "value": 1 } },
        "WP": { "fullName": "Wrist Pronation", "reps1": { "color": "", "value": 1 }, "rest1": { "color": "", "value": 1 }, "reps2": { "color": "", "value": 1 }, "rest2": { "color": "", "value": 1 } },
        "WS": { "fullName": "Wrist Suplination", "reps1": { "color": "", "value": 1 }, "rest1": { "color": "", "value": 1 }, "reps2": { "color": "", "value": 1 }, "rest2": { "color": "", "value": 1 } },
        "weights": {
            "PU": { "fullName": "Push Ups", "data": { "color": "green", "value": 10 } },
            "RWC": { "fullName": "Reverse Wrist Curl", "data": { "color": "blue", "value": 15 } },
            "WC": { "fullName": "Wrist Curl", "data": { "color": "", "value": 10 } },
            "WSC": { "fullName": "Wrist Side Curl", "data": { "color": "", "value": 15 } },
            "WP": { "fullName": "Wrist Pronation", "data": { "color": "", "value": 10 } },
            "WS": { "fullName": "Wrist Suplination", "data": { "color": "", "value": 1.5 } }
        }
    },
    {
        "day": "16.07.26",
        "SU": { "fullName": "Sit-Ups", "reps1": { "color": "", "value": 1 }, "rest1": { "color": "", "value": 1 }, "reps2": { "color": "", "value": 1 }, "rest2": { "color": "", "value": 1 } },
        "Sq": { "fullName": "Squats", "reps1": { "color": "", "value": 1 }, "rest1": { "color": "", "value": 1 }, "reps2": { "color": "", "value": 1 }, "rest2": { "color": "", "value": 1 } },
        "ETK": { "fullName": "Elbow To Knee", "reps1": { "color": "", "value": 1 }, "rest1": { "color": "", "value": 1 }, "reps2": { "color": "", "value": 1 }, "rest2": { "color": "", "value": 1 } },
        "SCR": { "fullName": "Standing Calf Raise", "reps1": { "color": "", "value": 1 }, "rest1": { "color": "", "value": 1 }, "reps2": { "color": "", "value": 1 }, "rest2": { "color": "", "value": 1 } },
        "BSS": { "fullName": "Bulgarian Slit Squats", "reps1": { "color": "", "value": 1 }, "rest1": { "color": "", "value": 1 }, "reps2": { "color": "", "value": 1 }, "rest2": { "color": "", "value": 1 } },
        "LR": { "fullName": "Leg Raises", "reps1": { "color": "", "value": 1 }, "rest1": { "color": "", "value": 1 }, "reps2": { "color": "", "value": 1 }, "rest2": { "color": "", "value": 1 } },
        "EP": { "fullName": "Elbow Plank", "reps1": { "color": "", "value": 1 }, "rest1": { "color": "", "value": 1 }, "reps2": { "color": "", "value": 1 }, "rest2": { "color": "", "value": 1 } },
        "weights": {
            "SU": { "fullName": "Sit-Ups", "data": { "color": "", "value": 1 } },
            "Sq": { "fullName": "Squats", "data": { "color": "", "value": 1 } },
            "ETK": { "fullName": "Elbow To Knee", "data": { "color": "", "value": 1 } },
            "SCR": { "fullName": "Standing Calf Raise", "data": { "color": "", "value": 1 } },
            "BSS": { "fullName": "Bulgarian Slit Squats", "data": { "color": "", "value": 1 } },
            "LR": { "fullName": "Leg Raises", "data": { "color": "", "value": 1 } },
            "EP": { "fullName": "Elbow Plank", "data": { "color": "", "value": 1 } }
        }
    },
    {
        "day": "17.07.26",
        "BR": { "fullName": "Barbell Row", "reps1": { "color": "", "value": 1 }, "rest1": { "color": "", "value": 1 }, "reps2": { "color": "", "value": 1 }, "rest2": { "color": "", "value": 1 } },
        "weights": {
            "BR": { "fullName": "Barbell Row", "data": { "color": "", "value": 1 } }
        }
    },
    {
        "day": "19.07.26",
        "PU": { "fullName": "Push Ups", "reps1": { "color": "", "value": 1 }, "rest1": { "color": "", "value": 1 }, "reps2": { "color": "", "value": 1 }, "rest2": { "color": "", "value": 1 } },
        "RWC": { "fullName": "Reverse Wrist Curl", "reps1": { "color": "", "value": 1 }, "rest1": { "color": "", "value": 1 }, "reps2": { "color": "", "value": 1 }, "rest2": { "color": "", "value": 1 } },
        "WC": { "fullName": "Wrist Curl", "reps1": { "color": "", "value": 1 }, "rest1": { "color": "", "value": 1 }, "reps2": { "color": "", "value": 1 }, "rest2": { "color": "", "value": 1 } },
        "WSC": { "fullName": "Wrist Side Curl", "reps1": { "color": "", "value": 1 }, "rest1": { "color": "", "value": 1 }, "reps2": { "color": "", "value": 1 }, "rest2": { "color": "", "value": 1 } },
        "WP": { "fullName": "Wrist Pronation", "reps1": { "color": "", "value": 1 }, "rest1": { "color": "", "value": 1 }, "reps2": { "color": "", "value": 1 }, "rest2": { "color": "", "value": 1 } },
        "WS": { "fullName": "Wrist Suplination", "reps1": { "color": "", "value": 1 }, "rest1": { "color": "", "value": 1 }, "reps2": { "color": "", "value": 1 }, "rest2": { "color": "", "value": 1 } },
        "weights": {
            "PU": { "fullName": "Push Ups", "data": { "color": "green", "value": 10 } },
            "RWC": { "fullName": "Reverse Wrist Curl", "data": { "color": "blue", "value": 15 } },
            "WC": { "fullName": "Wrist Curl", "data": { "color": "", "value": 10 } },
            "WSC": { "fullName": "Wrist Side Curl", "data": { "color": "", "value": 15 } },
            "WP": { "fullName": "Wrist Pronation", "data": { "color": "", "value": 10 } },
            "WS": { "fullName": "Wrist Suplination", "data": { "color": "", "value": 1.5 } }
        }
    },
    {
        "day": "22.07.26",
        "SU": { "fullName": "Sit-Ups", "reps1": { "color": "", "value": 1 }, "rest1": { "color": "", "value": 1 }, "reps2": { "color": "", "value": 1 }, "rest2": { "color": "", "value": 1 } },
        "Sq": { "fullName": "Squats", "reps1": { "color": "", "value": 1 }, "rest1": { "color": "", "value": 1 }, "reps2": { "color": "", "value": 1 }, "rest2": { "color": "", "value": 1 } },
        "ETK": { "fullName": "Elbow To Knee", "reps1": { "color": "", "value": 1 }, "rest1": { "color": "", "value": 1 }, "reps2": { "color": "", "value": 1 }, "rest2": { "color": "", "value": 1 } },
        "SCR": { "fullName": "Standing Calf Raise", "reps1": { "color": "", "value": 1 }, "rest1": { "color": "", "value": 1 }, "reps2": { "color": "", "value": 1 }, "rest2": { "color": "", "value": 1 } },
        "BSS": { "fullName": "Bulgarian Slit Squats", "reps1": { "color": "", "value": 1 }, "rest1": { "color": "", "value": 1 }, "reps2": { "color": "", "value": 1 }, "rest2": { "color": "", "value": 1 } },
        "LR": { "fullName": "Leg Raises", "reps1": { "color": "", "value": 1 }, "rest1": { "color": "", "value": 1 }, "reps2": { "color": "", "value": 1 }, "rest2": { "color": "", "value": 1 } },
        "EP": { "fullName": "Elbow Plank", "reps1": { "color": "", "value": 1 }, "rest1": { "color": "", "value": 1 }, "reps2": { "color": "", "value": 1 }, "rest2": { "color": "", "value": 1 } },
        "weights": {
            "SU": { "fullName": "Sit-Ups", "data": { "color": "", "value": 1 } },
            "Sq": { "fullName": "Squats", "data": { "color": "", "value": 1 } },
            "ETK": { "fullName": "Elbow To Knee", "data": { "color": "", "value": 1 } },
            "SCR": { "fullName": "Standing Calf Raise", "data": { "color": "", "value": 1 } },
            "BSS": { "fullName": "Bulgarian Slit Squats", "data": { "color": "", "value": 1 } },
            "LR": { "fullName": "Leg Raises", "data": { "color": "", "value": 1 } },
            "EP": { "fullName": "Elbow Plank", "data": { "color": "", "value": 1 } }
        }
    },
    {
        "day": "23.07.26",
        "BR": { "fullName": "Barbell Row", "reps1": { "color": "", "value": 1 }, "rest1": { "color": "", "value": 1 }, "reps2": { "color": "", "value": 1 }, "rest2": { "color": "", "value": 1 } },
        "weights": {
            "BR": { "fullName": "Barbell Row", "data": { "color": "", "value": 1 } }
        }
    },
    {
        "day": "25.07.26",
        "PU": { "fullName": "Push Ups", "reps1": { "color": "", "value": 1 }, "rest1": { "color": "", "value": 1 }, "reps2": { "color": "", "value": 1 }, "rest2": { "color": "", "value": 1 } },
        "RWC": { "fullName": "Reverse Wrist Curl", "reps1": { "color": "", "value": 1 }, "rest1": { "color": "", "value": 1 }, "reps2": { "color": "", "value": 1 }, "rest2": { "color": "", "value": 1 } },
        "WC": { "fullName": "Wrist Curl", "reps1": { "color": "", "value": 1 }, "rest1": { "color": "", "value": 1 }, "reps2": { "color": "", "value": 1 }, "rest2": { "color": "", "value": 1 } },
        "WSC": { "fullName": "Wrist Side Curl", "reps1": { "color": "", "value": 1 }, "rest1": { "color": "", "value": 1 }, "reps2": { "color": "", "value": 1 }, "rest2": { "color": "", "value": 1 } },
        "WP": { "fullName": "Wrist Pronation", "reps1": { "color": "", "value": 1 }, "rest1": { "color": "", "value": 1 }, "reps2": { "color": "", "value": 1 }, "rest2": { "color": "", "value": 1 } },
        "WS": { "fullName": "Wrist Suplination", "reps1": { "color": "", "value": 1 }, "rest1": { "color": "", "value": 1 }, "reps2": { "color": "", "value": 1 }, "rest2": { "color": "", "value": 1 } },
        "weights": {
            "PU": { "fullName": "Push Ups", "data": { "color": "green", "value": 10 } },
            "RWC": { "fullName": "Reverse Wrist Curl", "data": { "color": "blue", "value": 15 } },
            "WC": { "fullName": "Wrist Curl", "data": { "color": "", "value": 10 } },
            "WSC": { "fullName": "Wrist Side Curl", "data": { "color": "", "value": 15 } },
            "WP": { "fullName": "Wrist Pronation", "data": { "color": "", "value": 10 } },
            "WS": { "fullName": "Wrist Suplination", "data": { "color": "", "value": 1.5 } }
        }
    },
    {
        "day": "28.07.26",
        "SU": { "fullName": "Sit-Ups", "reps1": { "color": "", "value": 1 }, "rest1": { "color": "", "value": 1 }, "reps2": { "color": "", "value": 1 }, "rest2": { "color": "", "value": 1 } },
        "Sq": { "fullName": "Squats", "reps1": { "color": "", "value": 1 }, "rest1": { "color": "", "value": 1 }, "reps2": { "color": "", "value": 1 }, "rest2": { "color": "", "value": 1 } },
        "ETK": { "fullName": "Elbow To Knee", "reps1": { "color": "", "value": 1 }, "rest1": { "color": "", "value": 1 }, "reps2": { "color": "", "value": 1 }, "rest2": { "color": "", "value": 1 } },
        "SCR": { "fullName": "Standing Calf Raise", "reps1": { "color": "", "value": 1 }, "rest1": { "color": "", "value": 1 }, "reps2": { "color": "", "value": 1 }, "rest2": { "color": "", "value": 1 } },
        "BSS": { "fullName": "Bulgarian Slit Squats", "reps1": { "color": "", "value": 1 }, "rest1": { "color": "", "value": 1 }, "reps2": { "color": "", "value": 1 }, "rest2": { "color": "", "value": 1 } },
        "LR": { "fullName": "Leg Raises", "reps1": { "color": "", "value": 1 }, "rest1": { "color": "", "value": 1 }, "reps2": { "color": "", "value": 1 }, "rest2": { "color": "", "value": 1 } },
        "EP": { "fullName": "Elbow Plank", "reps1": { "color": "", "value": 1 }, "rest1": { "color": "", "value": 1 }, "reps2": { "color": "", "value": 1 }, "rest2": { "color": "", "value": 1 } },
        "weights": {
            "SU": { "fullName": "Sit-Ups", "data": { "color": "", "value": 1 } },
            "Sq": { "fullName": "Squats", "data": { "color": "", "value": 1 } },
            "ETK": { "fullName": "Elbow To Knee", "data": { "color": "", "value": 1 } },
            "SCR": { "fullName": "Standing Calf Raise", "data": { "color": "", "value": 1 } },
            "BSS": { "fullName": "Bulgarian Slit Squats", "data": { "color": "", "value": 1 } },
            "LR": { "fullName": "Leg Raises", "data": { "color": "", "value": 1 } },
            "EP": { "fullName": "Elbow Plank", "data": { "color": "", "value": 1 } }
        }
    },
    {
        "day": "29.07.26",
        "BR": { "fullName": "Barbell Row", "reps1": { "color": "", "value": 1 }, "rest1": { "color": "", "value": 1 }, "reps2": { "color": "", "value": 1 }, "rest2": { "color": "", "value": 1 } },
        "weights": {
            "BR": { "fullName": "Barbell Row", "data": { "color": "", "value": 1 } }
        }
    },
    {
        "day": "31.07.26",
        "PU": { "fullName": "Push Ups", "reps1": { "color": "", "value": 1 }, "rest1": { "color": "", "value": 1 }, "reps2": { "color": "", "value": 1 }, "rest2": { "color": "", "value": 1 } },
        "RWC": { "fullName": "Reverse Wrist Curl", "reps1": { "color": "", "value": 1 }, "rest1": { "color": "", "value": 1 }, "reps2": { "color": "", "value": 1 }, "rest2": { "color": "", "value": 1 } },
        "WC": { "fullName": "Wrist Curl", "reps1": { "color": "", "value": 1 }, "rest1": { "color": "", "value": 1 }, "reps2": { "color": "", "value": 1 }, "rest2": { "color": "", "value": 1 } },
        "WSC": { "fullName": "Wrist Side Curl", "reps1": { "color": "", "value": 1 }, "rest1": { "color": "", "value": 1 }, "reps2": { "color": "", "value": 1 }, "rest2": { "color": "", "value": 1 } },
        "WP": { "fullName": "Wrist Pronation", "reps1": { "color": "", "value": 1 }, "rest1": { "color": "", "value": 1 }, "reps2": { "color": "", "value": 1 }, "rest2": { "color": "", "value": 1 } },
        "WS": { "fullName": "Wrist Suplination", "reps1": { "color": "", "value": 1 }, "rest1": { "color": "", "value": 1 }, "reps2": { "color": "", "value": 1 }, "rest2": { "color": "", "value": 1 } },
        "weights": {
            "PU": { "fullName": "Push Ups", "data": { "color": "green", "value": 10 } },
            "RWC": { "fullName": "Reverse Wrist Curl", "data": { "color": "blue", "value": 15 } },
            "WC": { "fullName": "Wrist Curl", "data": { "color": "", "value": 10 } },
            "WSC": { "fullName": "Wrist Side Curl", "data": { "color": "", "value": 15 } },
            "WP": { "fullName": "Wrist Pronation", "data": { "color": "", "value": 10 } },
            "WS": { "fullName": "Wrist Suplination", "data": { "color": "", "value": 1.5 } }
        }
    },
    {
        "day": "03.08.26",
        "SU": { "fullName": "Sit-Ups", "reps1": { "color": "", "value": 1 }, "rest1": { "color": "", "value": 1 }, "reps2": { "color": "", "value": 1 }, "rest2": { "color": "", "value": 1 } },
        "Sq": { "fullName": "Squats", "reps1": { "color": "", "value": 1 }, "rest1": { "color": "", "value": 1 }, "reps2": { "color": "", "value": 1 }, "rest2": { "color": "", "value": 1 } },
        "ETK": { "fullName": "Elbow To Knee", "reps1": { "color": "", "value": 1 }, "rest1": { "color": "", "value": 1 }, "reps2": { "color": "", "value": 1 }, "rest2": { "color": "", "value": 1 } },
        "SCR": { "fullName": "Standing Calf Raise", "reps1": { "color": "", "value": 1 }, "rest1": { "color": "", "value": 1 }, "reps2": { "color": "", "value": 1 }, "rest2": { "color": "", "value": 1 } },
        "BSS": { "fullName": "Bulgarian Slit Squats", "reps1": { "color": "", "value": 1 }, "rest1": { "color": "", "value": 1 }, "reps2": { "color": "", "value": 1 }, "rest2": { "color": "", "value": 1 } },
        "LR": { "fullName": "Leg Raises", "reps1": { "color": "", "value": 1 }, "rest1": { "color": "", "value": 1 }, "reps2": { "color": "", "value": 1 }, "rest2": { "color": "", "value": 1 } },
        "EP": { "fullName": "Elbow Plank", "reps1": { "color": "", "value": 1 }, "rest1": { "color": "", "value": 1 }, "reps2": { "color": "", "value": 1 }, "rest2": { "color": "", "value": 1 } },
        "weights": {
            "SU": { "fullName": "Sit-Ups", "data": { "color": "", "value": 1 } },
            "Sq": { "fullName": "Squats", "data": { "color": "", "value": 1 } },
            "ETK": { "fullName": "Elbow To Knee", "data": { "color": "", "value": 1 } },
            "SCR": { "fullName": "Standing Calf Raise", "data": { "color": "", "value": 1 } },
            "BSS": { "fullName": "Bulgarian Slit Squats", "data": { "color": "", "value": 1 } },
            "LR": { "fullName": "Leg Raises", "data": { "color": "", "value": 1 } },
            "EP": { "fullName": "Elbow Plank", "data": { "color": "", "value": 1 } }
        }
    },
    {
        "day": "04.08.26",
        "BR": { "fullName": "Barbell Row", "reps1": { "color": "", "value": 1 }, "rest1": { "color": "", "value": 1 }, "reps2": { "color": "", "value": 1 }, "rest2": { "color": "", "value": 1 } },
        "weights": {
            "BR": { "fullName": "Barbell Row", "data": { "color": "", "value": 1 } }
        }
    },
    {
        "day": "06.08.26",
        "PU": { "fullName": "Push Ups", "reps1": { "color": "", "value": 1 }, "rest1": { "color": "", "value": 1 }, "reps2": { "color": "", "value": 1 }, "rest2": { "color": "", "value": 1 } },
        "RWC": { "fullName": "Reverse Wrist Curl", "reps1": { "color": "", "value": 1 }, "rest1": { "color": "", "value": 1 }, "reps2": { "color": "", "value": 1 }, "rest2": { "color": "", "value": 1 } },
        "WC": { "fullName": "Wrist Curl", "reps1": { "color": "", "value": 1 }, "rest1": { "color": "", "value": 1 }, "reps2": { "color": "", "value": 1 }, "rest2": { "color": "", "value": 1 } },
        "WSC": { "fullName": "Wrist Side Curl", "reps1": { "color": "", "value": 1 }, "rest1": { "color": "", "value": 1 }, "reps2": { "color": "", "value": 1 }, "rest2": { "color": "", "value": 1 } },
        "WP": { "fullName": "Wrist Pronation", "reps1": { "color": "", "value": 1 }, "rest1": { "color": "", "value": 1 }, "reps2": { "color": "", "value": 1 }, "rest2": { "color": "", "value": 1 } },
        "WS": { "fullName": "Wrist Suplination", "reps1": { "color": "", "value": 1 }, "rest1": { "color": "", "value": 1 }, "reps2": { "color": "", "value": 1 }, "rest2": { "color": "", "value": 1 } },
        "weights": {
            "PU": { "fullName": "Push Ups", "data": { "color": "green", "value": 10 } },
            "RWC": { "fullName": "Reverse Wrist Curl", "data": { "color": "blue", "value": 15 } },
            "WC": { "fullName": "Wrist Curl", "data": { "color": "", "value": 10 } },
            "WSC": { "fullName": "Wrist Side Curl", "data": { "color": "", "value": 15 } },
            "WP": { "fullName": "Wrist Pronation", "data": { "color": "", "value": 10 } },
            "WS": { "fullName": "Wrist Suplination", "data": { "color": "", "value": 1.5 } }
        }
    },
    {
        "day": "09.08.26",
        "SU": { "fullName": "Sit-Ups", "reps1": { "color": "", "value": 1 }, "rest1": { "color": "", "value": 1 }, "reps2": { "color": "", "value": 1 }, "rest2": { "color": "", "value": 1 } },
        "Sq": { "fullName": "Squats", "reps1": { "color": "", "value": 1 }, "rest1": { "color": "", "value": 1 }, "reps2": { "color": "", "value": 1 }, "rest2": { "color": "", "value": 1 } },
        "ETK": { "fullName": "Elbow To Knee", "reps1": { "color": "", "value": 1 }, "rest1": { "color": "", "value": 1 }, "reps2": { "color": "", "value": 1 }, "rest2": { "color": "", "value": 1 } },
        "SCR": { "fullName": "Standing Calf Raise", "reps1": { "color": "", "value": 1 }, "rest1": { "color": "", "value": 1 }, "reps2": { "color": "", "value": 1 }, "rest2": { "color": "", "value": 1 } },
        "BSS": { "fullName": "Bulgarian Slit Squats", "reps1": { "color": "", "value": 1 }, "rest1": { "color": "", "value": 1 }, "reps2": { "color": "", "value": 1 }, "rest2": { "color": "", "value": 1 } },
        "LR": { "fullName": "Leg Raises", "reps1": { "color": "", "value": 1 }, "rest1": { "color": "", "value": 1 }, "reps2": { "color": "", "value": 1 }, "rest2": { "color": "", "value": 1 } },
        "EP": { "fullName": "Elbow Plank", "reps1": { "color": "", "value": 1 }, "rest1": { "color": "", "value": 1 }, "reps2": { "color": "", "value": 1 }, "rest2": { "color": "", "value": 1 } },
        "weights": {
            "SU": { "fullName": "Sit-Ups", "data": { "color": "", "value": 1 } },
            "Sq": { "fullName": "Squats", "data": { "color": "", "value": 1 } },
            "ETK": { "fullName": "Elbow To Knee", "data": { "color": "", "value": 1 } },
            "SCR": { "fullName": "Standing Calf Raise", "data": { "color": "", "value": 1 } },
            "BSS": { "fullName": "Bulgarian Slit Squats", "data": { "color": "", "value": 1 } },
            "LR": { "fullName": "Leg Raises", "data": { "color": "", "value": 1 } },
            "EP": { "fullName": "Elbow Plank", "data": { "color": "", "value": 1 } }
        }
    },
    {
        "day": "10.08.26",
        "BR": { "fullName": "Barbell Row", "reps1": { "color": "", "value": 1 }, "rest1": { "color": "", "value": 1 }, "reps2": { "color": "", "value": 1 }, "rest2": { "color": "", "value": 1 } },
        "weights": {
            "BR": { "fullName": "Barbell Row", "data": { "color": "", "value": 1 } }
        }
    },
    {
        "day": "12.08.26",
        "PU": { "fullName": "Push Ups", "reps1": { "color": "", "value": 1 }, "rest1": { "color": "", "value": 1 }, "reps2": { "color": "", "value": 1 }, "rest2": { "color": "", "value": 1 } },
        "RWC": { "fullName": "Reverse Wrist Curl", "reps1": { "color": "", "value": 1 }, "rest1": { "color": "", "value": 1 }, "reps2": { "color": "", "value": 1 }, "rest2": { "color": "", "value": 1 } },
        "WC": { "fullName": "Wrist Curl", "reps1": { "color": "", "value": 1 }, "rest1": { "color": "", "value": 1 }, "reps2": { "color": "", "value": 1 }, "rest2": { "color": "", "value": 1 } },
        "WSC": { "fullName": "Wrist Side Curl", "reps1": { "color": "", "value": 1 }, "rest1": { "color": "", "value": 1 }, "reps2": { "color": "", "value": 1 }, "rest2": { "color": "", "value": 1 } },
        "WP": { "fullName": "Wrist Pronation", "reps1": { "color": "", "value": 1 }, "rest1": { "color": "", "value": 1 }, "reps2": { "color": "", "value": 1 }, "rest2": { "color": "", "value": 1 } },
        "WS": { "fullName": "Wrist Suplination", "reps1": { "color": "", "value": 1 }, "rest1": { "color": "", "value": 1 }, "reps2": { "color": "", "value": 1 }, "rest2": { "color": "", "value": 1 } },
        "weights": {
            "PU": { "fullName": "Push Ups", "data": { "color": "green", "value": 10 } },
            "RWC": { "fullName": "Reverse Wrist Curl", "data": { "color": "blue", "value": 15 } },
            "WC": { "fullName": "Wrist Curl", "data": { "color": "", "value": 10 } },
            "WSC": { "fullName": "Wrist Side Curl", "data": { "color": "", "value": 15 } },
            "WP": { "fullName": "Wrist Pronation", "data": { "color": "", "value": 10 } },
            "WS": { "fullName": "Wrist Suplination", "data": { "color": "", "value": 1.5 } }
        }
    },
    {
        "day": "15.08.26",
        "SU": { "fullName": "Sit-Ups", "reps1": { "color": "", "value": 1 }, "rest1": { "color": "", "value": 1 }, "reps2": { "color": "", "value": 1 }, "rest2": { "color": "", "value": 1 } },
        "Sq": { "fullName": "Squats", "reps1": { "color": "", "value": 1 }, "rest1": { "color": "", "value": 1 }, "reps2": { "color": "", "value": 1 }, "rest2": { "color": "", "value": 1 } },
        "ETK": { "fullName": "Elbow To Knee", "reps1": { "color": "", "value": 1 }, "rest1": { "color": "", "value": 1 }, "reps2": { "color": "", "value": 1 }, "rest2": { "color": "", "value": 1 } },
        "SCR": { "fullName": "Standing Calf Raise", "reps1": { "color": "", "value": 1 }, "rest1": { "color": "", "value": 1 }, "reps2": { "color": "", "value": 1 }, "rest2": { "color": "", "value": 1 } },
        "BSS": { "fullName": "Bulgarian Slit Squats", "reps1": { "color": "", "value": 1 }, "rest1": { "color": "", "value": 1 }, "reps2": { "color": "", "value": 1 }, "rest2": { "color": "", "value": 1 } },
        "LR": { "fullName": "Leg Raises", "reps1": { "color": "", "value": 1 }, "rest1": { "color": "", "value": 1 }, "reps2": { "color": "", "value": 1 }, "rest2": { "color": "", "value": 1 } },
        "EP": { "fullName": "Elbow Plank", "reps1": { "color": "", "value": 1 }, "rest1": { "color": "", "value": 1 }, "reps2": { "color": "", "value": 1 }, "rest2": { "color": "", "value": 1 } },
        "weights": {
            "SU": { "fullName": "Sit-Ups", "data": { "color": "", "value": 1 } },
            "Sq": { "fullName": "Squats", "data": { "color": "", "value": 1 } },
            "ETK": { "fullName": "Elbow To Knee", "data": { "color": "", "value": 1 } },
            "SCR": { "fullName": "Standing Calf Raise", "data": { "color": "", "value": 1 } },
            "BSS": { "fullName": "Bulgarian Slit Squats", "data": { "color": "", "value": 1 } },
            "LR": { "fullName": "Leg Raises", "data": { "color": "", "value": 1 } },
            "EP": { "fullName": "Elbow Plank", "data": { "color": "", "value": 1 } }
        }
    },
    {
        "day": "16.08.26",
        "BR": { "fullName": "Barbell Row", "reps1": { "color": "", "value": 1 }, "rest1": { "color": "", "value": 1 }, "reps2": { "color": "", "value": 1 }, "rest2": { "color": "", "value": 1 } },
        "weights": {
            "BR": { "fullName": "Barbell Row", "data": { "color": "", "value": 1 } }
        }
    },
    {
        "day": "18.08.26",
        "PU": { "fullName": "Push Ups", "reps1": { "color": "", "value": 1 }, "rest1": { "color": "", "value": 1 }, "reps2": { "color": "", "value": 1 }, "rest2": { "color": "", "value": 1 } },
        "RWC": { "fullName": "Reverse Wrist Curl", "reps1": { "color": "", "value": 1 }, "rest1": { "color": "", "value": 1 }, "reps2": { "color": "", "value": 1 }, "rest2": { "color": "", "value": 1 } },
        "WC": { "fullName": "Wrist Curl", "reps1": { "color": "", "value": 1 }, "rest1": { "color": "", "value": 1 }, "reps2": { "color": "", "value": 1 }, "rest2": { "color": "", "value": 1 } },
        "WSC": { "fullName": "Wrist Side Curl", "reps1": { "color": "", "value": 1 }, "rest1": { "color": "", "value": 1 }, "reps2": { "color": "", "value": 1 }, "rest2": { "color": "", "value": 1 } },
        "WP": { "fullName": "Wrist Pronation", "reps1": { "color": "", "value": 1 }, "rest1": { "color": "", "value": 1 }, "reps2": { "color": "", "value": 1 }, "rest2": { "color": "", "value": 1 } },
        "WS": { "fullName": "Wrist Suplination", "reps1": { "color": "", "value": 1 }, "rest1": { "color": "", "value": 1 }, "reps2": { "color": "", "value": 1 }, "rest2": { "color": "", "value": 1 } },
        "weights": {
            "PU": { "fullName": "Push Ups", "data": { "color": "green", "value": 10 } },
            "RWC": { "fullName": "Reverse Wrist Curl", "data": { "color": "blue", "value": 15 } },
            "WC": { "fullName": "Wrist Curl", "data": { "color": "", "value": 10 } },
            "WSC": { "fullName": "Wrist Side Curl", "data": { "color": "", "value": 15 } },
            "WP": { "fullName": "Wrist Pronation", "data": { "color": "", "value": 10 } },
            "WS": { "fullName": "Wrist Suplination", "data": { "color": "", "value": 1.5 } }
        }
    },
    {
        "day": "21.08.26",
        "SU": { "fullName": "Sit-Ups", "reps1": { "color": "", "value": 1 }, "rest1": { "color": "", "value": 1 }, "reps2": { "color": "", "value": 1 }, "rest2": { "color": "", "value": 1 } },
        "Sq": { "fullName": "Squats", "reps1": { "color": "", "value": 1 }, "rest1": { "color": "", "value": 1 }, "reps2": { "color": "", "value": 1 }, "rest2": { "color": "", "value": 1 } },
        "ETK": { "fullName": "Elbow To Knee", "reps1": { "color": "", "value": 1 }, "rest1": { "color": "", "value": 1 }, "reps2": { "color": "", "value": 1 }, "rest2": { "color": "", "value": 1 } },
        "SCR": { "fullName": "Standing Calf Raise", "reps1": { "color": "", "value": 1 }, "rest1": { "color": "", "value": 1 }, "reps2": { "color": "", "value": 1 }, "rest2": { "color": "", "value": 1 } },
        "BSS": { "fullName": "Bulgarian Slit Squats", "reps1": { "color": "", "value": 1 }, "rest1": { "color": "", "value": 1 }, "reps2": { "color": "", "value": 1 }, "rest2": { "color": "", "value": 1 } },
        "LR": { "fullName": "Leg Raises", "reps1": { "color": "", "value": 1 }, "rest1": { "color": "", "value": 1 }, "reps2": { "color": "", "value": 1 }, "rest2": { "color": "", "value": 1 } },
        "EP": { "fullName": "Elbow Plank", "reps1": { "color": "", "value": 1 }, "rest1": { "color": "", "value": 1 }, "reps2": { "color": "", "value": 1 }, "rest2": { "color": "", "value": 1 } },
        "weights": {
            "SU": { "fullName": "Sit-Ups", "data": { "color": "", "value": 1 } },
            "Sq": { "fullName": "Squats", "data": { "color": "", "value": 1 } },
            "ETK": { "fullName": "Elbow To Knee", "data": { "color": "", "value": 1 } },
            "SCR": { "fullName": "Standing Calf Raise", "data": { "color": "", "value": 1 } },
            "BSS": { "fullName": "Bulgarian Slit Squats", "data": { "color": "", "value": 1 } },
            "LR": { "fullName": "Leg Raises", "data": { "color": "", "value": 1 } },
            "EP": { "fullName": "Elbow Plank", "data": { "color": "", "value": 1 } }
        }
    },
    {
        "day": "22.08.26",
        "BR": { "fullName": "Barbell Row", "reps1": { "color": "", "value": 1 }, "rest1": { "color": "", "value": 1 }, "reps2": { "color": "", "value": 1 }, "rest2": { "color": "", "value": 1 } },
        "weights": {
            "BR": { "fullName": "Barbell Row", "data": { "color": "", "value": 1 } }
        }
    },
    {
        "day": "24.08.26",
        "PU": { "fullName": "Push Ups", "reps1": { "color": "", "value": 1 }, "rest1": { "color": "", "value": 1 }, "reps2": { "color": "", "value": 1 }, "rest2": { "color": "", "value": 1 } },
        "RWC": { "fullName": "Reverse Wrist Curl", "reps1": { "color": "", "value": 1 }, "rest1": { "color": "", "value": 1 }, "reps2": { "color": "", "value": 1 }, "rest2": { "color": "", "value": 1 } },
        "WC": { "fullName": "Wrist Curl", "reps1": { "color": "", "value": 1 }, "rest1": { "color": "", "value": 1 }, "reps2": { "color": "", "value": 1 }, "rest2": { "color": "", "value": 1 } },
        "WSC": { "fullName": "Wrist Side Curl", "reps1": { "color": "", "value": 1 }, "rest1": { "color": "", "value": 1 }, "reps2": { "color": "", "value": 1 }, "rest2": { "color": "", "value": 1 } },
        "WP": { "fullName": "Wrist Pronation", "reps1": { "color": "", "value": 1 }, "rest1": { "color": "", "value": 1 }, "reps2": { "color": "", "value": 1 }, "rest2": { "color": "", "value": 1 } },
        "WS": { "fullName": "Wrist Suplination", "reps1": { "color": "", "value": 1 }, "rest1": { "color": "", "value": 1 }, "reps2": { "color": "", "value": 1 }, "rest2": { "color": "", "value": 1 } },
        "weights": {
            "PU": { "fullName": "Push Ups", "data": { "color": "green", "value": 10 } },
            "RWC": { "fullName": "Reverse Wrist Curl", "data": { "color": "blue", "value": 15 } },
            "WC": { "fullName": "Wrist Curl", "data": { "color": "", "value": 10 } },
            "WSC": { "fullName": "Wrist Side Curl", "data": { "color": "", "value": 15 } },
            "WP": { "fullName": "Wrist Pronation", "data": { "color": "", "value": 10 } },
            "WS": { "fullName": "Wrist Suplination", "data": { "color": "", "value": 1.5 } }
        }
    },
    {
        "day": "27.08.26",
        "SU": { "fullName": "Sit-Ups", "reps1": { "color": "", "value": 1 }, "rest1": { "color": "", "value": 1 }, "reps2": { "color": "", "value": 1 }, "rest2": { "color": "", "value": 1 } },
        "Sq": { "fullName": "Squats", "reps1": { "color": "", "value": 1 }, "rest1": { "color": "", "value": 1 }, "reps2": { "color": "", "value": 1 }, "rest2": { "color": "", "value": 1 } },
        "ETK": { "fullName": "Elbow To Knee", "reps1": { "color": "", "value": 1 }, "rest1": { "color": "", "value": 1 }, "reps2": { "color": "", "value": 1 }, "rest2": { "color": "", "value": 1 } },
        "SCR": { "fullName": "Standing Calf Raise", "reps1": { "color": "", "value": 1 }, "rest1": { "color": "", "value": 1 }, "reps2": { "color": "", "value": 1 }, "rest2": { "color": "", "value": 1 } },
        "BSS": { "fullName": "Bulgarian Slit Squats", "reps1": { "color": "", "value": 1 }, "rest1": { "color": "", "value": 1 }, "reps2": { "color": "", "value": 1 }, "rest2": { "color": "", "value": 1 } },
        "LR": { "fullName": "Leg Raises", "reps1": { "color": "", "value": 1 }, "rest1": { "color": "", "value": 1 }, "reps2": { "color": "", "value": 1 }, "rest2": { "color": "", "value": 1 } },
        "EP": { "fullName": "Elbow Plank", "reps1": { "color": "", "value": 1 }, "rest1": { "color": "", "value": 1 }, "reps2": { "color": "", "value": 1 }, "rest2": { "color": "", "value": 1 } },
        "weights": {
            "SU": { "fullName": "Sit-Ups", "data": { "color": "", "value": 1 } },
            "Sq": { "fullName": "Squats", "data": { "color": "", "value": 1 } },
            "ETK": { "fullName": "Elbow To Knee", "data": { "color": "", "value": 1 } },
            "SCR": { "fullName": "Standing Calf Raise", "data": { "color": "", "value": 1 } },
            "BSS": { "fullName": "Bulgarian Slit Squats", "data": { "color": "", "value": 1 } },
            "LR": { "fullName": "Leg Raises", "data": { "color": "", "value": 1 } },
            "EP": { "fullName": "Elbow Plank", "data": { "color": "", "value": 1 } }
        }
    },
    {
        "day": "28.08.26",
        "BR": { "fullName": "Barbell Row", "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
        "weights": {
            "BR": { "fullName": "Barbell Row", "data": { "color": "", "value": 1 } }
        }
    }
    */
];
export const DatabaseProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [info, setInfo] = useState(null);
    useEffect(() => {
        const initLoad = async () => {
            try {
                //await AsyncStorage.removeItem('@workout_data')
                //await AsyncStorage.removeItem('@workout_data22')
                const loadedData = await loadFromPhone();
                //console.log("workout_data : ",loadedData)
                setInfo(loadedData);
            } catch (err) {
                console.error(`Error while loading AsyncStorage item :${STORAGE_NAME}\n ${err}`)
            } finally {
                setLoading(false);
            }
        };
        initLoad();
    }, [])

    const loadFromPhone = async () => {
        try {
            let jsonValue
            //jsonValue = await AsyncStorage.getItem(STORAGE_NAME);
            return jsonValue != null ? JSON.parse(jsonValue) : initTable
        } catch (err) {
            console.error("Error while loading data");
        }
    }

    const saveDataToPhone = async (newData) => {
        try {
            const jsonValue = JSON.stringify(newData);
            await AsyncStorage.setItem(STORAGE_NAME, jsonValue);
            //console.log("Data saved!");
        } catch (err) {
            console.error("Error saving data: ", err);
        }
    }
    const uploadToDrive = async (jsonData) => {
        try {
            const docDir = FileSystem.Paths.document;
            const docDirUri = docDir.uri;

            const fileUri = docDirUri.endsWith('/')
                ? `${docDirUri}workout_data.json`
                : `${docDirUri}/workout_data.json`;

            const jsonString = JSON.stringify(jsonData, null, 2);

            const file = new FileSystem.File(fileUri);
            await file.write(jsonString);

            if (await Sharing.isAvailableAsync()) {
                await Sharing.shareAsync(fileUri, {
                    mimeType: 'application/json',
                    dialogTitle: 'Backup save'
                });
            }

        } catch (err) {
            console.error("Error: ", err);
        }
    }

    return (
        <DatabaseContext.Provider
            value={{                
                uploadToDrive,
                saveDataToPhone,
                info,
                loading
            }}
        >
            {children}
        </DatabaseContext.Provider>
    );
};

export const useDatabase = () => {
    const context = useContext(DatabaseContext);
    if (!context) {
        throw new Error('useDatabase must be used within a DatabaseProvider')
    }
    return context;
}