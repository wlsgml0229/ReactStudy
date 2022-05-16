import React, { useState, useEffect } from "react";

const TextView = React.memo(({ text }) => {
  useEffect(() => {
    console.log(`Update :: Text : ${text}`);
  });
  return <div>{text}</div>;
});

const CountView = React.memo(({ count }) => {
  useEffect(() => {
    console.log(`Update :: Count : ${count}`);
  });
  return <div>{count}</div>;
});

const OptimizeTest = () => {
  const [count, setCount] = useState(1);
  const [text, setText] = useState("");

  return (
    <div style={{ padding: 50 }}>
      <div>
        <h2>count</h2>
        <CountView count={count}></CountView>
        <button onClick={() => setCount(count + 1)}>+</button>
      </div>
      <div>
        <h2>Text</h2>
        <TextView text={text}></TextView>
        <input value={text} onChange={(e) => setText(e.target.value)} />
      </div>
    </div>
  );
};

export default OptimizeTest;
