import renderRoutes, { routes } from "./utils/routes";
import { AuthProvider } from './context/AuthContext'

function App() {
  return <AuthProvider>{renderRoutes(routes)}</AuthProvider>
     
}

export default App;