import './App.css';
import{ BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './components/Home';
// import Products from './components/Products';
import Profile from './components/Profile';
import Redeem from './components/Redeem';
import Aboutus from './components/Aboutus';
import Portfolio from './components/Portfolio';
import Withdrawc from './components/Withdrawc';
import Withdrawselect from './components/Withdrawselect';
import Recharge from './components/Recharge';
import Mywithrdm from './components/Mywithrdm';
import Myrdm from './components/Myrdm';
import Myrchrge from './components/Myrchrge';
import Signup from './components/Signup';
import Login from './components/Login';
import ProtectedRoutes from './components/ProtectedRoutes';
import Admin from './components/Admin';
import AdminAddRewward from './components/AdminAddRewward';
import AdminWithdraw from './components/AdminWithdraw';
import AdminRewards from './components/AdminRewards';
import AdminRecharge from './components/AdminRecharge';
import AdminGate from './components/AdminGate';

function App() {
  return (
    <div className="App">
     <Router>
      <Routes>

        <Route path='/' element={<Signup />}></Route>



        <Route path='/login' element={<Login />}></Route>

        <Route path='/home' element={<Home />}></Route>

        <Route path='/portfolio' element={<Portfolio />}></Route>

        <Route element={<ProtectedRoutes />}>

          <Route path='/home' element={<Home />}></Route>

          <Route path='/portfolio' element={<Portfolio />}></Route>

          <Route path='/redeem' element={<Redeem />}></Route>

          <Route path='/profile' element={<Profile />}></Route>

          <Route path='/aboutus' element={<Aboutus />}></Route>
        
          <Route path='/withdrawc' element={<Withdrawc />}></Route>

          <Route path='/withdraw' element={<Withdrawselect />}></Route>

          <Route path='/recharge' element={<Recharge />}></Route>

          <Route path='/mywithdraw' element={<Mywithrdm />}></Route>

          <Route path='/myrdm' element={<Myrdm />}></Route>

          <Route path='/myrchrg' element={<Myrchrge />}></Route>

        </Route>

        <Route path="/admin" element={<AdminGate />}>

          <Route index element={<Admin />} />

          <Route path="withdraw" element={<AdminWithdraw />} />

          <Route path="addreward" element={<AdminAddRewward />} />

          <Route path="reward" element={<AdminRewards />} />

          <Route path="recharge" element={<AdminRecharge />} />

        </Route>


      </Routes>
      
     </Router>
    </div>
  );
}

export default App;
