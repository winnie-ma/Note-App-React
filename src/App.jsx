import "./App.css";
import "./components/css/App.css";
import Header from "./components/NotesComponents/Header";
import Notes from "./components/NotesComponents/Notes";
function App() {
  return (
    <div className="main">
      <Header />
      <Notes />
    </div>
  );
}

export default App;
