import { Grid, Button, ButtonGroup, Radio, RadioGroup } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import { db } from '../firebase/firebase';
import { collection, addDoc } from "firebase/firestore";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Link } from 'react-router-dom';
import { SushiObj, SushiDB } from '../types/SushiType'
import { SUSHI_JA, PERSON, PERSON_NAME, SUSHI_CACHE, SUM_CACHE } from '../const/const'
import moment from 'moment'

export const Counter = () => {
    // ステイト用のオブジェクトを初期データ
    const sushiObj: SushiObj = {
        red: 0, // 赤身
        white: 0, // 白身
        shellfish: 0, // 甲殻類
        shell: 0, // 貝
        urchin: 0, // ウニ
        blueBacked: 0, // 光もの
        boiled: 0, // 煮物
        roe: 0, // 魚卵
    }
	// 寿司
    const [values, setValues] = useState(sushiObj)
	// 人物区分値
	const [personVal, setPersonVal] = useState(1)
	// 寿司の合計
	const [sumVal, setSumVal] = useState(0)
	const changePersonVal = (event: any) => {
		setPersonVal(Number(event.target.value))
	}
    // 寿司1貫のコンポーネント
    const buttons = (neta: keyof SushiObj) => {
        return <ButtonGroup size="large" aria-label="large button group primary">
			<Button key='sub' color='error' variant='contained' onClick={() => {
				if (values[neta] > 0) {
					const newValues = {...values, [neta]: values[neta] - 1}
					const newSum = sumVal - 1
					setValues(newValues)
					setSumVal(newSum)
					setCache(newValues, newSum)
				}
			}}>-</Button>
			<Button key='sushi' size='large'
			style={{width : '140px'}}
			>{values[neta]}貫({SUSHI_JA[neta]})</Button>
			<Button key='add' color='primary' variant='contained' onClick={() => {
				// useStateはスコープ内だと更新が反映できないので変数で保持する。
				const newValues = {...values, [neta]: values[neta] + 1}
				const newSum = sumVal + 1
				setValues(newValues)
				setSumVal(newSum)
				setCache(newValues, newSum)
			}}>+</Button>
        </ButtonGroup>
    }

	/**
	 * ローカルストレージを削除する。
	 * @param sushiobj
	 * @param sum
	 */
	const setCache = (sushiobj: SushiObj, sum: number) => {
		localStorage.setItem(SUSHI_CACHE, JSON.stringify(sushiobj))
		localStorage.setItem(SUM_CACHE, String(sum))
	}

	/**
	 * firestoreにデータを送る。
	 */
	const submitData = async () => {
		const dateAddedValue: SushiDB = {...values, person: personVal, sum: sumVal, date: moment().format()}
		try {
		  const docRef = await addDoc(collection(db, "sushi"), dateAddedValue);
		  console.log("Document written with ID: ", docRef.id);
		  // 寿司のデータをリセットする。
		  setValues(sushiObj)
		  setSumVal(0)
		  setCache(sushiObj, 0)
		  alert('送信に成功しました。')
		} catch (e) {
		  console.error("Error adding document: ", e);
		}
	}

	useEffect(() => {
		let cache    = localStorage.getItem(SUSHI_CACHE) ? localStorage.getItem(SUSHI_CACHE) : JSON.stringify(sushiObj)
		let sumCache = localStorage.getItem(SUM_CACHE) ? localStorage.getItem(SUM_CACHE) : 0
		if (cache === null) {
			cache = JSON.stringify(sushiObj)
		}
		if (sumCache === null) {
			sumCache = 0
		}
		const values: SushiObj = JSON.parse(cache)
		const sum = sumCache
		setValues(values)
		setSumVal(Number(sum))
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

    return (
        <div>
			<Link to="/index">寿司ログ</Link>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    '& > *': {
                        m: 1,
                    },
                }}
            >
				{buttons('red')}
				{buttons('white')}
				{buttons('shellfish')}
				{buttons('shell')}
				{buttons('urchin')}
				{buttons('blueBacked')}
				{buttons('boiled')}
				{buttons('roe')}
				<Box sx={{p: 1}}>現在{sumVal}貫</Box>
            </Box>
			<Grid container justifyContent='center' spacing='10'>
				<RadioGroup row aria-label="person" name="person" value={personVal} onChange={changePersonVal}>
					<FormControlLabel value={PERSON.momose} control={<Radio color="primary" />} label={PERSON_NAME[PERSON.momose]} />
					<FormControlLabel value={PERSON.takeshi} control={<Radio color="primary" />} label={PERSON_NAME[PERSON.takeshi]} />
				</RadioGroup>
			</Grid>
			<Grid container justifyContent='center' spacing='10'>
				<Grid item xs={4} textAlign='right'>
					<Button key='reset' color='info' variant='contained'
						onClick={() => {
							setValues(sushiObj)
							setSumVal(0)
							setCache(sushiObj, 0)
						}}
					>リセット</Button>
				</Grid>
				<Grid item xs={4} textAlign='left'>
					<Button key='reset' color='success' variant='contained'
						onClick={submitData}
					>登録</Button>
				</Grid>
			</Grid>
        </div>
    )
}
