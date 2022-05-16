import { useMemo, useEffect, useRef, useState } from "react";
import "./App.css";
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";
import OptimizeTest from "./OptimizeTest";

function App() {
  // 일기 데이터 배열 저장 위해서 빈배열 설정
  const [data, setData] = useState([]);

  const dataId = useRef(0);

  const getData = async () => {
    const res = await fetch(
      "https://jsonplaceholder.typicode.com/comments"
    ).then((res) => res.json());

    //Math.random 을 정수로 바꿔주는 Math.floor 사용 0-4 + 1
    const initData = res.slice(0, 20).map((it) => {
      return {
        author: it.email,
        content: it.body,
        emotion: Math.floor(Math.random() * 5) + 1,
        created_date: new Date().getTime(),
        id: dataId.current++,
      };
    });

    setData(initData);
  };

  useEffect(() => {
    getData();
  }, []);

  const onCreate = (author, content, emotion) => {
    const created_date = new Date().getTime();
    const newItem = {
      author,
      content,
      emotion,
      created_date,
      id: dataId.current,
    };
    //다음 아이템 Id 값 추가
    dataId.current += 1;
    setData([newItem, ...data]);
  };

  const onRemove = (targetId) => {
    const newDiaryList = data.filter((it) => it.id !== targetId);
    setData(newDiaryList);
  };

  // 아이디 일치하지 않으면 수정대상이 아니기 떄문에 it 반환 ;
  // 일치하면 컨텐트를 새로운 컨텐트값으로 변경
  // 데이터를 수정하는 함수
  const onEdit = (targetId, newContent) => {
    setData(
      data.map((it) =>
        it.id === targetId ? { ...it, content: newContent } : it
      )
    );
  };

  const getDiaryAnalysis = useMemo(() => {
    const goodCount = data.filter((it) => it.emotion >= 3).length;
    const badCount = data.length - goodCount;
    const goodRatio = (goodCount / data.length) * 100;
    return { goodCount, badCount, goodRatio };
  }, [data.length]);
  // 비구조할당
  const { goodCount, badCount, goodRatio } = getDiaryAnalysis;

  return (
    <div className="App">
      <OptimizeTest></OptimizeTest>
      <DiaryEditor onCreate={onCreate} />
      <div>전체 일기: {data.length}</div>
      <div>기분 좋은 일기 개수: {goodCount}</div>
      <div>기분 나쁜 일기 개수: {badCount}</div>
      <div>기분 좋은 일기 비율: {goodRatio}</div>
      <DiaryList onRemove={onRemove} diaryList={data} onEdit={onEdit} />
    </div>
  );
}

export default App;
