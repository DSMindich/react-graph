import React, { Component } from 'react';
import './App.css';
import './style.css';

class App extends Component {

  state = {
    baseSet : "USD",
    currentcy : "USD",
    rates : [],
    availBtns: [],
    selectedBtns:[],
  }
// Step 1: make onBtnSelect add the currency to the selectedBars array
// Step 2: make onBtnSelect remove the currency from the selectedBars array if it's already there
// Step 3: make bars only display in render function IF they appear in selectedBars

componentDidMount(){
  this.dofetch()
  
}

 dofetch(){
  let currency = this.state.baseSet
    this.setState({
      currentcy: currency,
    });  
  const url = "https://api.exchangeratesapi.io/latest?base=" + currency
  fetch(url)
    .then(response => response.json())
    .then(data => {
      console.log("Got the data!");
      console.log(data.rates);
      this.setState({
        rates : data.rates,
        availBtns: data.rates,
      });
      console.log(this.state.availBtns)
      console.log(this.state.selectedBtns)
  });
  }

  onBaseChange = () => {
    console.log('hitting refresh', this.state.baseSet);
    let currency = this.state.baseSet
    this.setState({
      currentcy: currency,
    });
    const url = "https://api.exchangeratesapi.io/latest?base=" + currency
    fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log('receiving data', data);
        this.setState({
          rates: data.rates,
          availBtns: data.rates
        }); 
        // console.log("testing");
        // console.log(this.state.rates);
        // const baseList = Object.keys(this.state.rates);
        // const ratesList = Object.entries(this.state.rates);
        // console.log("Base List...", baseList);
        // console.log("Rates List...", ratesList);
        // this.setState({
        //   countryabr: baseList
        // }); 
        // console.log("is this an array?",this.state.countryabr)

        

        // 404 (not working)
        if (!data.main) {
          this.setState({
            location: "Not found.",
          });
          return;
        };
      });
    }

    onInputChange = (ev) => {
      let value = ev.target.value;
      console.log('getting a new value!', value);
      this.setState({
        baseSet: value,
      });
    }

    onBtnSelect(ctry){
      let selectedBtns = this.state.selectedBtns.slice();
      let availBtns = Object.keys(this.state.availBtns).slice(ctry);
      const btn = availBtns[ctry];
      console.log(btn);
      selectedBtns.push(btn);
      console.log(availBtns);
      availBtns.splice(btn, 1);
      this.setState({
        availBtns : availBtns,
        selectedBtns: selectedBtns,
      });
      console.log(this.state.availBtns);
      console.log(this.state.selectedBtns)
    }
  
 
   onBtnDeselect(ctry){
      let selectedBtns = this.state.selectedBtns.slice();
      let availBtns = Object.keys(this.state.availBtns).slice(ctry);
      const btn = availBtns[ctry];
      availBtns.push(btn);
      selectedBtns.splice(btn, 1);
      this.setState({
        availBtns : availBtns,
        selectedBtns: selectedBtns,
      });
      console.log(this.state.availBtns);
      console.log(this.state.selectedBtns)
    }
  
  render() {
  return (
    <div className="App">

    <div className="Container">
     <div className="NavBuff"></div>

     <div className="Nav">
      <div className="Nav-item">
       <a href="App.js">Currency Exchange</a>
      </div>
      <div className="Nav-search"> Set base currency:
      <input placeholder="Enter Currency"
            value={this.state.baseSet} 
            onChange={this.onInputChange}/>
   <button onClick={this.onBaseChange}>Select</button>
      </div>
     </div>

     <div className="Chart-buttonSpace">
     {
              Object.keys(this.state.availBtns).map((ctry) => ( 
                <div>
                    <button onClick={() => this.onBtnSelect(ctry)} class="Chart-navButton">
                        {ctry}
                    </button>
                </div>
              ))
            } 
          </div>

     <div className="Chart-header">
            <p> Exchange Rate of 1 {this.state.currentcy} in Other Countries</p>
     </div> 
     <div className="Chart"> 
              {
                Object.keys(this.state.selectedBtns).map((country) => (
                    <div className="Chart-bar"style= {{height: this.state.rates[country] * 10 + "px"}}>
                    {country}
                    </div>               
                ))
            }
</div>
<div className="Chart--buttonBtm">
     {
              Object.keys(this.state.selectedBtns).map((ctry) => ( 
                <div>
                    <button onClick={() => this.onBtnDeselect(ctry)} class="Chart-navButton">
                        {ctry}
                    </button>
                </div>
              ))
            } 
          </div>
    </div>
    </div>
  );
}
}
export default App;
