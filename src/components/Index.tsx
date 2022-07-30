import { Link } from "react-router-dom";
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useEffect, useState } from "react";
import { SushiDB, SushiJa } from '../types/SushiType'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import moment from 'moment'

export const Index = () => {
	const [sushis, setSushis] = useState<SushiDB[]>([])
	useEffect(() => {
		const getSushis = async () => {
			const docsRef = await getDocs(query(collection(db, 'sushi'), orderBy('date', 'desc')))
			const sushiArray:any[] = []
			docsRef.forEach((doc) => {
				let data = doc.data()
				sushiArray.push(data)
			})
			setSushis(sushiArray)
		}
		getSushis()
	}, [])
	/**
	 * 寿司の英語対応表
	 */
	const SUSHI_JA: SushiJa = {
		red: '赤身',
		white: '白身',
		shellfish: '甲殻類',
		shell: '貝',
		urchin: 'ウニ',
		blueBacked: '光もの',
		boiled: '煮物',
		roe: '魚卵',
	}
	const personObj:any = {
		1: 'ばぼちぇ',
		2: 'おまみ',
	}
	return (
		<>
			<h1>寿司ログ</h1>
			<Link to="/">寿司カウンター</Link>
			<br />
			<TableContainer component={Paper}>
				<Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
					<TableHead>
					<TableRow>
						<TableCell>名前</TableCell>
						<TableCell align="right">{SUSHI_JA.red}</TableCell>
						<TableCell align="right">{SUSHI_JA.white}</TableCell>
						<TableCell align="right">{SUSHI_JA.blueBacked}</TableCell>
						<TableCell align="right">{SUSHI_JA.roe}</TableCell>
						<TableCell align="right">{SUSHI_JA.boiled}</TableCell>
						<TableCell align="right">{SUSHI_JA.shell}</TableCell>
						<TableCell align="right">{SUSHI_JA.shellfish}</TableCell>
						<TableCell align="right">{SUSHI_JA.urchin}</TableCell>
						<TableCell align="right">合計</TableCell>
						<TableCell align="right">日付</TableCell>
					</TableRow>
					</TableHead>
					<TableBody>
					{sushis.map((sushi) => (
						<TableRow
							key={sushi.date}
							sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
							>
							<TableCell component="th" scope="row">{personObj[sushi.person]}</TableCell>
							<TableCell align="right">{sushi.red}</TableCell>
							<TableCell align="right">{sushi.white}</TableCell>
							<TableCell align="right">{sushi.blueBacked}</TableCell>
							<TableCell align="right">{sushi.roe}</TableCell>
							<TableCell align="right">{sushi.boiled}</TableCell>
							<TableCell align="right">{sushi.shell}</TableCell>
							<TableCell align="right">{sushi.shellfish}</TableCell>
							<TableCell align="right">{sushi.urchin}</TableCell>
							<TableCell align="right">{sushi.sum}</TableCell>
							<TableCell align="right">{moment(sushi.date).format('YYYY/MM/DD HH:mm')}</TableCell>
						</TableRow>
					))}
					</TableBody>
				</Table>
			</TableContainer>
		</>
	)
}
