import logo from "./logo.svg";
import "./App.css";
import UploadFolder from "./components";
import UploadVideo from "./components/UploadVideo";

function App() {
  return (
    <div className="App">
      <UploadFolder />
      <UploadVideo />
    </div>
  );
}

export default App;
