import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import StatusPage from "./components/StatusPage";
import NotesManager from "./components/NotesManager";
import LoginPage from "./components/LoginPage";
import Register from "./components/RegisterPage";
import Notes from "./components/notes";
import useRequestUser from "./hooks/useRequestUser";


// Componente principal de la aplicación.
const App = () => {

    const usr=useRequestUser('login','ok','ko')

  // Mostramos la aplicación
  return (
      <Router>
        <main>
          <h1>Gestor de Notas</h1>
            <div>
                <h3>Menu</h3>
                <ul>
                    <li><a href={"/register"}>Registrar</a></li>
                    <li><a href={"/login"}>Login</a><button onClick={usr.logout} > Logout</button></li>
                    <li><a href={"/status"}>status</a></li>
                    <li><a href={"/notes"}>notes</a></li>
                </ul>
            </div>

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
