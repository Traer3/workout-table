import { FlatList, Pressable, StyleSheet, View,Text, Image } from "react-native";
//import DBTable from "./database.json"
import { useCallback, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RenderItem from "./RenderItem";
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing'
import { useTools } from "../../StyleAssistant";
import shareIcon from "../../assets/share.png"
const DBTable = [
  {
    "day": "26.02.26",
    "RWC": {
      "reps1": { "color": "", "value": 0 },
      "rest1": { "color": "", "value": 0 },
      "reps2": { "color": "", "value": 0 },
      "rest2": { "color": "", "value": 0 }
    },
    "WC": {
      "reps1": { "color": "", "value": 0 },
      "rest1": { "color": "", "value": 0 },
      "reps2": { "color": "", "value": 0 },
      "rest2": { "color": "", "value": 0 }
    },
    "WSC": {
      "reps1": { "color": "", "value": 0 },
      "rest1": { "color": "", "value": 0 },
      "reps2": { "color": "", "value": 0 },
      "rest2": { "color": "", "value": 0 }
    },
    "WP": {
      "reps1": { "color": "", "value": 0 },
      "rest1": { "color": "", "value": 0 },
      "reps2": { "color": "", "value": 0 },
      "rest2": { "color": "", "value": 0 }
    }
  },
  {
    "day": "27.02.26",
    "SU": {
      "reps1": { "color": "", "value": 0 },
      "rest1": { "color": "", "value": 0 },
      "reps2": { "color": "", "value": 0 },
      "rest2": { "color": "", "value": 0 }
    },
    "Sq": {
      "reps1": { "color": "", "value": 0 },
      "rest1": { "color": "", "value": 0 },
      "reps2": { "color": "", "value": 0 },
      "rest2": { "color": "", "value": 0 }
    },
    "ETK": {
      "reps1": { "color": "", "value": 0 },
      "rest1": { "color": "", "value": 0 },
      "reps2": { "color": "", "value": 0 },
      "rest2": { "color": "", "value": 0 }
    },
    "SCR": {
      "reps1": { "color": "", "value": 0 },
      "rest1": { "color": "", "value": 0 },
      "reps2": { "color": "", "value": 0 },
      "rest2": { "color": "", "value": 0 }
    }
  },
  {
    "day": "01.03.26",
    "RWC": {
      "reps1": { "color": "", "value": 0 },
      "rest1": { "color": "", "value": 0 },
      "reps2": { "color": "", "value": 0 },
      "rest2": { "color": "", "value": 0 }
    },
    "WC": {
      "reps1": { "color": "", "value": 0 },
      "rest1": { "color": "", "value": 0 },
      "reps2": { "color": "", "value": 0 },
      "rest2": { "color": "", "value": 0 }
    },
    "WSC": {
      "reps1": { "color": "", "value": 0 },
      "rest1": { "color": "", "value": 0 },
      "reps2": { "color": "", "value": 0 },
      "rest2": { "color": "", "value": 0 }
    },
    "WP": {
      "reps1": { "color": "", "value": 0 },
      "rest1": { "color": "", "value": 0 },
      "reps2": { "color": "", "value": 0 },
      "rest2": { "color": "", "value": 0 }
    }
  },
  {
    "day": "02.03.26",
    "SU": {
      "reps1": { "color": "", "value": 0 },
      "rest1": { "color": "", "value": 0 },
      "reps2": { "color": "", "value": 0 },
      "rest2": { "color": "", "value": 0 }
    },
    "Sq": {
      "reps1": { "color": "", "value": 0 },
      "rest1": { "color": "", "value": 0 },
      "reps2": { "color": "", "value": 0 },
      "rest2": { "color": "", "value": 0 }
    },
    "ETK": {
      "reps1": { "color": "", "value": 0 },
      "rest1": { "color": "", "value": 0 },
      "reps2": { "color": "", "value": 0 },
      "rest2": { "color": "", "value": 0 }
    },
    "SCR": {
      "reps1": { "color": "", "value": 0 },
      "rest1": { "color": "", "value": 0 },
      "reps2": { "color": "", "value": 0 },
      "rest2": { "color": "", "value": 0 }
    }
  },
  {
    "day": "04.03.26",
    "RWC": {
      "reps1": { "color": "", "value": 0 },
      "rest1": { "color": "", "value": 0 },
      "reps2": { "color": "", "value": 0 },
      "rest2": { "color": "", "value": 0 }
    },
    "WC": {
      "reps1": { "color": "", "value": 0 },
      "rest1": { "color": "", "value": 0 },
      "reps2": { "color": "", "value": 0 },
      "rest2": { "color": "", "value": 0 }
    },
    "WSC": {
      "reps1": { "color": "", "value": 0 },
      "rest1": { "color": "", "value": 0 },
      "reps2": { "color": "", "value": 0 },
      "rest2": { "color": "", "value": 0 }
    },
    "WP": {
      "reps1": { "color": "", "value": 0 },
      "rest1": { "color": "", "value": 0 },
      "reps2": { "color": "", "value": 0 },
      "rest2": { "color": "", "value": 0 }
    }
  },
  {
    "day": "05.03.26",
    "SU": {
      "reps1": { "color": "", "value": 0 },
      "rest1": { "color": "", "value": 0 },
      "reps2": { "color": "", "value": 0 },
      "rest2": { "color": "", "value": 0 }
    },
    "Sq": {
      "reps1": { "color": "", "value": 0 },
      "rest1": { "color": "", "value": 0 },
      "reps2": { "color": "", "value": 0 },
      "rest2": { "color": "", "value": 0 }
    },
    "ETK": {
      "reps1": { "color": "", "value": 0 },
      "rest1": { "color": "", "value": 0 },
      "reps2": { "color": "", "value": 0 },
      "rest2": { "color": "", "value": 0 }
    },
    "SCR": {
      "reps1": { "color": "", "value": 0 },
      "rest1": { "color": "", "value": 0 },
      "reps2": { "color": "", "value": 0 },
      "rest2": { "color": "", "value": 0 }
    }
  },
  {
    "day": "07.03.26",
    "RWC": {
      "reps1": { "color": "", "value": 0 },
      "rest1": { "color": "", "value": 0 },
      "reps2": { "color": "", "value": 0 },
      "rest2": { "color": "", "value": 0 }
    },
    "WC": {
      "reps1": { "color": "", "value": 0 },
      "rest1": { "color": "", "value": 0 },
      "reps2": { "color": "", "value": 0 },
      "rest2": { "color": "", "value": 0 }
    },
    "WSC": {
      "reps1": { "color": "", "value": 0 },
      "rest1": { "color": "", "value": 0 },
      "reps2": { "color": "", "value": 0 },
      "rest2": { "color": "", "value": 0 }
    },
    "WP": {
      "reps1": { "color": "", "value": 0 },
      "rest1": { "color": "", "value": 0 },
      "reps2": { "color": "", "value": 0 },
      "rest2": { "color": "", "value": 0 }
    }
  },
  {
    "day": "08.03.26",
    "SU": {
      "reps1": { "color": "", "value": 0 },
      "rest1": { "color": "", "value": 0 },
      "reps2": { "color": "", "value": 0 },
      "rest2": { "color": "", "value": 0 }
    },
    "Sq": {
      "reps1": { "color": "", "value": 0 },
      "rest1": { "color": "", "value": 0 },
      "reps2": { "color": "", "value": 0 },
      "rest2": { "color": "", "value": 0 }
    },
    "ETK": {
      "reps1": { "color": "", "value": 0 },
      "rest1": { "color": "", "value": 0 },
      "reps2": { "color": "", "value": 0 },
      "rest2": { "color": "", "value": 0 }
    },
    "SCR": {
      "reps1": { "color": "", "value": 0 },
      "rest1": { "color": "", "value": 0 },
      "reps2": { "color": "", "value": 0 },
      "rest2": { "color": "", "value": 0 }
    }
  },
  {
    "day": "10.03.26",
    "RWC": {
      "reps1": { "color": "", "value": 0 },
      "rest1": { "color": "", "value": 0 },
      "reps2": { "color": "", "value": 0 },
      "rest2": { "color": "", "value": 0 }
    },
    "WC": {
      "reps1": { "color": "", "value": 0 },
      "rest1": { "color": "", "value": 0 },
      "reps2": { "color": "", "value": 0 },
      "rest2": { "color": "", "value": 0 }
    },
    "WSC": {
      "reps1": { "color": "", "value": 0 },
      "rest1": { "color": "", "value": 0 },
      "reps2": { "color": "", "value": 0 },
      "rest2": { "color": "", "value": 0 }
    },
    "WP": {
      "reps1": { "color": "", "value": 0 },
      "rest1": { "color": "", "value": 0 },
      "reps2": { "color": "", "value": 0 },
      "rest2": { "color": "", "value": 0 }
    }
  },
  {
    "day": "11.03.26",
    "SU": {
      "reps1": { "color": "", "value": 0 },
      "rest1": { "color": "", "value": 0 },
      "reps2": { "color": "", "value": 0 },
      "rest2": { "color": "", "value": 0 }
    },
    "Sq": {
      "reps1": { "color": "", "value": 0 },
      "rest1": { "color": "", "value": 0 },
      "reps2": { "color": "", "value": 0 },
      "rest2": { "color": "", "value": 0 }
    },
    "ETK": {
      "reps1": { "color": "", "value": 0 },
      "rest1": { "color": "", "value": 0 },
      "reps2": { "color": "", "value": 0 },
      "rest2": { "color": "", "value": 0 }
    },
    "SCR": {
      "reps1": { "color": "", "value": 0 },
      "rest1": { "color": "", "value": 0 },
      "reps2": { "color": "", "value": 0 },
      "rest2": { "color": "", "value": 0 }
    }
  },
  {
    "day": "13.03.26",
    "RWC": {
      "reps1": { "color": "", "value": 0 },
      "rest1": { "color": "", "value": 0 },
      "reps2": { "color": "", "value": 0 },
      "rest2": { "color": "", "value": 0 }
    },
    "WC": {
      "reps1": { "color": "", "value": 0 },
      "rest1": { "color": "", "value": 0 },
      "reps2": { "color": "", "value": 0 },
      "rest2": { "color": "", "value": 0 }
    },
    "WSC": {
      "reps1": { "color": "", "value": 0 },
      "rest1": { "color": "", "value": 0 },
      "reps2": { "color": "", "value": 0 },
      "rest2": { "color": "", "value": 0 }
    },
    "WP": {
      "reps1": { "color": "", "value": 0 },
      "rest1": { "color": "", "value": 0 },
      "reps2": { "color": "", "value": 0 },
      "rest2": { "color": "", "value": 0 }
    }
  },
  {
    "day": "14.03.26",
    "SU": {
      "reps1": { "color": "", "value": 0 },
      "rest1": { "color": "", "value": 0 },
      "reps2": { "color": "", "value": 0 },
      "rest2": { "color": "", "value": 0 }
    },
    "Sq": {
      "reps1": { "color": "", "value": 0 },
      "rest1": { "color": "", "value": 0 },
      "reps2": { "color": "", "value": 0 },
      "rest2": { "color": "", "value": 0 }
    },
    "ETK": {
      "reps1": { "color": "", "value": 0 },
      "rest1": { "color": "", "value": 0 },
      "reps2": { "color": "", "value": 0 },
      "rest2": { "color": "", "value": 0 }
    },
    "SCR": {
      "reps1": { "color": "", "value": 0 },
      "rest1": { "color": "", "value": 0 },
      "reps2": { "color": "", "value": 0 },
      "rest2": { "color": "", "value": 0 }
    }
  },
  {
    "day": "16.03.26",
    "RWC": {
      "reps1": { "color": "", "value": 0 },
      "rest1": { "color": "", "value": 0 },
      "reps2": { "color": "", "value": 0 },
      "rest2": { "color": "", "value": 0 }
    },
    "WC": {
      "reps1": { "color": "", "value": 0 },
      "rest1": { "color": "", "value": 0 },
      "reps2": { "color": "", "value": 0 },
      "rest2": { "color": "", "value": 0 }
    },
    "WSC": {
      "reps1": { "color": "", "value": 0 },
      "rest1": { "color": "", "value": 0 },
      "reps2": { "color": "", "value": 0 },
      "rest2": { "color": "", "value": 0 }
    },
    "WP": {
      "reps1": { "color": "", "value": 0 },
      "rest1": { "color": "", "value": 0 },
      "reps2": { "color": "", "value": 0 },
      "rest2": { "color": "", "value": 0 }
    }
  },
  {
    "day": "17.03.26",
    "SU": {
      "reps1": { "color": "", "value": 0 },
      "rest1": { "color": "", "value": 0 },
      "reps2": { "color": "", "value": 0 },
      "rest2": { "color": "", "value": 0 }
    },
    "Sq": {
      "reps1": { "color": "", "value": 0 },
      "rest1": { "color": "", "value": 0 },
      "reps2": { "color": "", "value": 0 },
      "rest2": { "color": "", "value": 0 }
    },
    "ETK": {
      "reps1": { "color": "", "value": 0 },
      "rest1": { "color": "", "value": 0 },
      "reps2": { "color": "", "value": 0 },
      "rest2": { "color": "", "value": 0 }
    },
    "SCR": {
      "reps1": { "color": "", "value": 0 },
      "rest1": { "color": "", "value": 0 },
      "reps2": { "color": "", "value": 0 },
      "rest2": { "color": "", "value": 0 }
    }
  },
  {
    "day": "19.03.26",
    "RWC": {
      "reps1": { "color": "", "value": 0 },
      "rest1": { "color": "", "value": 0 },
      "reps2": { "color": "", "value": 0 },
      "rest2": { "color": "", "value": 0 }
    },
    "WC": {
      "reps1": { "color": "", "value": 0 },
      "rest1": { "color": "", "value": 0 },
      "reps2": { "color": "", "value": 0 },
      "rest2": { "color": "", "value": 0 }
    },
    "WSC": {
      "reps1": { "color": "", "value": 0 },
      "rest1": { "color": "", "value": 0 },
      "reps2": { "color": "", "value": 0 },
      "rest2": { "color": "", "value": 0 }
    },
    "WP": {
      "reps1": { "color": "", "value": 0 },
      "rest1": { "color": "", "value": 0 },
      "reps2": { "color": "", "value": 0 },
      "rest2": { "color": "", "value": 0 }
    }
  },
  {
    "day": "20.03.26",
    "SU": {
      "reps1": { "color": "", "value": 0 },
      "rest1": { "color": "", "value": 0 },
      "reps2": { "color": "", "value": 0 },
      "rest2": { "color": "", "value": 0 }
    },
    "Sq": {
      "reps1": { "color": "", "value": 0 },
      "rest1": { "color": "", "value": 0 },
      "reps2": { "color": "", "value": 0 },
      "rest2": { "color": "", "value": 0 }
    },
    "ETK": {
      "reps1": { "color": "", "value": 0 },
      "rest1": { "color": "", "value": 0 },
      "reps2": { "color": "", "value": 0 },
      "rest2": { "color": "", "value": 0 }
    },
    "SCR": {
      "reps1": { "color": "", "value": 0 },
      "rest1": { "color": "", "value": 0 },
      "reps2": { "color": "", "value": 0 },
      "rest2": { "color": "", "value": 0 }
    }
  },
  {
    "day": "22.03.26",
    "RWC": {
      "reps1": { "color": "", "value": 0 },
      "rest1": { "color": "", "value": 0 },
      "reps2": { "color": "", "value": 0 },
      "rest2": { "color": "", "value": 0 }
    },
    "WC": {
      "reps1": { "color": "", "value": 0 },
      "rest1": { "color": "", "value": 0 },
      "reps2": { "color": "", "value": 0 },
      "rest2": { "color": "", "value": 0 }
    },
    "WSC": {
      "reps1": { "color": "", "value": 0 },
      "rest1": { "color": "", "value": 0 },
      "reps2": { "color": "", "value": 0 },
      "rest2": { "color": "", "value": 0 }
    },
    "WP": {
      "reps1": { "color": "", "value": 0 },
      "rest1": { "color": "", "value": 0 },
      "reps2": { "color": "", "value": 0 },
      "rest2": { "color": "", "value": 0 }
    }
  },
  {
    "day": "23.03.26",
    "SU": {
      "reps1": { "color": "", "value": 0 },
      "rest1": { "color": "", "value": 0 },
      "reps2": { "color": "", "value": 0 },
      "rest2": { "color": "", "value": 0 }
    },
    "Sq": {
      "reps1": { "color": "", "value": 0 },
      "rest1": { "color": "", "value": 0 },
      "reps2": { "color": "", "value": 0 },
      "rest2": { "color": "", "value": 0 }
    },
    "ETK": {
      "reps1": { "color": "", "value": 0 },
      "rest1": { "color": "", "value": 0 },
      "reps2": { "color": "", "value": 0 },
      "rest2": { "color": "", "value": 0 }
    },
    "SCR": {
      "reps1": { "color": "", "value": 0 },
      "rest1": { "color": "", "value": 0 },
      "reps2": { "color": "", "value": 0 },
      "rest2": { "color": "", "value": 0 }
    }
  },
  {
    "day": "25.03.26",
    "RWC": {
      "reps1": { "color": "", "value": 0 },
      "rest1": { "color": "", "value": 0 },
      "reps2": { "color": "", "value": 0 },
      "rest2": { "color": "", "value": 0 }
    },
    "WC": {
      "reps1": { "color": "", "value": 0 },
      "rest1": { "color": "", "value": 0 },
      "reps2": { "color": "", "value": 0 },
      "rest2": { "color": "", "value": 0 }
    },
    "WSC": {
      "reps1": { "color": "", "value": 0 },
      "rest1": { "color": "", "value": 0 },
      "reps2": { "color": "", "value": 0 },
      "rest2": { "color": "", "value": 0 }
    },
    "WP": {
      "reps1": { "color": "", "value": 0 },
      "rest1": { "color": "", "value": 0 },
      "reps2": { "color": "", "value": 0 },
      "rest2": { "color": "", "value": 0 }
    }
  },
  {
    "day": "26.03.26",
    "SU": {
      "reps1": { "color": "", "value": 0 },
      "rest1": { "color": "", "value": 0 },
      "reps2": { "color": "", "value": 0 },
      "rest2": { "color": "", "value": 0 }
    },
    "Sq": {
      "reps1": { "color": "", "value": 0 },
      "rest1": { "color": "", "value": 0 },
      "reps2": { "color": "", "value": 0 },
      "rest2": { "color": "", "value": 0 }
    },
    "ETK": {
      "reps1": { "color": "", "value": 0 },
      "rest1": { "color": "", "value": 0 },
      "reps2": { "color": "", "value": 0 },
      "rest2": { "color": "", "value": 0 }
    },
    "SCR": {
      "reps1": { "color": "", "value": 0 },
      "rest1": { "color": "", "value": 0 },
      "reps2": { "color": "", "value": 0 },
      "rest2": { "color": "", "value": 0 }
    }
  },
  {
    "day": "28.03.26",
    "RWC": {
      "reps1": { "color": "", "value": 0 },
      "rest1": { "color": "", "value": 0 },
      "reps2": { "color": "", "value": 0 },
      "rest2": { "color": "", "value": 0 }
    },
    "WC": {
      "reps1": { "color": "", "value": 0 },
      "rest1": { "color": "", "value": 0 },
      "reps2": { "color": "", "value": 0 },
      "rest2": { "color": "", "value": 0 }
    },
    "WSC": {
      "reps1": { "color": "", "value": 0 },
      "rest1": { "color": "", "value": 0 },
      "reps2": { "color": "", "value": 0 },
      "rest2": { "color": "", "value": 0 }
    },
    "WP": {
      "reps1": { "color": "", "value": 0 },
      "rest1": { "color": "", "value": 0 },
      "reps2": { "color": "", "value": 0 },
      "rest2": { "color": "", "value": 0 }
    }
  },
  {
    "day": "29.03.26",
    "SU": {
      "reps1": { "color": "", "value": 0 },
      "rest1": { "color": "", "value": 0 },
      "reps2": { "color": "", "value": 0 },
      "rest2": { "color": "", "value": 0 }
    },
    "Sq": {
      "reps1": { "color": "", "value": 0 },
      "rest1": { "color": "", "value": 0 },
      "reps2": { "color": "", "value": 0 },
      "rest2": { "color": "", "value": 0 }
    },
    "ETK": {
      "reps1": { "color": "", "value": 0 },
      "rest1": { "color": "", "value": 0 },
      "reps2": { "color": "", "value": 0 },
      "rest2": { "color": "", "value": 0 }
    },
    "SCR": {
      "reps1": { "color": "", "value": 0 },
      "rest1": { "color": "", "value": 0 },
      "reps2": { "color": "", "value": 0 },
      "rest2": { "color": "", "value": 0 }
    }
  },
  {
    "day": "31.03.26",
    "RWC": {
      "reps1": { "color": "", "value": 0 },
      "rest1": { "color": "", "value": 0 },
      "reps2": { "color": "", "value": 0 },
      "rest2": { "color": "", "value": 0 }
    },
    "WC": {
      "reps1": { "color": "", "value": 0 },
      "rest1": { "color": "", "value": 0 },
      "reps2": { "color": "", "value": 0 },
      "rest2": { "color": "", "value": 0 }
    },
    "WSC": {
      "reps1": { "color": "", "value": 0 },
      "rest1": { "color": "", "value": 0 },
      "reps2": { "color": "", "value": 0 },
      "rest2": { "color": "", "value": 0 }
    },
    "WP": {
      "reps1": { "color": "", "value": 0 },
      "rest1": { "color": "", "value": 0 },
      "reps2": { "color": "", "value": 0 },
      "rest2": { "color": "", "value": 0 }
    }
  },
  {
    "day": "01.04.26",
    "SU": {
      "reps1": { "color": "", "value": 0 },
      "rest1": { "color": "", "value": 0 },
      "reps2": { "color": "", "value": 0 },
      "rest2": { "color": "", "value": 0 }
    },
    "Sq": {
      "reps1": { "color": "", "value": 0 },
      "rest1": { "color": "", "value": 0 },
      "reps2": { "color": "", "value": 0 },
      "rest2": { "color": "", "value": 0 }
    },
    "ETK": {
      "reps1": { "color": "", "value": 0 },
      "rest1": { "color": "", "value": 0 },
      "reps2": { "color": "", "value": 0 },
      "rest2": { "color": "", "value": 0 }
    },
    "SCR": {
      "reps1": { "color": "", "value": 0 },
      "rest1": { "color": "", "value": 0 },
      "reps2": { "color": "", "value": 0 },
      "rest2": { "color": "", "value": 0 }
    }
  },
  {
    "day": "03.04.26",
    "RWC": {
      "reps1": { "color": "", "value": 0 },
      "rest1": { "color": "", "value": 0 },
      "reps2": { "color": "", "value": 0 },
      "rest2": { "color": "", "value": 0 }
    },
    "WC": {
      "reps1": { "color": "", "value": 0 },
      "rest1": { "color": "", "value": 0 },
      "reps2": { "color": "", "value": 0 },
      "rest2": { "color": "", "value": 0 }
    },
    "WSC": {
      "reps1": { "color": "", "value": 0 },
      "rest1": { "color": "", "value": 0 },
      "reps2": { "color": "", "value": 0 },
      "rest2": { "color": "", "value": 0 }
    },
    "WP": {
      "reps1": { "color": "", "value": 0 },
      "rest1": { "color": "", "value": 0 },
      "reps2": { "color": "", "value": 0 },
      "rest2": { "color": "", "value": 0 }
    }
  },
  {
    "day": "04.04.26",
    "SU": {
      "reps1": { "color": "", "value": 0 },
      "rest1": { "color": "", "value": 0 },
      "reps2": { "color": "", "value": 0 },
      "rest2": { "color": "", "value": 0 }
    },
    "Sq": {
      "reps1": { "color": "", "value": 0 },
      "rest1": { "color": "", "value": 0 },
      "reps2": { "color": "", "value": 0 },
      "rest2": { "color": "", "value": 0 }
    },
    "ETK": {
      "reps1": { "color": "", "value": 0 },
      "rest1": { "color": "", "value": 0 },
      "reps2": { "color": "", "value": 0 },
      "rest2": { "color": "", "value": 0 }
    },
    "SCR": {
      "reps1": { "color": "", "value": 0 },
      "rest1": { "color": "", "value": 0 },
      "reps2": { "color": "", "value": 0 },
      "rest2": { "color": "", "value": 0 }
    }
  },
  {
    "day": "06.04.26",
    "RWC": {
      "reps1": { "color": "", "value": 0 },
      "rest1": { "color": "", "value": 0 },
      "reps2": { "color": "", "value": 0 },
      "rest2": { "color": "", "value": 0 }
    },
    "WC": {
      "reps1": { "color": "", "value": 0 },
      "rest1": { "color": "", "value": 0 },
      "reps2": { "color": "", "value": 0 },
      "rest2": { "color": "", "value": 0 }
    },
    "WSC": {
      "reps1": { "color": "", "value": 0 },
      "rest1": { "color": "", "value": 0 },
      "reps2": { "color": "", "value": 0 },
      "rest2": { "color": "", "value": 0 }
    },
    "WP": {
      "reps1": { "color": "", "value": 0 },
      "rest1": { "color": "", "value": 0 },
      "reps2": { "color": "", "value": 0 },
      "rest2": { "color": "", "value": 0 }
    }
  },
  {
    "day": "07.04.26",
    "SU": {
      "reps1": { "color": "", "value": 0 },
      "rest1": { "color": "", "value": 0 },
      "reps2": { "color": "", "value": 0 },
      "rest2": { "color": "", "value": 0 }
    },
    "Sq": {
      "reps1": { "color": "", "value": 0 },
      "rest1": { "color": "", "value": 0 },
      "reps2": { "color": "", "value": 0 },
      "rest2": { "color": "", "value": 0 }
    },
    "ETK": {
      "reps1": { "color": "", "value": 0 },
      "rest1": { "color": "", "value": 0 },
      "reps2": { "color": "", "value": 0 },
      "rest2": { "color": "", "value": 0 }
    },
    "SCR": {
      "reps1": { "color": "", "value": 0 },
      "rest1": { "color": "", "value": 0 },
      "reps2": { "color": "", "value": 0 },
      "rest2": { "color": "", "value": 0 }
    }
  },
  {
    "day": "09.04.26",
    "RWC": {
      "reps1": { "color": "", "value": 0 },
      "rest1": { "color": "", "value": 0 },
      "reps2": { "color": "", "value": 0 },
      "rest2": { "color": "", "value": 0 }
    },
    "WC": {
      "reps1": { "color": "", "value": 0 },
      "rest1": { "color": "", "value": 0 },
      "reps2": { "color": "", "value": 0 },
      "rest2": { "color": "", "value": 0 }
    },
    "WSC": {
      "reps1": { "color": "", "value": 0 },
      "rest1": { "color": "", "value": 0 },
      "reps2": { "color": "", "value": 0 },
      "rest2": { "color": "", "value": 0 }
    },
    "WP": {
      "reps1": { "color": "", "value": 0 },
      "rest1": { "color": "", "value": 0 },
      "reps2": { "color": "", "value": 0 },
      "rest2": { "color": "", "value": 0 }
    }
  },
  {
    "day": "10.04.26",
    "SU": {
      "reps1": { "color": "", "value": 0 },
      "rest1": { "color": "", "value": 0 },
      "reps2": { "color": "", "value": 0 },
      "rest2": { "color": "", "value": 0 }
    },
    "Sq": {
      "reps1": { "color": "", "value": 0 },
      "rest1": { "color": "", "value": 0 },
      "reps2": { "color": "", "value": 0 },
      "rest2": { "color": "", "value": 0 }
    },
    "ETK": {
      "reps1": { "color": "", "value": 0 },
      "rest1": { "color": "", "value": 0 },
      "reps2": { "color": "", "value": 0 },
      "rest2": { "color": "", "value": 0 }
    },
    "SCR": {
      "reps1": { "color": "", "value": 0 },
      "rest1": { "color": "", "value": 0 },
      "reps2": { "color": "", "value": 0 },
      "rest2": { "color": "", "value": 0 }
    }
  }
]

export default  function WorkoutTable() {
  const {backgroundColor} = useTools();

  const [data, setData] = useState(null)

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
      await AsyncStorage.setItem('@workout_data',jsonValue);
      console.log("Data saved!");
    }catch(err){
      console.error("Error saving data: ",err);
    }
  }

  const loadFromPhone = async () => {
    try{
      let jsonValue
      jsonValue = await AsyncStorage.getItem('@workout_data');
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
          ? `${docDirUri}workout_data.json`
          : `${docDirUri}/workout_data.json`;
        
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
      />
  ));

  return (
    <View style={{height:'100%',width:'100%', backgroundColor: backgroundColor,}}>
      <Pressable 
        style={{
          marginTop:35,
          height:50,
          width:50,
          marginBottom:-40,
        }}
        onPressIn={()=>{uploadToDrive(data)}}
        >
        <Image source={shareIcon} style={{width:40, height:40}}resizeMode="contain"/>
      </Pressable>
      <View style={{alignItems:'center'}}>
        <FlatList
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


