import { FC, useState } from 'react';
import InputField from './components/InputField';
import './App.css';

const App: FC = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <span className="Heading">Taskify</span>
      <InputField />
    </div>
  );
};

export default App;
