import { createRoot } from 'react-dom/client';
import "./index.scss";
import { MainView } from './Components/MainView/main-view'; 
import Container from 'react-bootstrap/Container';

// Main component (will eventually use all the others)
const MyFlixApplication = () => {
  return (
    <Container>
    <MainView />
    </Container>
  );
};

// Finds the root of your app
const container = document.querySelector("#root");
const root = createRoot(container);

// Tells React to render your app in the root DOM element
root.render(<MyFlixApplication />);