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
    "day": "09.04.26",
    "RWC": {
      "reps1": {
        "color": "green",
        "value": "35"
      },
      "rest1": {
        "color": "",
        "value": "5"
      },
      "reps2": {
        "color": "",
        "value": "35"
      },
      "rest2": {
        "color": "",
        "value": "5"
      }
    },
    "WC": {
      "reps1": {
        "color": "green",
        "value": "35"
      },
      "rest1": {
        "color": "",
        "value": "5"
      },
      "reps2": {
        "color": "",
        "value": "35"
      },
      "rest2": {
        "color": "",
        "value": "6"
      }
    },
    "WSC": {
      "reps1": {
        "color": "green",
        "value": "34"
      },
      "rest1": {
        "color": "",
        "value": "8"
      },
      "reps2": {
        "color": "",
        "value": "34"
      },
      "rest2": {
        "color": "",
        "value": "5"
      }
    },
    "WP": {
      "reps1": {
        "color": "green",
        "value": "65"
      },
      "rest1": {
        "color": "",
        "value": "5"
      },
      "reps2": {
        "color": "#EBF8E7",
        "value": "65"
      },
      "rest2": {
        "color": "",
        "value": ""
      }
    }
  },
  {
    "day": "10.04.26",
    "SU": {
      "reps1": {
        "color": "green",
        "value": "40"
      },
      "rest1": {
        "color": "",
        "value": "5"
      },
      "reps2": {
        "color": "",
        "value": "40"
      },
      "rest2": {
        "color": "",
        "value": "5"
      }
    },
    "Sq": {
      "reps1": {
        "color": "green",
        "value": "50"
      },
      "rest1": {
        "color": "",
        "value": "5"
      },
      "reps2": {
        "color": "",
        "value": "50"
      },
      "rest2": {
        "color": "",
        "value": "9"
      }
    },
    "ETK": {
      "reps1": {
        "color": "green",
        "value": "57"
      },
      "rest1": {
        "color": "",
        "value": "10"
      },
      "reps2": {
        "color": "",
        "value": "57"
      },
      "rest2": {
        "color": "",
        "value": "5"
      }
    },
    "SCR": {
      "reps1": {
        "color": "",
        "value": "80"
      },
      "rest1": {
        "color": "",
        "value": "5"
      },
      "reps2": {
        "color": "",
        "value": "80"
      },
      "rest2": {
        "color": "",
        "value": ""
      }
    }
  },
  {
    "day": "15.04.26",
    "RWC": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "WC": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "WSC": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "WP": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "PU": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } }
  },
  {
    "day": "16.04.26",
    "SU": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "Sq": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "ETK": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "SCR": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "BSS": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "LR": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } }
  },
  {
    "day": "18.04.26",
    "RWC": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "WC": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "WSC": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "WP": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "PU": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } }
  },
  {
    "day": "19.04.26",
    "SU": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "Sq": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "ETK": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "SCR": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "BSS": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "LR": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } }
  },
  {
    "day": "21.04.26",
    "RWC": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "WC": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "WSC": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "WP": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "PU": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } }
  },
  {
    "day": "22.04.26",
    "SU": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "Sq": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "ETK": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "SCR": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "BSS": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "LR": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } }
  },
  {
    "day": "24.04.26",
    "RWC": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "WC": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "WSC": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "WP": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "PU": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } }
  },
  {
    "day": "25.04.26",
    "SU": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "Sq": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "ETK": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "SCR": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "BSS": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "LR": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } }
  },
  {
    "day": "27.04.26",
    "RWC": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "WC": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "WSC": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "WP": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "PU": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } }
  },
  {
    "day": "28.04.26",
    "SU": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "Sq": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "ETK": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "SCR": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "BSS": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "LR": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } }
  },
  {
    "day": "30.04.26",
    "RWC": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "WC": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "WSC": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "WP": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "PU": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } }
  },
  {
    "day": "01.05.26",
    "SU": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "Sq": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "ETK": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "SCR": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "BSS": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "LR": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } }
  },
  {
    "day": "03.05.26",
    "RWC": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "WC": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "WSC": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "WP": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "PU": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } }
  },
  {
    "day": "04.05.26",
    "SU": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "Sq": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "ETK": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "SCR": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "BSS": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "LR": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } }
  },
  {
    "day": "06.05.26",
    "RWC": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "WC": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "WSC": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "WP": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "PU": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } }
  },
  {
    "day": "07.05.26",
    "SU": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "Sq": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "ETK": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "SCR": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "BSS": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "LR": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } }
  },
  {
    "day": "09.05.26",
    "RWC": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "WC": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "WSC": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "WP": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "PU": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } }
  },
  {
    "day": "10.05.26",
    "SU": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "Sq": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "ETK": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "SCR": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "BSS": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "LR": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } }
  },
  {
    "day": "12.05.26",
    "RWC": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "WC": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "WSC": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "WP": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "PU": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } }
  },
  {
    "day": "13.05.26",
    "SU": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "Sq": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "ETK": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "SCR": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "BSS": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "LR": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } }
  },
  {
    "day": "15.05.26",
    "RWC": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "WC": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "WSC": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "WP": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "PU": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } }
  },
  {
    "day": "16.05.26",
    "SU": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "Sq": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "ETK": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "SCR": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "BSS": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "LR": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } }
  },
  {
    "day": "18.05.26",
    "RWC": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "WC": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "WSC": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "WP": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "PU": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } }
  },
  {
    "day": "19.05.26",
    "SU": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "Sq": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "ETK": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "SCR": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "BSS": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "LR": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } }
  },
  {
    "day": "21.05.26",
    "RWC": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "WC": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "WSC": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "WP": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "PU": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } }
  },
  {
    "day": "22.05.26",
    "SU": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "Sq": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "ETK": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "SCR": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "BSS": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "LR": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } }
  },
  {
    "day": "24.05.26",
    "RWC": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "WC": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "WSC": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "WP": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "PU": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } }
  },
  {
    "day": "25.05.26",
    "SU": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "Sq": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "ETK": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "SCR": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "BSS": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "LR": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } }
  },
  {
    "day": "27.05.26",
    "RWC": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "WC": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "WSC": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "WP": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "PU": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } }
  },
  {
    "day": "28.05.26",
    "SU": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "Sq": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "ETK": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "SCR": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "BSS": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "LR": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } }
  },
  {
    "day": "30.05.26",
    "RWC": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "WC": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "WSC": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "WP": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "PU": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } }
  },
  {
    "day": "31.05.26",
    "SU": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "Sq": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "ETK": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "SCR": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "BSS": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } },
    "LR": { "reps1": { "color": "", "value": 0 }, "rest1": { "color": "", "value": 0 }, "reps2": { "color": "", "value": 0 }, "rest2": { "color": "", "value": 0 } }
  }
]

export default  function WorkoutTable() {
  const {backgroundColor} = useTools();

  const [data, setData] = useState(null);

  const flatListRef = useRef(null);

  useEffect(()=>{
    const initLoad = async () =>{
      const loadedData = await loadFromPhone();
      setData(loadedData);
    };
    initLoad();
  },[])

  const saveToPhone = async (newData) => {
    try{
      const jsonValue = JSON.stringify(newData);
      await AsyncStorage.setItem('@workout_data22',jsonValue);
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


