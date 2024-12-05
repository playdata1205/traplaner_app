import { AuthContextProvider } from './context/UserContext';
import { Header } from './pages/Layout/Header';
import AppRouter from './router/AppRouter';
function App() {
  return (
    <AuthContextProvider>
      <div className='App'>
        <Header />
        <AppRouter />
      </div>
    </AuthContextProvider>
  );
}

export default App;
