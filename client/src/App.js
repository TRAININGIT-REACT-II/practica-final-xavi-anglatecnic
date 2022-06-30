import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import StatusPage from "./components/StatusPage";
import NotesManager from "./components/NotesManager";
import LoginPage from "./components/LoginPage";
import Register from "./components/RegisterPage";
import Notes from "./components/notes";


// Componente principal de la aplicación.
const App = () => {

  // Mostramos la aplicación
  return (
      <Router>
        <main>
          <h1>Gestor de Notas</h1>
                <Route path="/"  ><NotesManager /></Route>
                <Route path="/login" ><LoginPage/> </Route>
                <Route path="/register" ><Register/> </Route>
                <Route path="/status" ><StatusPage/> </Route>
                <Route path="/notes" ><Notes/> </Route>
        </main>

      </Router>
  );
};

export default App;
