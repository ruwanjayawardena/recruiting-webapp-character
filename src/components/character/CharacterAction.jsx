import useCharacterContext from "../../context/CharacterContext";

const CharacterAction = () => {

  const { addNewCharacter } = useCharacterContext();
  
  return (
    <>
      <div className="col-span-4 p-1">
        <button
          onClick={() => addNewCharacter()}
          type="button"
          className="m-1 px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
        >
          Add New Character
        </button>
        <button
          type="button"
          className="m-1 px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
        >
          Reset All Characters
        </button>
        <button
          type="button"
          className="m-1 px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
        >
          Save All Characters
        </button>
      </div>
    </>
  );
};

export default CharacterAction;
