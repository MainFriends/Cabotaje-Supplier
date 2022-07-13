import { UserContextProvider } from "./context/UserContext";
import Pages from "./Routes";

const App = () => {

  return (
    <UserContextProvider>
      <Pages />
    </UserContextProvider>
  );
};

export default App;
