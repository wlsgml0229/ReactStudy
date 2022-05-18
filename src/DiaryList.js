import { useContext } from "react";
import { DiaryStateContext } from "./App";
import DiaryItem from "./DiaryItem";
//프롭 { onEdit, diaryList, onRemove }
const DiaryList = () => {
  //context 기능을 통해 값을 받아옴
  const diaryList = useContext(DiaryStateContext);
  return (
    <div className="DiaryList">
      <h2>일기 리스트</h2>
      <h4>{diaryList.length}개의 일기가 있습니다.</h4>
      <div>
        {diaryList.map((it) => (
          <DiaryItem key={it.id} {...it} />
        ))}
      </div>
    </div>
  );
};
//리스트에 각각에 prop은 key prop을 받아야한다.
//자식요소의 최상의 태그에 key 값을 넣어줌
//스프레드 연산자로 props 전달
// 딱히 구분없다면 idx 를 사용할 수 있음 하지만 수정, 삭제 등 인덱스순서가 바뀌면 문제가 생길 수 있음
// undefined 로 전달될거같은 props에 기본값으로 설정.
DiaryList.defaultProps = {
  diaryList: [],
};

export default DiaryList;
