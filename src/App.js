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
// Sets up initial data with USD as base 
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
        availBtns: Object.entries(data.rates),
      });
      console.log('THIS ONE', this.state.availBtns)
      console.log(this.state.selectedBtns)
  });
  }
// Changes data to typed in base 
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
        }); 

        // 404 (not working) might try and find time to ask about this
        if (!data.main) {
          this.setState({
            location: "Not found.",
          });
          return;
        };
      });
    }

// Hooks up input typing
    onInputChange = (ev) => {
      let value = ev.target.value;
      console.log('getting a new value!', value);
      this.setState({
        baseSet: value,
      });
    }
//Moves button from top to bottom, "activated," section
    onBtnSelect(index){
      let availBtns = this.state.availBtns.slice();
      let selectedBtns = this.state.selectedBtns.slice();
      let mvBtn = availBtns[index];
      selectedBtns.push(mvBtn);
      availBtns.splice(index,1);
      this.setState({
        availBtns : availBtns,
        selectedBtns: selectedBtns,
      });
      console.log('this.state.availablebuttons', this.state.availablebuttons);
      console.log('selected btns', this.state.selectedBtns)
    }
  //Moves buttons back to top, "inactive," state
   onBtnDeselect(index){
      let selectedBtns = this.state.selectedBtns.slice();
      let availBtns = this.state.availBtns.slice();
      let mvBtn = selectedBtns[index];
      availBtns.push(mvBtn);
      selectedBtns.splice(index, 1);
      this.setState({
        availBtns : availBtns,
        selectedBtns: selectedBtns,
      });
      console.log('this.state.availablebuttons', this.state.availablebuttons);
      console.log('selected btns', this.state.selectedBtns)
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
            onChange={this.onInputChange}/>
        <button onClick={this.onBaseChange}>Select</button>
      </div>
     </div>

     <div className="Chart-buttonSpace">
            {
              (this.state.availBtns).map((ctry, index) => ( 
                <div>
                    <button onClick={() => this.onBtnSelect(index)} class="Chart-navButton">
                        {ctry[0]}
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
                this.state.selectedBtns.map((ctry) => (
                    <div className="Chart-bar"style= {{height: (this.state.rates[ctry[0]] * 10) + 'px'}}>
                    {ctry[0]} {(ctry[1]).toFixed(2)}
                    </div>               
                ))
            }
      </div>
       <div className="Chart--buttonBtm">
            {
              this.state.selectedBtns.map((ctry, index) => ( 
                <div>
                    <button onClick={() => this.onBtnDeselect(index)} class="Chart-navButton">
                        {ctry[0]}
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
