import CharacterAction from "../components/character/CharacterAction";
import Attributes from "../components/character/Attributes";
import Classes from "../components/character/Classes";
import Skills from "../components/character/Skills";
import ClassesAttributes from "../components/character/ClassesAttributes";
import useCharacterContext from "../context/CharacterContext";

const Character = () => {
  const { characters } = useCharacterContext();
  return (
    <>
      <CharacterAction />

      {characters.map((item, index) => (
        <div key={index} className="grid grid-cols-1 mb-2">
          <div className="bg-slate-200 p-3 capitalize font-bold text-center rounded-sm">
            {item.name}
          </div>
          <div key={index} className="p-2 text-sm font-light grid grid-cols-4">
            <Attributes characterAttributes={item.attributes} character={item.name}/>
            <Classes classes={item.classes} character={item.name}/>
            <ClassesAttributes classes={item.classes} character={item.name}/>
            <Skills skills={item.skills} character={item.name}/>
          </div>
        </div>
      ))}
    </>
  );
};

export default Character;
