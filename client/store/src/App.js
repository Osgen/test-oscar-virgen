import React from 'react';
import logo from './logo.svg';
import axios from 'axios';
import './App.css';
import { link } from 'fs';


class App extends React.Component{

  state = {
    items:{},
    checkoutItems:[],
    total:0
  }

  componentDidMount() {

    axios.get(`http://localhost:5000/store`)
      .then((response)=>{
        this.setState({items:response.data});
      })
      .catch((err)=> {
        console.error(err);
      });
  }

  addToCheckout = (code)=>{
    let item ={};
    item[code] = this.state.items[code];//Create object expected by the API
    let checkoutList = this.state.checkoutItems;
    checkoutList.push(item);//Update list
    this.setState({checkoutItems:checkoutList});

    axios.post(`http://localhost:5000/store/checkout`,
      {data:this.state.checkoutItems}//Send list to the API
    )
      .then((response)=>{
        const total = response.data;
        this.setState(total);//Get total and update it
      })
      .catch((err)=> {
        console.error(err);
      });
  }

  generateItemsList = ()=>{
    return Object.entries(this.state.items).map((item, key)=>{
      return (
        <tr key={key}>
          <td>{item[1].name}</td>
          <td>{item[1].price}€</td>
          <td><button onClick={()=>{this.addToCheckout(`${item[0]}`)}}>Agregar</button></td>
        </tr>
      )
    });
  }

  generateCheckoutList = ()=>{
    return this.state.checkoutItems.map((item, key)=>{
      let itemValues = Object.values(item)[0];
      return (
        <tr key={key}>
          <td>{itemValues.name}</td>
          <td>{itemValues.price}€</td>
        </tr>
      )
    });
  }
    
  

  render(){
    return (
      <div className="App">
        <header className="App-header">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {this.generateItemsList()}
            </tbody>
          </table>

          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {this.generateCheckoutList()}
            </tbody>
            <tfoot>
              <tr>
                <th>Total</th>
                <th>{this.state.total}€</th>
              </tr>
            </tfoot>
          </table>
        </header>
      </div>
    )
  }
}

export default App;
