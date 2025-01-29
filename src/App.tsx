import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import Menu from "./component/menu/Menu";
import { AuthPage } from "./Pages/AuthPage/AuthPage";
import {HomePage} from "./Pages/HomePage/HomePage.tsx";
import {RecipesPage} from "./Pages/RecipesPage/RecipesPage.tsx";

const App = () => {
  return (
      <Provider store={store}>
        <Router>
          <Menu />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/recipes" element={<RecipesPage />} />
          </Routes>
        </Router>
      </Provider>
  );
};

export default App;
