import React, { useEffect, useState } from "react";

const Lifecycle = () => {
  // 카운트
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");

  //component Mount 되는 시점만 작동
  // 의존성배열을 빈배열로 설정
  useEffect(() => {
    console.log("Mount!");
  }, []);

  //Update 할때
  //리렌더링 --> 업데이트
  // dependency Array 전달하지 않으면 된다.
  useEffect(() => {
    console.log("Update");
  });

  //count가 변경되는 순간 콜백함수 호출
  //감지하고싶은 값만 감지하여 사용할 수 있음
  useEffect(() => {
    console.log(`count is Update : ${count}`);
    if (count > 5) {
      alert("count가 5를 넘었습니다. 따라서 1로 초기화 합니다.");
      setCount(1);
    }
  }, [count]);

  //text가 변경되는 순간 콜백함수 호출
  useEffect(() => {
    console.log(`text is Update : ${text}`);
  }, [text]);

  return (
    <div style={{ padding: 20 }}>
      <div>
        {count}
        <button onClick={() => setCount(count + 1)}>+</button>
      </div>
      <div>
        <input value={text} onChange={(e) => setText(e.target.value)} />
      </div>
    </div>
  );
};

export default Lifecycle;
