import styled from "styled-components";

type Input = {
  val: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  text: string;
};

function Inputs({ val, onChange, text }: Input) {
  return (
    <div>
      <input
        type="text"
        maxLength={5}
        value={val}
        onChange={onChange}
        placeholder={text}
      />
    </div>
  );
}

export default Inputs;
