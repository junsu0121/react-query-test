import { useRef } from "react";
import { useRecoilState, useResetRecoilState, useSetRecoilState } from "recoil";
import { category, select } from "./atoms";

function App() {
  // const [list, setList] = useRecoilState(data);
  // const resetTest = useResetRecoilState(data);
  const [list, setList] = useRecoilState(select);
  const [nowCategory, setNowCategory] = useRecoilState(category);
  const ref = useRef(null);

  const onClick = (e) => {
    setList(current => [...current, { id: Date.now(), subject: ref.current.value, category: nowCategory }]); // 불변성
  }

  const onChange = (e) => {
    setNowCategory(e.target.value);
  }

  return (
    <div>
      <select onChange={onChange}>
        <option value="음식">음식</option>
        <option value="스포츠">스포츠</option>
      </select>
      {list?.map((v, i) => {
        return <div key={i}>{v.subject}</div>
      })}
      <input type="text" ref={ref} />
      <button onClick={onClick}>추가</button>
    </div>
  );
}

export default App;
