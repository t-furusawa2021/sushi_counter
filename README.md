## 寿司カウンター
寿司食べ放題で寿司をカウントするためのReactのアプリ。
登録ボタンを押すとfirestoreにカウントした寿司のデータが保存される。

### 寿司カウンター
寿司をカウントできる。ローカルストレージにキャッシュを保存するのでリロードしてもデータが消えない。
ラジオボタンで人物を切り替えて保存する。
![screencapture-localhost-3000-2022-08-30-20_53_05](https://user-images.githubusercontent.com/78186758/187429939-ceddbc81-0856-42ea-b12d-ac0bab440ac2.png)

### 寿司ログ
登録した寿司のカウントをFirestoreから取得して一覧表示する。日付で降順で表示する。
<img width="957" alt="screencapture-localhost-3000-index-2022-08-30-20_54_06" src="https://user-images.githubusercontent.com/78186758/187430878-0d6b1e19-456a-48a3-97fa-32a433fcec1e.png">

### 寿司グラフ
寿司の円グラフを表示して食べた比率をグラフィカルに表示できる。(Recharts使用)
![screencapture-localhost-3000-index-chart-2022-07-31T12-37-52-09-00-2022-08-30-20_56_26](https://user-images.githubusercontent.com/78186758/187430610-05011169-4122-4c9c-94e6-20fd6749e4da.png)

### 主な使用技術
##### フロント
- React
- TypeScript
- Material-UI
- Recharts
##### バックエンド
- DB
	- Firebase Cloud Firestore
##### サーバー
- Firebase Hosting
https://sushi-counter-853d9.web.app/
