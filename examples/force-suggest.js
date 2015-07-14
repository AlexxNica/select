'use strict';

var React = require('react');
var Select = require('rc-select');
var Option = Select.Option;
require('rc-select/assets/index.css');
var jsonp = require('jsonp');
var querystring = require('querystring');

var Search = React.createClass({
  getInitialState() {
    return {
      data: []
    }
  },

  fetchData(value) {
    jsonp('http://suggest.taobao.com/sug?' + querystring.encode({
      code: 'utf-8',
      q: value
    }), (err, d) => {
      var result = d.result;
      var data = [];
      result.forEach((r)=> {
        data.push({
          value: r[0],
          text: r[0]
        });
      });
      this.setState({
        data: data
      });
    });
  },

  handleChange(value) {
    console.log('select ', value);
  },

  render() {
    var data = this.state.data;
    var options = data.map((d) => {
      return <Option key={d.value}><i>{d.text}</i></Option>;
    });
    return <div>
      <h2>force suggest</h2>
      <div>
        <Select onSearch={this.fetchData}
          renderDropdownToBody={location.href.indexOf('renderDropdownToBody') !== -1}
          optionLabelProp="children"
          style={{width:500}}
          onChange={this.handleChange}
          filterOption={false}>
        {options}
        </Select>
      </div>
    </div>;
  }
});

React.render(<Search />, document.getElementById('__react-content'));
