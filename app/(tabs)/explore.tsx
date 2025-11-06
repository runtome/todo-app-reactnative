import { useState } from 'react';
import {
  Button,
  FlatList,
  StyleSheet,
  View
} from 'react-native';

import GoalInput from '@/components/GoalInput';
import GoalItem from '@/components/GoalItem';

export default function TabTwoScreen() {
  const [modalIsVisible, setModalIsVisible] = useState<boolean>(false);
  const [courseGoals, setCourseGoals] = useState<{text: string; id:string}[]>([])

  function startAddGoalHandler(){
    setModalIsVisible(true);
  }


  function addGoalHandler(enteredGoalText: string) {
    setCourseGoals((currentCourseGoals) => [
      ...currentCourseGoals,
      { text: enteredGoalText, id: Math.random().toString() },
    ]);
    endAddGoalHandler();
  }

  function deleteGoalHandler(id:string){
    setCourseGoals((currentCourseGoals)=>{
      return currentCourseGoals.filter((goal) => goal.id != id);
    });
  }

  function endAddGoalHandler(){
    setModalIsVisible(false);
  }

  return (
    <View style={styles.appContainer}>
      <Button
        title='Add new Goal'
        color='#5e0acc'
        onPress={startAddGoalHandler}
      />
      <GoalInput 
      visible={modalIsVisible} 
      onAddGoal={addGoalHandler}
      onCancel={endAddGoalHandler} />
      <View style={styles.goalsContainer}>
        <FlatList
          data={courseGoals}
          renderItem={(itemData) => {
            return <GoalItem 
            text={itemData.item.text}
            id={itemData.item.id}
            onDeleteItem={deleteGoalHandler}
            />;
          }}
          keyExtractor={(item, index) => {
            return item.id;
          }}
          alwaysBounceVertical={false}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#cccccc',
    width: '70%',
    marginRight: 8,
    padding: 8,
  },
  goalsContainer: {
    flex: 5,
  },
  goalItem: {
    margin: 8,
    padding: 8,
    borderRadius: 6,
    backgroundColor: '#5e0acc',
  },
  goalText: {
    color: 'white',
  },
});