import { UserContextProvider } from "./context/UserContext";
import Pages from "./routes";

const App = () => {

  return (
    <UserContextProvider>
      <Pages />
    </UserContextProvider>
  );
};

export default App;
