/*
  WORDLE GAME
*/
import { useState, useEffect, useRef } from "react";
import Inputs from "../components/Inputs";

interface InputItem {
  id: number;
  item: Array<string>;
}

export default function Main() {
  const nextID = useRef<number>(1); // input의 id값 저장하는 useRef -> input 사이의 차이 두기 위함
  const [inputItems, setInputItems] = useState<InputItem[]>([
    {
      id: 0,
      item: [],
    },
  ]); // id와 입력값 useState로 저장
  const [answer, setAnswer] = useState<string[]>([]); //API로 받아온 답 단어 저장하는 useState
  const [button, setButton] = useState("Submit");
  const [disabled, setDisabled] = useState(false);

  const getWord = async () => {
    // 랜덤 단어 API에서 5자리 영어단어 하나 fetch하는 함수
    const word = await (
      await fetch(`https://random-word-api.herokuapp.com/word?length=5`)
    ).json(); // 비동기로 fetch하는 함수 (형식 알아두면 좋을 듯!)
    setAnswer(word[0].split("")); //유저가 입력한 답과 비교 위해 split해서 answer 변수에 저장
    console.log(word[0].split(""));
  };
  useEffect(() => {
    // 첫 랜더링 때만 getWord 실행
    getWord();
  }, []);

  const addInput = () => {
    // input element 추가하는 함수, submit 버튼 클릭했을 때 실행
    const input = {
      id: nextID.current,
      item: [],
    }; // id만 업데이트해서,
    setInputItems([...inputItems, input]); // inputItmes에 저장 -> 새로운 input element를 위한 준비
    nextID.current += 1;
  };

  const onChange = (event: any, index: number) => {
    if (inputItems[index].item.length > 5) return;
    if (index > inputItems.length) return; // index 변화로 인한 에러 처리
    const value = event.target.value;
    const inputItemsCopy: InputItem[] = JSON.parse(JSON.stringify(inputItems)); // inputItems 복사본 생성
    inputItemsCopy[index].item.push(value); // 복사본의 item 업데이트

    setInputItems(inputItemsCopy); // 복사본을 setInputItems를 이용해 원본에 저장
  };
  const onClick = () => {
    if (nextID.current > 5) {
      alert("you lose");
      setDisabled(true);
      return;
    }
    const letters = inputItems[nextID.current - 1].item;
    console.log(letters);
    let i = 0;
    for (let letter of letters) {
      let res = comparing(letter, answer, i);
      switch (res) {
        case true:
          console.log(`${i + 1}th character is correct!`);
          break;
        case false:
          console.log(
            `${i + 1}th character is not correct but exists in the answer`
          );
          break;
        default:
          console.log(`${i + 1}th character doesn't exist in the answer...`);
      }
      i = i + 1;
    }
    addInput();
  };
  return (
    <div className="App">
      <h1>Wordle</h1>
      {inputItems.map((inputItem, index) => (
        <Inputs
          styles={{ backgroudnColor: "white" }}
          key={index}
          val={inputItem.item}
          onChange={(e) => onChange(e, index)}
        />
      ))}
      <button onClick={onClick} disabled={disabled}>
        {button}
      </button>
      <div>
        <button onClick={() => window.location.reload()}>New Game</button>
      </div>
    </div>
  );
}

function comparing(input: string, answer: Array<string>, index: number) {
  let res = null;
  if (input === answer[index]) {
    res = true;
  } else {
    for (let j = 0; j < answer.length; j++) {
      if (input === answer[j]) {
        res = false;
      }
    }
  }
  return res;
}
