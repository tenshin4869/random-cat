import { GetServerSideProps, NextPage } from "next";
import { useEffect, useState } from "react";

//型注釈
type Props = {
  initialImageUrl: string;
};
//ページコンポーネント関数にpropsを受け取る引数を追加する
const IndexPage: NextPage<Props> = ({ initialImageUrl }) => {
  //useStateを使って状態を定義する
  const [imageUrl, setImageUrl] = useState(initialImageUrl);
  const [lording, setLoading] = useState(true);

  //クライアントサイドで取得
  //   useEffect(() => {
  //     fetchImage().then((newImage) => {
  //       setImageUrl(newImage.url);
  //       setLoading(false);
  //     });
  //   }, []);

  //ボタンをクリックしたときに画像を読み込む処理
  const handleClick = async () => {
    setLoading(true);
    const newImage = await fetchImage();
    setImageUrl(newImage.url);
    setLoading(false);
  };

  return (
    <div>
      <button onClick={handleClick}>他のにゃんこも見る</button>
      <div>{lording || <img src={imageUrl} title="cat" />}</div>
    </div>
  );
};

export default IndexPage;

//サーバーサイドで実行する処理
export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const image = await fetchImage();
  return {
    props: {
      initialImageUrl: image.url,
    },
  };
};

type Image = {
  url: string;
};

const fetchImage = async (): Promise<Image> => {
  const res = await fetch("https://api.thecatapi.com/v1/images/search");
  const images = await res.json();
  console.log(images);
  return images[0];
};
