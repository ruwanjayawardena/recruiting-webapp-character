import { createContext, useReducer, useContext } from "react";
import characterReducer, { initialState } from "./CharacterReducer";

const CharacterContext = createContext(initialState);

export const CharacterProvider = ({ children }) => {
  
  const [state, dispatch] = useReducer(characterReducer, initialState);

  const addNewCharacter = () => {
    const generateRandomNumber = (min, max) => {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    const name = `Character #${generateRandomNumber(0, 100)}`;

    const attributes = state.attributesList.map((attName) => ({
      attName,
      attPoint: 10,
      attModifier: 0,
    }));

    const classes = Object.entries(state.classesList).map(
      ([clsName, clsAtt]) => ({
        clsName,
        eligiblity: 0,
        selected: 0,
        defaultAttPoints: Object.entries(clsAtt).map(([attribute, point]) => ({
          attName: attribute,
          attPoint: point,
          attModifier: 0,
        })),
      })
    );

    const skills = state.skillList.map((skill) => ({
      ...skill,
      skillPoint: 0,
      skillTotal: 0,
    }));

    dispatch({
      type: "ADD_NEW_CHARACTER",
      payload: {
        character: {
          name,
          totalAttrPoint: state.attributesList.length * 10,
          attributes,
          classes,
          skills,
        },
      },
    });
  };

  const setSelectedClass = (clsName, character) => {
    dispatch({
      type: "SELECTED_CLASS",
      payload: {
        clsName: clsName,
        character: character,
      },
    });
  };

  /**
   * Change Attributes Point Function
   * @param {String} event
   * @param {String} attribute
   * @param {Number} updateBy
   */
  const changeAttributePoints = (reducer, attribute, character) => {
    try {
      dispatch({
        type: reducer,
        payload: {
          point: state.defaultPointValue,
          attribute: attribute,
          character: character,
        },
      });
      dispatch({
        type: "CALCULATE_SKILL_TOTALS",
        payload:{
          character: character,
        }
      });
    } catch (error) {
      throw new Error(
        `Error on changeAttributePoints Function: ${error.message}`
      );
    }
  };

  const changeSkillPoints = (reducer, skill, attributeModifier, character) => {
    try {
      dispatch({
        type: reducer,
        payload: {
          point: state.defaultPointValue,
          skill: skill,
          attributeModifier: attributeModifier,
          character: character,
        },
      });
      dispatch({
        type: "CALCULATE_SKILL_TOTALS",
        payload:{
          character: character,
        }
      });
    } catch (error) {
      throw new Error(`Error on changeSkillPoints Function: ${error.message}`);
    }
  };

  const calculateSkillTotals = (character) => {
    try {
      dispatch({
        type: "CALCULATE_SKILL_TOTALS",
        payload:{
          character: character,
        }
      });
    } catch (error) {
      throw new Error(
        `Error on calculateSkillTotals Function: ${error.message}`
      );
    }
  };

  const providerStateValues = {
    characters: state.characters, //array with character objects
    characterAttributeModifiers: state.characterAttributeModifiers, //array with attributes and modifier point values for character
    defaultAttibutePoint: state.defaultAttibutePoint, //defailt point 10
    defaultPointValue: state.defaultPointValue, //defailt point 1 for increase or decrease
    selectedClass: state.selectedClass, // maintain defailt selected class for display info
    count: state.count,
    attributesList: state.attributesList, //pre defined constant
    classesList: state.classesList, //pre defined constant
    skillList: state.skillList, //pre defined constant
    setSelectedClass,
    changeAttributePoints,
    addNewCharacter,
    changeSkillPoints,
    calculateSkillTotals,
  };
  return (
    <CharacterContext.Provider value={providerStateValues}>
      {children}
    </CharacterContext.Provider>
  );
};

const useCharacterContext = () => {
  const context = useContext(CharacterContext);

  if (context === undefined) {
    throw new Error("useShop must be used within CharacterContext");
  }

  return context;
};

export default useCharacterContext;
