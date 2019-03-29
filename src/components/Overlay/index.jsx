import React from "react";
import {Wrapper} from "./styles";

export default class Overlay extends React.Component {
  render() {
    return (
      <Wrapper onClick={this.props.action}/>
    );
  }
}
