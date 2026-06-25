import { FlatList, Pressable, StyleSheet, View,Text, Image } from "react-native";
//import DBTable from "./database.json"
import { useCallback, useEffect, useRef, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RenderItem from "./RenderItem";
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing'
import { useTools } from "../../StyleAssistant";
import shareIcon from "../../assets/share.png"
const DBTable = [    
  {
    "day": "25.06.26",
    "PU": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "RWC": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "WC": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "WSC": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "WP": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "WS": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } }
  },
  {
    "day": "28.06.26",
    "SU": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "Sq": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "ETK": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "SCR": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "BSS": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "LR": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "EP": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } }
  },
  {
    "day": "29.06.26",
    "BR": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } }
  },
  {
    "day": "01.07.26",
    "PU": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "RWC": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "WC": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "WSC": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "WP": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "WS": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } }
  },
  {
    "day": "04.07.26",
    "SU": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "Sq": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "ETK": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "SCR": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "BSS": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "LR": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "EP": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } }
  },
  {
    "day": "05.07.26",
    "BR": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } }
  },
  {
    "day": "07.07.26",
    "PU": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "RWC": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "WC": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "WSC": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "WP": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "WS": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } }
  },
  {
    "day": "10.07.26",
    "SU": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "Sq": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "ETK": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "SCR": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "BSS": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "LR": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "EP": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } }
  },
  {
    "day": "11.07.26",
    "BR": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } }
  },
  {
    "day": "13.07.26",
    "PU": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "RWC": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "WC": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "WSC": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "WP": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "WS": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } }
  },
  {
    "day": "16.07.26",
    "SU": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "Sq": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "ETK": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "SCR": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "BSS": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "LR": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "EP": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } }
  },
  {
    "day": "17.07.26",
    "BR": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } }
  },
  {
    "day": "19.07.26",
    "PU": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "RWC": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "WC": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "WSC": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "WP": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "WS": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } }
  },
  {
    "day": "22.07.26",
    "SU": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "Sq": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "ETK": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "SCR": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "BSS": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "LR": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "EP": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } }
  },
  {
    "day": "23.07.26",
    "BR": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } }
  },
  {
    "day": "25.07.26",
    "PU": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "RWC": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "WC": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "WSC": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "WP": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "WS": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } }
  },
  {
    "day": "28.07.26",
    "SU": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "Sq": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "ETK": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "SCR": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "BSS": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "LR": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "EP": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } }
  },
  {
    "day": "29.07.26",
    "BR": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } }
  },
  {
    "day": "31.07.26",
    "PU": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "RWC": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "WC": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "WSC": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "WP": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "WS": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } }
  },
  {
    "day": "03.08.26",
    "SU": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "Sq": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "ETK": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "SCR": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "BSS": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "LR": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "EP": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } }
  },
  {
    "day": "04.08.26",
    "BR": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } }
  },
  {
    "day": "06.08.26",
    "PU": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "RWC": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "WC": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "WSC": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "WP": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "WS": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } }
  },
  {
    "day": "09.08.26",
    "SU": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "Sq": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "ETK": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "SCR": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "BSS": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "LR": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "EP": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } }
  },
  {
    "day": "10.08.26",
    "BR": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } }
  },
  {
    "day": "12.08.26",
    "PU": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "RWC": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "WC": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "WSC": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "WP": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "WS": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } }
  },
  {
    "day": "15.08.26",
    "SU": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "Sq": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "ETK": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "SCR": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "BSS": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "LR": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "EP": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } }
  },
  {
    "day": "16.08.26",
    "BR": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } }
  },
  {
    "day": "18.08.26",
    "PU": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "RWC": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "WC": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "WSC": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "WP": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "WS": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } }
  },
  {
    "day": "21.08.26",
    "SU": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "Sq": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "ETK": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "SCR": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "BSS": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "LR": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "EP": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } }
  },
  {
    "day": "22.08.26",
    "BR": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } }
  },
  {
    "day": "24.08.26",
    "PU": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "RWC": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "WC": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "WSC": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "WP": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "WS": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } }
  },
  {
    "day": "27.08.26",
    "SU": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "Sq": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "ETK": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "SCR": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "BSS": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "LR": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "EP": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } }
  },
  {
    "day": "28.08.26",
    "BR": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } }
  }
];

export default  function WorkoutTable() {
  const {backgroundColor} = useTools();

  const [data, setData] = useState(null);

  const flatListRef = useRef(null);

  useEffect(()=>{
    const initLoad = async () =>{
      await AsyncStorage.removeItem('@workout_data')
      await AsyncStorage.removeItem('@workout_data22')
      const loadedData = await loadFromPhone();
      setData(loadedData);
    };
    initLoad();
  },[])

  const saveToPhone = async (newData) => {
    try{
      const jsonValue = JSON.stringify(newData);
      //await AsyncStorage.setItem('@workout_data22',jsonValue);
      console.log("Data saved!");
    }catch(err){
      console.error("Error saving data: ",err);
    }
  }

  const loadFromPhone = async () => {
    try{
      let jsonValue
      jsonValue = await AsyncStorage.getItem('@workout_data22');
      return jsonValue != null ? JSON.parse(jsonValue) : DBTable
    }catch(err){
      console.error("Error while loading data");
    }
  }

  const uploadToDrive = async (jsonData) => {
      try{
        const docDir = FileSystem.Paths.document;
        const docDirUri = docDir.uri;

        const fileUri = docDirUri.endsWith('/')
          ? `${docDirUri}workout_data22.json`
          : `${docDirUri}/workout_data22.json`;
        
        const jsonString = JSON.stringify(jsonData,null,2);

        const file = new FileSystem.File(fileUri);
        await file.write(jsonString);

        if(await Sharing.isAvailableAsync()){
          await Sharing.shareAsync(fileUri,{
            mimeType:'application/json',
            dialogTitle:'Backup save'
          });
        }

      }catch(err){
        console.error("Error: ",err);
      } 
  }
  
  const renderItem = useCallback(({item, index }) => (
      <RenderItem 
          item={item} 
          index={index} 
          data={data} 
          setData={setData} 
          saveToPhone={saveToPhone}
          flatListRef={flatListRef}
      />
  ));

  return (
    <View style={{height:'100%',width:'100%', backgroundColor: backgroundColor}}>
      <Pressable 
        style={{
          marginTop:35,
          height:50,
          width:50,
          marginBottom:-40,
        }}
        onPressIn={()=>{
          uploadToDrive(data)
        }}
        >
        <Image source={shareIcon} style={{width:40, height:40}}resizeMode="contain"/>
      </Pressable>
      <View style={{alignItems:'center',marginBottom:100}}>
        <FlatList
          ref={flatListRef}
          keyboardShouldPersistTaps="handled"
          style={styles.conteiner}
          data={data}
          renderItem={renderItem}
          keyExtractor={(item)=> item.day}
        />
      </View>
      
      
    </View>
  );
}

const styles = StyleSheet.create({
conteiner: {
    height:"100%",
    width:'100%',
    borderWidth:0.1,
    marginTop:40,
   
},
 
});


