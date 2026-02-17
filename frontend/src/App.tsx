import GenerarMinutaPage from './pages/GenerarMinutaPage';
import { Analytics } from "@vercel/analytics/react"

function App() {
  return (
    <div className="App">
      <GenerarMinutaPage />
      <Analytics />
    </div>
  );
}

export default App;