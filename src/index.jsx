import { createRoot } from 'react-dom/client';

// Import statement to indicate that you need to bundle `./index.scss`
import "./index.scss";
import { MainView } from './Components/MainView/main-view'; 
// Main component (will eventually use all the others)
const MyFlixApplication = () => {
  return (
    <div className="my-flix">
      <div><MainView /> </div>
    </div>
  );
};

// Finds the root of your app
const container = document.querySelector("#root");
const root = createRoot(container);

// Tells React to render your app in the root DOM element
root.render(<MyFlixApplication />);