// /client/src/App.jsx
import CreateBookForm from './components/CreateBookForm';
import CreateRecipeForm from './components/CreateRecipeForm';
import CreateSensorForm from './components/CreateSensorForm';

function App() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Full-Stack Project Dashboard (CRUD - Create Demo)</h1>
      <p>This demonstrates the **Create** functionality for all three models using React forms connecting to the Express API.</p>
      
      <CreateBookForm />
      <hr />
      <CreateRecipeForm />
      <hr />
      <CreateSensorForm />

      {/* For a full app, you would add components here to demonstrate List and Display */}
    </div>
  );
}

export default App;