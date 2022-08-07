import { Link } from "react-router-dom";
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import { collection, query, where, getDocs, limit } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useState } from "react";
import { SUSHI_JA, PERSON_NAME } from "../const/const";
import moment from 'moment'
// 円グラフの色
const COLORS = [
	'#CCCCFF',
	'#99CCFF',
	'#C0C0C0',
	"#0088FE",
	"#00C49F",
	"#FFBB28",
	"#FF8042",
	'#FF1A6F'
];
// 円グラフのコンポーネントを囲むdiv
const SContainer = styled.div`
	margin: auto;
	width: 400px;
	height: 400px;
	font-family: sans-serif;
	text-align: center;
`
// ステイト用のオブジェクトを初期データ
const sushiObj = [
	{ name: SUSHI_JA.red,        value: 0 },
	{ name: SUSHI_JA.white,      value: 0 },
	{ name: SUSHI_JA.shellfish,  value: 0 },
	{ name: SUSHI_JA.shell,      value: 0 },
	{ name: SUSHI_JA.urchin,     value: 0 },
	{ name: SUSHI_JA.blueBacked, value: 0 },
	{ name: SUSHI_JA.boiled,     value: 0 },
	{ name: SUSHI_JA.roe,        value: 0 },
]
export const Chart = () => {
	// 動的なchart以下URLのパラメータ取得
	const params = useParams()
	// 寿司
    const [data, setData]       = useState(sushiObj)
    const [date, setDate]       = useState()
    const [sum, setSum]         = useState()
    const [person, setPerson]   = useState('')
	const findSushiData = async () => {
		// 該当の日付の寿司のデータを取得する。
		const docsRef = await getDocs(query(collection(db, 'sushi'), where('date', '==', params.date), limit(1)))
		let sushiData
		docsRef.forEach((doc) => {
			sushiData = doc.data()
			const data = [
				{ name: SUSHI_JA.red,        value: sushiData.red },
				{ name: SUSHI_JA.white,      value: sushiData.white },
				{ name: SUSHI_JA.shellfish,  value: sushiData.shellfish },
				{ name: SUSHI_JA.shell,      value: sushiData.shell },
				{ name: SUSHI_JA.urchin,     value: sushiData.urchin },
				{ name: SUSHI_JA.blueBacked, value: sushiData.blueBacked },
				{ name: SUSHI_JA.boiled,     value: sushiData.boiled },
				{ name: SUSHI_JA.roe,        value: sushiData.roe },
			];
			setData(data)
			setDate(sushiData.date)
			setSum(sushiData.sum)
			setPerson(sushiData.person)
		})
	}
	findSushiData()
	return (
		<SContainer>
			<div>名前：{PERSON_NAME[person]}</div>
			<div>日付：{moment(date).format('YYYY/MM/DD HH:mm')}</div>
			<div>合計：{sum}</div>
			<Link to="/index">閉じる</Link>
			<PieChart width={400} height={400} >
			<Pie
				data={data}
				cx={200}
				cy={150}
				label
				outerRadius={80}
				fill="#8884d8"
				dataKey="value"
			>
				{data.map((entry, index) => (
				<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
				))}
			</Pie>
			<Tooltip />
			</PieChart>
		</SContainer>
	);
}
