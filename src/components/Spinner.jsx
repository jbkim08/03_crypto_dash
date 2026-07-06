import { BarLoader } from "react-spinners"; // 오픈소스 스피너 라이브러리에서 BarLoader를 가져옵니다.

// CSS 스타일을 JS 객체 형식으로 선언합니다.
const override = {
  display: "block",
  margin: "0 auto 50px auto",
};

// color(색상)와 size(크기)를 부모로부터 전달받을 수 있도록(Props) 기본값과 함께 설정합니다.
const Spinner = ({ color = "blue", size = "150" }) => {
  return (
    <div>
      <BarLoader
        color={color}
        size={size}
        cssOverride={override}
        aria-label="로딩 중..." // 시각 장애인을 위한 리더기용 텍스트 추가
      />
    </div>
  );
};

export default Spinner;
