import { View, StyleSheet, FlatList } from "react-native";
import ExerciseColumn from "./ExerciseColumn";
import { useCallback, useEffect, useRef, useState } from "react";

export default function ExerciseColumnHolder({ groupedTemplates, categories, index, colectAllExercises, selectedExercises, activeCategory, setActiveCategory}) {
    const flatListRef = useRef(null);
    const lastOffsetX = useRef(0);

    useEffect(() => {
        setTimeout(() => {
            
            flatListRef.current.scrollToIndex({
                index: index,
                animated: false
            })
        }, 100)
    }, [index])

    const renderItem = useCallback(({ item }) => {
        return (
            <ExerciseColumn
                templates={groupedTemplates}
                category={item}
                colectAllExercises={colectAllExercises}
                selectedExercises={selectedExercises}
                activeCategory={activeCategory}
            />
        )
    }, [selectedExercises, activeCategory,]);

    function handleScroll(event) {
        const currentOffsetX = event.nativeEvent.contentOffset.x
        if(currentOffsetX > lastOffsetX.current + 10){
            //console.log("Swipe left!")
        }else if(currentOffsetX < lastOffsetX.current - 10){
            //console.log("Swipe right!")
        }

        lastOffsetX.current = currentOffsetX;
    }

    const onViewableItemsChanged = useRef(({viewableItems})=>{
        if(viewableItems.length > 0){
            const currentVisibleItem = viewableItems[0].item
            //setActiveItem(currentVisibleItem);
            setActiveCategory(currentVisibleItem)
            //console.log("Current item: ", currentVisibleItem);
        }
    })

    const viewabilityConfig = useRef({
        itemVisiblePercentThreshold: 50,
    })

    return (
        <View style={styles.exerciseMainBody}>
            <FlatList
                ref={flatListRef}
                style={styles.flatListConteiner}
                contentContainerStyle={styles.flatListContet}
                data={categories}
                renderItem={renderItem}
                horizontal={true}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                initialNumToRender={11}

                //onScroll={handleScroll}
                //scrollEventThrottle={200}
                
                onViewableItemsChanged={onViewableItemsChanged.current}
                viewabilityConfig={viewabilityConfig.current}
            />

        </View>
    )
};


const styles = StyleSheet.create({
    exerciseMainBody: {
        //borderColor: 'red',
        borderWidth: 0.1,
        borderRadius: 5,
        height: '90%',
        width:'100%',
        margin: 5,
        //justifyContent:'center',
        //alignItems:'center'
        overflow: 'hidden'
    },
    exerciseBody: {
        borderColor: 'yellow',
        borderWidth: 1,
        borderRadius: 5,
        height: "98%",
        width: "30%",
        margin: 5,
        backgroundColor: '#3D458F',
    },
    flatListConteiner: {
        height: "100%",
        width: '100%',
        //borderWidth: 1,
        //borderColor: 'yellow',

    },
    flatListContet: {
        //justifyContent: 'center',
        alignItems: 'center',
        //justifyContent:'center',
        marginLeft: 100,
        marginLeft:100
    },

});