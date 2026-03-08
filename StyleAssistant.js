import { createContext, useContext } from "react";

export const StyleAssistant = createContext();

export const AssistantProvider = ({children}) => {

    const borderColor =  "#4C7DC0";
    const textColor = '#EBF8E7';
    const backgroundColor = '#2E346E';

    const YellowBorder = {
        borderColor:'yellow',
        borderWidth:1,
    }
    const RedBorder = {
        borderColor:'red',
        borderWidth:1,
    }

    return(
        <StyleAssistant.Provider 
            value={{
                borderColor,
                textColor,
                backgroundColor,

                YellowBorder,
                RedBorder,
                
            }}
        >
            {children}
        </StyleAssistant.Provider>
    );
};

export const useTools = () =>{
    const context = useContext(StyleAssistant);
    if(!context){
        throw new Error("useTools must be used within a AssistantProvider")
    }
    return context
}