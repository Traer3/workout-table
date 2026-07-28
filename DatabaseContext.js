import { createContext, useContext, useEffect, useState } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing'
import { useQuery, useRealm } from "./src/db/realm";

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

    {
        /*
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
   */
    }

];
export const DatabaseProvider = ({ children }) => {
    const realm = useRealm();
    const saveDemoWorkout = () => {
        realm.write(() => {
            realm.create('WorkoutDay', {
                day: '09.07.26',
                PU: {
                    fullName: 'Push Ups',
                    reps1: { color: 'green', value: 1 },
                    rest1: { color: '', value: 1 },
                    reps2: { color: '', value: 1 },
                    rest2: { color: '', value: 1 },
                },
                RWC: {
                    fullName: 'Reverse Wrist Curl',
                    reps1: { color: 'green', value: 1 },
                    rest1: { color: '', value: 1 },
                    reps2: { color: '', value: 1 },
                    rest2: { color: '', value: 1 },
                },
                WC: {
                    fullName: 'Wrist Curl',
                    reps1: { color: 'green', value: 1 },
                    rest1: { color: '', value: 1 },
                    reps2: { color: '', value: 1 },
                    rest2: { color: '', value: 1 },
                },
                WSC: {
                    fullName: 'Wrist Side Curl',
                    reps1: { color: 'green', value: 1 },
                    rest1: { color: '', value: 1 },
                    reps2: { color: '', value: 1 },
                    rest2: { color: '', value: 1 },
                },
                WP: {
                    fullName: 'Wrist Pronation',
                    reps1: { color: 'green', value: 1 },
                    rest1: { color: '', value: 1 },
                    reps2: { color: '', value: 1 },
                    rest2: { color: '', value: 1 },
                },
                WS: {
                    fullName: 'Wrist Suplination',
                    reps1: { color: 'green', value: 1 },
                    rest1: { color: '', value: 1 },
                    reps2: { color: '', value: 1 },
                    rest2: { color: '', value: 1 },
                },
            }, 'modified');
            

            realm.create('WorkoutDay', {
                day: '29.06.26',
                BR: { fullName: 'Barbell Row', reps1: { color: '', value: 1 }, rest1: { color: '', value: 1 }, reps2: { color: '', value: 1 }, rest2: { color: '', value: 1 } },
            }, 'modified');


            realm.create('WorkoutDay', {
                day: '01.07.26',
                PU: { fullName: 'Push Ups', reps1: { color: '', value: 1 }, rest1: { color: '', value: 0 }, reps2: { color: '', value: 0 }, rest2: { color: '', value: 0 } },
                RWC: { fullName: 'Reverse Wrist Curl', reps1: { color: '', value: 1 }, rest1: { color: '', value: 1 }, reps2: { color: '', value: 1 }, rest2: { color: '', value: 1 } },
                WC: { fullName: 'Wrist Curl', reps1: { color: '', value: 1 }, rest1: { color: '', value: 1 }, reps2: { color: '', value: 1 }, rest2: { color: '', value: 1 } },
                WSC: { fullName: 'Wrist Side Curl', reps1: { color: '', value: 1 }, rest1: { color: '', value: 1 }, reps2: { color: '', value: 1 }, rest2: { color: '', value: 1 } },
                WP: { fullName: 'Wrist Pronation', reps1: { color: '', value: 1 }, rest1: { color: '', value: 1 }, reps2: { color: '', value: 1 }, rest2: { color: '', value: 1 } },
                WS: { fullName: 'Wrist Suplination', reps1: { color: '', value: 1 }, rest1: { color: '', value: 1 }, reps2: { color: '', value: 1 }, rest2: { color: '', value: 1 } },
            }, 'modified');
            realm.create('WorkoutDay', {
                day: '10.07.26',
                PU: { fullName: 'Push Ups', reps1: { color: 'green', value: 1 }, rest1: { color: '', value: 1 }, reps2: { color: '', value: 1 }, rest2: { color: '', value: 1 } },
                RWC: { fullName: 'Reverse Wrist Curl', reps1: { color: 'green', value: 1 }, rest1: { color: '', value: 1 }, reps2: { color: '', value: 1 }, rest2: { color: '', value: 1 } },
                WC: { fullName: 'Wrist Curl', reps1: { color: 'green', value: 1 }, rest1: { color: '', value: 1 }, reps2: { color: '', value: 1 }, rest2: { color: '', value: 1 } },
                WSC: { fullName: 'Wrist Side Curl', reps1: { color: 'green', value: 1 }, rest1: { color: '', value: 1 }, reps2: { color: '', value: 1 }, rest2: { color: '', value: 1 } },
                WP: { fullName: 'Wrist Pronation', reps1: { color: 'green', value: 1 }, rest1: { color: '', value: 1 }, reps2: { color: '', value: 1 }, rest2: { color: '', value: 1 } },
                WS: { fullName: 'Wrist Suplination', reps1: { color: 'green', value: 1 }, rest1: { color: '', value: 1 }, reps2: { color: '', value: 1 }, rest2: { color: '', value: 1 } },
            }, 'modified');
            
            realm.create('ExerciseWeightHistory', {
                id: 0 ,
                day: '19.03.26',
                timestamp: Math.floor(Date.now() / 1000),
                fullName: 'Wrist Pronation',
                weightData: {
                    color: "green", 
                    value: 7.5 
                }
                
            }, 'modified');

            realm.create('ExerciseWeightHistory', {
                id: 1 ,
                day: '10.05.26',
                timestamp: Math.floor(Date.now() / 1000),
                fullName: 'Wrist Pronation',
                weightData: {
                    color: "green", 
                    value: 10 
                }
                
            }, 'modified');

            realm.create('ExerciseWeightHistory', {
                id: 2 ,
                day: '08.06.26',
                timestamp: Math.floor(Date.now() / 1000),
                fullName: 'Reverse Wrist Curl',
                weightData: {
                    color: "green", 
                    value: 35 
                }
                
            }, 'modified');
            
            

                /*
                const deletee = realm.objectForPrimaryKey('ExerciseWeightHistory', 0)
                realm.delete(deletee);
                */
        });
        console.log("Data successfully saved! ");
    };


    const [loading, setLoading] = useState(true);
    
    const workoutTable = useQuery('WorkoutDay')
    const weightHistory = useQuery('ExerciseWeightHistory')
    
    useEffect(()=>{
        //saveDemoWorkout()
    },[])

    const uploadToDrive = async (jsonData) => {
        console.log("uploadToDrive WORKED!")
        /*
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
            */
    }

    function getFormattedDate() {
        return new Date().toLocaleDateString('ru-RU',{
            day:'2-digit',
            month:'2-digit',
            year:'2-digit'
        });
    }

    function checkHours(hours, lastCheck) {
        if(!lastCheck){
            console.log("checkHours need lastCheck: ",lastCheck)
            return null;
        };
        
        const lastCheckData = typeof lastCheck === 'number'
            ? new Date(lastCheck * 1000)
            : new Date(lastCheck);

        const now = new Date();
        const diffMs = now.getTime() - lastCheckData.getTime();
        const diffHours = diffMs / (1000 * 60 * 60);

        if(diffHours >= hours){
            //console.log(`🕘 More than ${hours} hours have passed,  it's time to check  `);
            return true
        }else{
            //console.log(`It's still early! It's only been ${diffHours.toFixed(1)} hours.`);
            return false
        }
    }
    

    return (
        <DatabaseContext.Provider
            value={{
                uploadToDrive,
                workoutTable,
                weightHistory,
                loading,
                setLoading,
                getFormattedDate,
                checkHours
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