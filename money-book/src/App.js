import './App.css';
import {Switch, Route} from 'react-router-dom';

import Login from './auth/login/page';
import SignUp from './auth/SingUp/page';
import LogOut from './auth/logout/page';
import List from './routes/list/page';
import Category from './routes/category/page';

import PostList from './Modal/PostList/page';
import PostMainCategory from './routes/PostMainCategory/page';
import PostSubCategory from './routes/PostSubCategory/page';
import PostMainPayment from './routes/PostMainPayment/page';
import PostSubPayment from './routes/PostSubPayment/page';

import Search from './Modal/search/page';
import UploadImages from './routes/UploadImage/page';
function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path='/'>
          <Login></Login>
        </Route>
        <Route exact path="/list">
          <List></List>
        </Route>
        <Route path="/sign-up"> 
          <SignUp></SignUp>
        </Route>
        <Route path="/logout">
          <LogOut></LogOut>
        </Route>
        <Route exact path="/post">
          <PostList></PostList>
        </Route>
        <Route path="/category">
          <Category></Category>
        </Route>

        <Route path="/post/category/main">
          <PostMainCategory></PostMainCategory>
        </Route>
        <Route path="/post/category/sub">
          <PostSubCategory></PostSubCategory>
        </Route>
        <Route path="/post/payment/main">
          <PostMainPayment></PostMainPayment>
        </Route>
        <Route path="/post/payment/sub">
          <PostSubPayment></PostSubPayment>
        </Route>
        <Route path="/search">
          <Search></Search>
        </Route>
        <Route path="/images">
          <UploadImages></UploadImages>
        </Route>
      </Switch>
      
  </div>
  );
}

export default App;
