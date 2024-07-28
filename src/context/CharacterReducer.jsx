import { ATTRIBUTE_LIST, CLASS_LIST, SKILL_LIST } from "../consts.js";

//Initialization
const initCharacterAttributeModifiers = () => {
  try {
    return ATTRIBUTE_LIST.reduce((acc, attr) => {
      return {
        ...acc,
        [attr]: {
          attrPoint: 10,
          attrModifier: 0,
        },
      };
    }, {});
  } catch (error) {
    throw new Error(
      `Error on initCharacterAttributeModifiers Function: ${error.message}`
    );
  }
};

const calModifier = (attrPoint) => {
  try {
    return Math.floor((attrPoint - 10) / 2);
  } catch (error) {
    throw new Error(`Error on calModifier Function: ${error.message}`);
  }
};

const calSkillTotal = (skillPoint, attModifier) => {
  try {
    return skillPoint + attModifier;
  } catch (error) {
    throw new Error(`Error on calSkillTotal Function: ${error.message}`);
  }
};

//defailt states initilization
export const initialState = {
  characters: [],
  characterAttributeModifiers: initCharacterAttributeModifiers(),
  defaultAttibutePoint: 10,
  selectedClass: {},
  defaultPointValue: 1,
  count: 0,
  attributesList: ATTRIBUTE_LIST,
  classesList: CLASS_LIST,
  skillList: SKILL_LIST,
};

const characterReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "SELECTED_CLASS": {
      const updatedCharacters = state.characters.map((chr) => {
        if (chr.name === payload.character) {
          const updatedClass = chr.classes.map((item) => {
            if (item.clsName === payload.clsName) {
              return {
                ...item,
                selected: 1,
              };
            } else {
              return {
                ...item,
                selected: 0,
              };
            }
          });
          return {
            ...chr,
            classes: updatedClass,
          };
        }
        return chr;
      });
      return {
        ...state,
        characters: updatedCharacters,
        selectedClass: {
          character: payload.character,
          clsName: payload.clsName,
          selected: 1,
        },
      };
    }
    case "ADD_NEW_CHARACTER":
      return {
        ...state,
        characters: [...state.characters, payload.character],
      };
    case "CALCULATE_SKILL_TOTALS": {
      const updatedCharacters = state.characters.map((chr) => {
        if (chr.name === payload.character) {          

          const updatedSkills = chr.skills.map((item) => {

            const attModifier = chr.attributes.reduce((acc, accItem) => {
              if (accItem.attName === item.attributeModifier) {
                return accItem.attModifier;
              }
              return acc;
            }, 0);
            
            return {
              ...item,
              skillTotal: calSkillTotal(item.skillPoint, attModifier),
            };
          });
          
          return {
            ...chr,
            skills: updatedSkills,
          };
        }
        return chr;
      });

      return {
        ...state,
        characters: updatedCharacters,
      };
    }
    case "INCREASE_ATTRIBUTE_POINTS": {
      const updatedCharacters = state.characters.map((chr) => {
        if (chr.name === payload.character) {
          const updatedAttributes = chr.attributes.map((item) => {
            if (item.attName === payload.attribute) {
              const incrementedAttrPoint = item.attPoint + payload.point;
              return {
                ...item,
                attPoint: incrementedAttrPoint,
                attModifier: calModifier(incrementedAttrPoint),
              };
            }
            return item;
          });
          return {
            ...chr,
            attributes: updatedAttributes,
          };
        }
        return chr;
      });

      return {
        ...state,
        characters: updatedCharacters,
      };
    }
    case "DECREASE_ATTRIBUTE_POINTS": {
      const updatedCharacters = state.characters.map((chr) => {
        if (chr.name === payload.character) {
          const updatedAttributes = chr.attributes.map((item) => {
            if (item.attName === payload.attribute) {
              const descrementedAttrPoint = item.attPoint - payload.point;
              return {
                ...item,
                attPoint: descrementedAttrPoint,
                attModifier: calModifier(descrementedAttrPoint),
              };
            }
            return item;
          });
          return {
            ...chr,
            attributes: updatedAttributes,
          };
        }
        return chr;
      });

      return {
        ...state,
        characters: updatedCharacters,
      };
    }
    case "INCREASE_SKILL_POINTS": {
      const updatedCharacters = state.characters.map((chr) => {
        if (chr.name === payload.character) {
          const attModifier = chr.attributes.reduce((acc, item) => {
            if (item.attName === payload.attributeModifier) {
              return item.attModifier;
            }
            return acc;
          }, 0);

          const updatedSkills = chr.skills.map((item) => {
            if (item.name === payload.skill) {
              const incrementedSkillPoint = item.skillPoint + payload.point;
              return {
                ...item,
                skillPoint: incrementedSkillPoint,
                skillTotal: calSkillTotal(incrementedSkillPoint, attModifier),
              };
            }
            return item;
          });
          return {
            ...chr,
            skills: updatedSkills,
          };
        }
        return chr;
      });

      return {
        ...state,
        characters: updatedCharacters,
      };
    }
    case "DECREASE_SKILL_POINTS": {
      const updatedCharacters = state.characters.map((chr) => {
        if (chr.name === payload.character) {
          const attModifier = chr.attributes.reduce((acc, item) => {
            if (item.attName === payload.attributeModifier) {
              return item.attModifier;
            }
            return acc;
          }, 0);

          const updatedSkills = chr.skills.map((item) => {
            if (item.name === payload.skill) {
              const descrementedSkillPoint = item.skillPoint - payload.point;
              return {
                ...item,
                skillPoint: descrementedSkillPoint,
                skillTotal: calSkillTotal(descrementedSkillPoint, attModifier),
              };
            }
            return item;
          });
          return {
            ...chr,
            skills: updatedSkills,
          };
        }
        return chr;
      });

      return {
        ...state,
        characters: updatedCharacters,
      };
    }
    default:
      throw new Error(`No case for type ${type} found in characterReducer.`);
  }
};

export default characterReducer;
