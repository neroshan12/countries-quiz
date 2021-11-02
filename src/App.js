import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import Home from "./containers/Home";
import "./App.scss";

const client = new ApolloClient({
  uri: "https://countries.trevorblades.com/",
  cache: new InMemoryCache(),
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Home />
      </div>
    </ApolloProvider>
  );
};

export default App;
