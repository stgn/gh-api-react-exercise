import React, { Component } from 'react';
import styled from 'styled-components';

import { Button, TextInput } from './ui.js';

const Form = styled.form`
  margin-bottom: var(--pad);
  display: flex;
`;

const SearchTextInput = styled(TextInput)`
  flex: 1;
  margin-right: 1rem;
`;

class SearchForm extends Component {
  state = { value: '' }

  handleChange = e => {
    this.props.onChange(e.target.value);
    this.setState({ value: e.target.value });
  }

  handleSubmit = e => {
    this.props.onSubmit(this.state.value);
    e.preventDefault();
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <SearchTextInput 
          value={this.state.value} 
          onChange={this.handleChange}
        />
        <Button>Search</Button>
      </Form>
    );
  }
}

export default SearchForm;
