import React, { Component } from 'react';
import 'whatwg-fetch';

const br_key = {'0': 'Unknown', '1': 'Available!', '-1': 'Unavailable :('}
const br_color_key = {'0':'LightGrey', '1': 'Lime', '-1': 'OrangeRed' }

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bathrooms: {}
    };

    this.refresh = this.refresh.bind(this);
  }

  componentDidMount() {
    fetch('/api/br')
      .then(res => res.json())
      .then(json => {
        this.setState({
          bathrooms: json
        });
        console.log(this.state.bathrooms);
      });
  }

  refresh() {
    fetch('/api/br')
      .then(res => res.json())
      .then(json => {
        this.setState({
          bathrooms: json
        });
      });
  }



  render() {
    return (
      <>
        <p>Bathrooms:</p>

        <ul>
        <li style={{backgroundColor:br_color_key[this.state.bathrooms[0]]}}>BR 1: { br_key[this.state.bathrooms[0]] }</li>

        <li style={{backgroundColor:br_color_key[this.state.bathrooms[1]]}}>BR 2: { br_key[this.state.bathrooms[1]] } </li>

        <li style={{backgroundColor:br_color_key[this.state.bathrooms[2]]}}>BR 3: { br_key[this.state.bathrooms[2]] } </li>
        </ul>


        <button onClick={this.refresh}>Refresh</button>
      </>
    );
  }
}

export default Home;
