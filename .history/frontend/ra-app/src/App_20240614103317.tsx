import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  

  return (
    <Router>
      <div>
        <h1>RA-APP</h1>
      </div>
    <Routes>
      <Route path="/" Component={() => <>ADMINNNN</>} />
    </Routes>
    </Router>
  )
}

export default App
