import { BrowserRouter, Switch, Route } from 'react-router-dom';
import GlobalStyle from './styles/GlobalStyle';

import Participants from './pages/Participants';
import "antd/dist/antd.css";

function App() {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Switch>
          <Route component={Participants} path="/" exact />
        </Switch>
      </BrowserRouter>
   </>
  );
}

export default App;
