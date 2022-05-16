import React, { useState, useEffect } from "react";

// 변경이없음 -> 1에서 1 그대로
const CounterA = React.memo(({ count }) => {
  useEffect(() => {
    console.log(`Update - CountA : ${count}`);
  });
  return <div>{count}</div>;
});

//obj 객체이기 때문에 얕은비교 --> 콘솔이 찍힌다.
//얕은비교를 하지않도록 변경도 가능
const CounterB = React.memo(({ obj }) => {
  useEffect(() => {
    console.log(`Update - CountB : ${obj.count}`);
  });
  return <div>{obj.count}</div>;
});

//true 면 리렌더 x false 리렌더 o
const areEqual = (preProps, nextProps) => {
  return preProps.obj.count === nextProps.obj.count;
};

const MemoizedCounterB = React.memo(CounterB, areEqual);

const OptimizeTest = () => {
  const [count, setCount] = useState(1);
  const [obj, setObj] = useState({
    count: 1,
  });

  return (
    <div style={{ padding: 50 }}>
      <div>
        <h2>Count A</h2>
        <CounterA count={count} />
        <button onClick={() => setCount(count)}>A</button>
      </div>
      <div>
        <h2>Count B</h2>
        <MemoizedCounterB obj={obj} />
        <button
          onClick={() =>
            setObj({
              count: obj.count,
            })
          }
        >
          B
        </button>
      </div>
    </div>
  );
};

export default OptimizeTest;
