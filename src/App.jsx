import {useState, useEffect} from "react";
import cookieImage from "./images/cookie.png"


export default function App() {
  const initialCookies = 0;
  const initialCps = 1;
  const initialStoreItems = [
    { name: "Upgrade 1", cost: 10, increment: 1 },
    { name: "Upgrade 2", cost: 100, increment: 10 },
    { name: "Upgrade 3", cost: 1000, increment: 100 },
    { name: "Upgrade 4", cost: 10000, increment: 1000 },
    { name: "Upgrade 5", cost: 100000, increment: 10000 },]

  const [cookies,setCookies] = useState(initialCookies);
  const [cps, setCookiesPerSecond] = useState(initialCps)
  const [storeItems, setStoreItems] = useState(initialStoreItems)

  const [nomVisible, setNomVisible] = useState(false);


  useEffect(() => {
    const cookieInterval = setInterval(() => {
      setCookies((currentCookies) => currentCookies + 1);
    },1000/cps);
  return () => {
    clearInterval(cookieInterval)
  }}, [cps])


  const addCookie = () => {
    setCookies((currentCookies) => currentCookies + 1);
    setNomVisible(true);

    
    setTimeout(() => {
      setNomVisible(false);
    }, 250);
  };

  const purchaseItem = (storeItem) => {
    if (cookies >= storeItem.cost) {
      setCookies((currentCookies) => currentCookies - storeItem.cost);
      setCookiesPerSecond((currentCps) => currentCps + storeItem.increment);
    } else {
      alert("Not enough cookies to purchase this item!");
    }
  };

  const resetGame = () => {
    setCookies(initialCookies);
    setCookiesPerSecond(initialCps);
    setStoreItems(initialStoreItems);
    setNomVisible(false);
  };



  return <div className="main">
    <img src={cookieImage} alt="Cookie icon" style={{ width: "100px", height: "100px", cursor: "pointer"}} onClick={addCookie} />
    {nomVisible && <p>*nom*</p>}
    <p>No. of cookies: {cookies}</p>
    <p>Cookies per second: {cps}</p>
  

    <h2>The Upgrade Store</h2>
      <ul>
        {storeItems.map((storeItem, index) => (
          <li key={index}>
            <button onClick={() => purchaseItem(storeItem)}>
              {storeItem.name} for {storeItem.cost} cookies
            </button>
          </li>
        ))}
      </ul>

      <button className="reset" onClick={resetGame}>Reset Game</button>
  </div>
}

