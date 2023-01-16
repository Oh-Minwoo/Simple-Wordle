import styled from "styled-components";
// import { useState, useRef, useEffect } from "react";

const StyledInput = styled.input`
  width: 50px;
  height: 50px;
  margin-left: 4px;
  margin-bottom: 10px;
  border-radius: 10px;
  font-size: 20px;
  text-align: center;
`;

interface Input {
  val: Array<string>;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  styles: object;
}

function Inputs({ val, onChange, styles }: Input) {
  return (
    <div style={{ textAlign: "center" }}>
      <StyledInput
        style={styles}
        type="text"
        maxLength={1}
        value={val[0]}
        onChange={onChange}
      />
      <StyledInput
        style={styles}
        type="text"
        maxLength={1}
        value={val[1]}
        onChange={onChange}
      />
      <StyledInput
        style={styles}
        type="text"
        maxLength={1}
        value={val[2]}
        onChange={onChange}
      />
      <StyledInput
        style={styles}
        type="text"
        maxLength={1}
        value={val[3]}
        onChange={onChange}
      />
      <StyledInput
        style={styles}
        type="text"
        maxLength={1}
        value={val[4]}
        onChange={onChange}
      />
    </div>
  );
}

export default Inputs;
