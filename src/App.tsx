import "./App.css";
import ErrorBoundary from "./ErrorHandler";
import { Authorization } from "./components/Authorization";
import { AlbumsContextProvider } from "./contexts/albums";
import { AuthorizationContextProvider } from "./contexts/authorization";
import { BrowserRouter } from "react-router-dom";

function App() {
  // read query string parameters from url of page and save the token in local storage

  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get("token");
  if (token) {
    localStorage.setItem("spotify-token", token);
  }

  // Remove token from url
  window.history.replaceState({}, document.title, "/");

  return (
    <ErrorBoundary>
      <BrowserRouter>
        <div className="App" data-testid="app">
          <AuthorizationContextProvider>
            <AlbumsContextProvider>
              <Authorization />
            </AlbumsContextProvider>
          </AuthorizationContextProvider>
        </div>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
