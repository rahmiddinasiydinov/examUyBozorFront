import { useEffect, useRef, useState } from "react";
import "./App.scss";

function App() {
  const [company, setCompany] = useState([]);
  const [complex, setComplex] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [mortgage, setMortgage] = useState([]);
  const [chosenCompany, setChosenCompany] = useState("");
  const [chosenComplex, setChosenComplex] = useState("");
  const [chosenRooms, setChosenRooms] = useState("");
  const [chosenMortgage, setChosenMortgage] = useState("");
  const [chosenBank, setChosenBank] = useState("");
  const [bank, setBank] = useState('')
  const [percent, setPercent] = useState(0)
  const [chosenItems, setChosenItems] = useState({
    company: "",
    complex: "",
    rooms: "",
    rooms_per: "",
    area: "",
    mortgage: "",
  });
  const asnwer = useRef();
  useEffect(() => {
    fetch("https://uy-bozor.herokuapp.com/company")
      .then((res) => res.json())
      .then((data) => {
        setCompany(data);
      });
  }, []);

  useEffect(() => {
    if (chosenCompany.length != 0) {
      fetch(`https://uy-bozor.herokuapp.com/complex/?id=${chosenCompany}`)
        .then((res) => res.json())
        .then((data) => {
          setComplex(data);
        });
    }
  }, [chosenCompany]);
  useEffect(() => {
    if (chosenComplex.length != 0) {
      fetch(`https://uy-bozor.herokuapp.com/rooms/?id=${chosenComplex}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setRooms(data);
        });
    }
  }, [chosenComplex]);
  useEffect(() => {
    if (chosenRooms.length != 0) {
      fetch(`https://uy-bozor.herokuapp.com/mortgage/?id=${chosenCompany}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setMortgage(data);
        });
    }
  }, [chosenRooms]);
  useEffect(() => {
    if (chosenMortgage.length != 0) {
      fetch(`https://uy-bozor.herokuapp.com/bank/?id=${chosenMortgage}`)
        .then((res) => res.json())
        .then((data) => {
          setChosenBank(data[0].id);
          setBank(data[0].name);
          setPercent(data[0].percent);
        });
    }
  }, [chosenMortgage]);

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="header">Uy bozor</h1>
        <form className="form">
          <label className="form__label" htmlFor="company">
            Kompaniya
            <select
              name="company"
              id="company"
              className="form__select"
              onChange={(e) => {
                setChosenCompany(e.target.value);
                const found = company.find(
                  (i) => i.company_id == e.target.value
                );
                console.log(found);
                chosenItems.company = found.company_name;
                setChosenItems(chosenItems);
                setChosenComplex("");
                setChosenRooms("");
                setChosenMortgage("");
                setComplex([]);
                setRooms([]);
                setMortgage([]);
              }}
            >
              <option className="option" disabled selected>
                Choose
              </option>
              {company &&
                company.map((e, i) => {
                  return (
                    <option className="option" key={i} value={e.company_id}>
                      {e.company_name}
                    </option>
                  );
                })}
            </select>
          </label>
          <label className="form__label" htmlFor="company">
            Komplex
            <select
              name="company"
              id="company"
              className="form__select"
              onChange={(e) => {
                setChosenComplex(e.target.value);
                const found = complex.find(
                  (i) => i.complex_id == e.target.value
                );
                chosenItems.complex = found.complex_name;
                setChosenItems(chosenItems);
                setChosenRooms("");
                setChosenMortgage("");
                setRooms([]);
                setMortgage([]);
              }}
            >
              <option className="option" disabled selected>
                Choose
              </option>
              {complex &&
                complex.map((e, i) => {
                  return (
                    <option className="option" key={i} value={e.complex_id}>
                      {e.complex_name}
                    </option>
                  );
                })}
            </select>
          </label>
          <label className="form__label" htmlFor="company">
            Xonalar soni
            <select
              name="company"
              id="company"
              className="form__select"
              onChange={(elem) => {
                const found = rooms.find(
                  (e) => e.rooms_id == elem.target.value
                );
                chosenItems.rooms = found.rooms_num;
                chosenItems.area = found.rooms_area;
                chosenItems.rooms_per = found.rooms_price_per_meter;
                setChosenItems(chosenItems);
                setChosenRooms(elem.target.value);
                setMortgage("");
              }}
            >
              <option className="option" disabled selected>
                Choose
              </option>
              {rooms &&
                rooms.map((e, i) => {
                  return (
                    <option className="option" key={i} value={e.rooms_id}>
                      {e.rooms_num}
                    </option>
                  );
                })}
            </select>
          </label>
          <label className="form__label" htmlFor="company">
            Bo'lib to'lash
            <select
              name="company"
              id="company"
              className="form__select"
              onChange={(e) => {
                setChosenMortgage(e.target.value);
                const found = mortgage.find(
                  (i) => i.mortgage_id == e.target.value
                  );
                  chosenItems.mortgage = found.mortgage_year;
                  setChosenItems(chosenItems);
                  console.log(found, e.target.value)
                console.log({
                  chosenCompany,
                  chosenComplex,
                  chosenRooms: chosenRooms.rooms_id,
                  chosenMortgage,
                });
              }}
            >
              <option className="option" disabled selected>
                Choose
              </option>
              {mortgage &&
                mortgage.map((e, i) => {
                  return (
                    <option className="option" key={i} value={e.mortgage_id}>
                      {e.mortgage_year}
                    </option>
                  );
                })}
            </select>
          </label>
        </form>
       <div className="main">
       <div className="chosen__options">
          <h2 className="chosen__company">Kompaniya:  {chosenItems.company}</h2>
          <h4 className="chosen__complex">Kompleks:  {chosenItems.complex}</h4>
          <div className="chosen__rooms">
            <span className="chosen__rooms--num">
             {`Xonalar soni: ${chosenItems.rooms} `}
            </span>
            <span className="chosen__rooms--area">
              Area: {chosenItems.area} metr<sup>2</sup>
              </span>
            <span className="chosen__rooms--per">
              1 metr<sup>2</sup> narxi : {chosenItems.rooms_per} so'm
              </span>
              <span className="chosen__rooms--price">
              Umumiy narxi : {chosenItems.rooms_per*chosenItems.area?chosenItems.rooms_per*chosenItems.area:0} so'm
              </span>
          </div>
          <span className="chosen__mortgage">Kredit yili: {chosenItems.mortgage}</span>
          <span className="chosen__bank">Bank: {bank}</span>
          <span className="chosen__percent">Yillik foiz stavkasi: {percent}</span>
          <span className="chosen__percent">Har oyga: {chosenItems.rooms_per*chosenItems.area*percent?(chosenItems.rooms_per*chosenItems.area+chosenItems.rooms_per*chosenItems.area*percent/100)/(chosenItems.mortgage*12):0}  so'mdan</span>
          <span className="chosen__percent">Har yilga: {chosenItems.rooms_per*chosenItems.area*percent?(chosenItems.rooms_per*chosenItems.area+chosenItems.rooms_per*chosenItems.area*percent/100)/(chosenItems.mortgage):0} so'mdan</span>
        </div>
        <form action="" className={`order ${chosenCompany&&chosenComplex&&chosenRooms&&chosenMortgage&&chosenBank?'active':''}`} onSubmit={e=>{
          e.preventDefault();
          const {name, tel} = e.target.elements;
          fetch('https://uy-bozor.herokuapp.com/order', {
            method:'POST', 
            headers:{
              "Content-Type":"application/json"
            },
            body:JSON.stringify({
              name:name.value,
              tel:tel.value,
              companyId:chosenCompany,
              complexId:chosenComplex,
              roomsId:chosenRooms,
              mortgageId: chosenMortgage,
              bankId:chosenBank
            })

          })
          .then(res=>res.json())
          .then(data=>{
            if(data.status==200){
              asnwer.current.textContent = data.message
            } else{
              asnwer.current.textContent = data.message
            }
          })
        }}>
          <label htmlFor="" className="order__label">To'liq ismingiz: <input type="text" className="order__input" name="name" placeholder="Ism-familya..."/></label>
          <label htmlFor="" className="order__label">Telefon raqamingiz: <input type="tel" className="order__input" name="tel" placeholder="Telefon raqamingiz..."/></label>
          <button className="order__btn">Jo'nating</button>
          <span className="order__answer" ref={asnwer}></span>
          </form>
        
        </div>

      </header>
    </div>
  );
}

export default App;
