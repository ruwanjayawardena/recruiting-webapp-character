import Character from "./pages/Character";
import { CharacterProvider } from "./context/CharacterContext";
import "./index.css";

const App = () => {
  return (
    <>
      <div className="container mx-auto">
        <div className="bg-gradient-to-r from-slate-100 to-slate-50 rounded p-4 my-3">
          <h1 className="text-3xl font-light text-Slate-50 py-3">
            <span className="font-bold">React Coding Exercise</span> - Ruwan
            Jayawardena
          </h1>
        </div>       
        <CharacterProvider>
            <Character />
        </CharacterProvider>
      </div>
    </>
  );
};

export default App;
