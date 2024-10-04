// import Login from "./components/Login";
import { ThemeProvider } from "./components/themeProvider";
import Register from "./components/Register";

function App() {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <div className=" min-h-screen  dark:bg-black">
          <Register />
        </div>
      </ThemeProvider>
    </>
  );
}

export default App;
