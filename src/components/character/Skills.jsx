import useCharacterContext from "../../context/CharacterContext";

const Skills = ({ skills, character }) => {
  
  const { characters, changeSkillPoints } = useCharacterContext();

  const getCharacterAttrModifiers = (attributeModifier) => {
    return characters.map((chr) => {
      if (chr.name === character) {
        return chr.attributes.map((attr) => {
          if (attr.attName === attributeModifier) {
            return attr.attModifier;
          }
        });
      }
    });
  };  

  return (
    <>
      <div className="flex flex-col divide-y divide-slate-200">
        <h3 className="bg-gray-200 border-b p-2 text-sm font-bold border-b-3 border-gray-600">
          Skills
        </h3>
        {skills.map((item, index) => (
          <div
            key={index}
            className="bg-white hover:bg-gray-50 hover:font-semibold p-1 text-sm font-light grid grid-cols-4 justify-items-end"
          >
            <div>
              <span className="font-semibold">{item.name}</span>:
              {item.skillPoint}
            </div>

            <div>
              <span className="font-semibold">{item.attributeModifier}</span>:
              {getCharacterAttrModifiers(item.attributeModifier)}
            </div>
            <div className="flex-a">
              <button
                type="button"
                onClick={() =>
                  changeSkillPoints(
                    "INCREASE_SKILL_POINTS",
                    item.name,
                    item.attributeModifier,
                    character
                  )
                }
                className="m-1 px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
              >
                +
              </button>

              <button
                type="button"
                onClick={() =>
                  changeSkillPoints(
                    "DECREASE_SKILL_POINTS",
                    item.name,
                    item.attributeModifier,
                    character
                  )
                }
                className="px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
              >
                -
              </button>
            </div>
            <div>
              <span className="font-semibold">Total</span>:{item.skillTotal}
            </div>
          </div>
        ))}
      </div>
    </>
  );  
};

export default Skills;
