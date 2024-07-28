import useCharacterContext from "../../context/CharacterContext";

const ClassesAttributes = ({ classes, character }) => {
  
  const { selectedClass } = useCharacterContext();

  return (
    <>
      {selectedClass.character === character && selectedClass.selected ? (
        <div className="flex flex-col divide-y divide-slate-200 border-2 border-blue-300">
          {classes.map((cls) =>
            cls.selected ? (
              <div key={cls.clsName}>
                <h3 className="bg-gray-200 border-b p-2 text-sm font-bold border-b-3 border-gray-600 text-blue-600">
                  {cls.clsName} Minimum Requirements
                </h3>

                {cls.defaultAttPoints.map((attr) => (
                  <div
                    key={attr.attName}
                    className="bg-white hover:bg-gray-50 hover:font-semibold p-2 text-sm font-light border-b border-b-3 border-gray-200"
                  >
                    {attr.attName}: {attr.attPoint}
                  </div>
                ))}
              </div>
            ) : null
          )}
        </div>
      ) : null}
    </>
  );
};

export default ClassesAttributes;
