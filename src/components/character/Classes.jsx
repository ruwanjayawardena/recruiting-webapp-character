import useCharacterContext from "../../context/CharacterContext";

const Classes = ({ classes, character }) => {
  
  const { setSelectedClass } = useCharacterContext();

  return (
    <>
      <div className="flex flex-col divide-y divide-slate-200">
        <h3 className="bg-gray-200 border-b p-2 text-sm font-bold border-b-3 border-gray-600">
          Classes
        </h3>        
        {classes.map((item) => (
          <div
            key={item.clsName}
            className={`bg-white hover:bg-gray-50 p-2 text-sm ${
              item.selected ? "font-bold" : "font-light"
            }`}
            onClick={() => setSelectedClass(item.clsName,character)}
          >
            {item.clsName}
          </div>
        ))}
      </div>
    </>
  );
};

export default Classes;
