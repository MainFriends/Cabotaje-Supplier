import { UserContextProvider } from "./context/userContext";
import Pages from "./routes";

const App = () => {

  return (
    <UserContextProvider>
      <Pages />
    </UserContextProvider>
  );
};

export default App;
