import Company from './components/Company.jsx';

function App() {

  const comps =     
    [
      {name: "FaceBook", symbol: "FB", 
        sector: "Internet Software", 
        hq: "Menlo Park, California"},
      {name: "Alphabet Inc Class A", symbol: "GOOG", 
        sector: "Information Technology", 
        hq: "Mountain View, California"},
      {name: "Apple", symbol: "AAPL", 
        sector: "Information Technology", 
        hq: "Cupertino, California"},
      {name: "AT&T", symbol: "T", 
        sector: "Telecommunications Services", 
        hq: "Dallas, Texas"}
    ];

  return (
    <section  className="content box">
    { comps.map( (c,indx) => <Company data={c} key={indx}/>)  }
    </section>
  );

}

export default App
