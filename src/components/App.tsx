import { AppBar, Grid, Button, ButtonGroup, Toolbar, Typography, Radio, RadioGroup } from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';
import { db } from '../firebase/firebase';
import { collection, addDoc } from "firebase/firestore";
import FormControlLabel from "@mui/material/FormControlLabel";


/**
 * 寿司の貫数オブジェクトの型
 */
interface SUSHIOBJ {
    red: number, // 赤身
    white: number, // 白身
    shellfish: number, // 甲殻類
    shell: number, // 貝
    urchin: number, // ウニ
    blueBacked: number, // 光もの
    boiled: number, // 煮物
    roe: number, // 魚卵
	[key: string]: number
}

interface SUSHIJA {
	red: string,
	white: string,
	shellfish: string,
	shell: string,
	urchin: string,
	blueBacked: string,
	boiled: string,
	roe: string,
	[key: string]: string
}

interface PERSON_OBJ {
	takeshi: string,
	momose: string
}

/**
 * 寿司の英語対応表
 */
const SUSHI_JA: SUSHIJA = {
    red: '赤身',
    white: '白身',
    shellfish: '甲殻類',
    shell: '貝',
    urchin: 'ウニ',
    blueBacked: '光もの',
    boiled: '煮物',
    roe: '魚卵',
}

export const App = () => {
    // ステイト用のオブジェクト
    const sushiObj: SUSHIOBJ = {
        red: 0, // 赤身
        white: 0, // 白身
        shellfish: 0, // 甲殻類
        shell: 0, // 貝
        urchin: 0, // ウニ
        blueBacked: 0, // 光もの
        boiled: 0, // 煮物
        roe: 0, // 魚卵
    }
	const personObj: PERSON_OBJ = {
		takeshi: "2",
		momose: "1"
	}
    const [values, setValues] = useState(sushiObj)
	const [personVal, setPersonVal] = useState(1)
	const changePersonVal = (event: any) => {
		setPersonVal(Number(event.target.value))
	}
    // 寿司1貫のコンポーネント
    const buttons = (neta: keyof SUSHIOBJ) => {
        return <ButtonGroup size="large" aria-label="large button group primary">
			<Button key='sub' color='error' variant='contained' onClick={() => {
				if (values[neta] > 0) {
					setValues({...values, [neta]: values[neta] - 1})
				}
			}}>-</Button>
			<Button key='sushi' size='large'
			style={{width : '140px'}}
			>{values[neta]}貫({SUSHI_JA[neta]})</Button>
			<Button key='add' color='primary' variant='contained' onClick={() => {
				setValues({...values, [neta]: values[neta] + 1})
			}}>+</Button>
        </ButtonGroup>
    }

	const sum = () => {
		let sum = 0
		Object.keys(sushiObj).forEach(function (key) {
			sum = values[key] + sum
		})
		return sum
	}

	const getFullDate = () => {
		const today = new Date()
		const month = ('0' + (today.getMonth() + 1)).slice(-2)
		const date  = ('0' + today.getDate()).slice(-2)
		const hour  = today.getHours()
		const minute = today.getMinutes()
		return Number(today.getFullYear() + month + date + hour + minute)
	}

	/**
	 * firestoreにデータを送る。
	 */
	const submitData = async () => {
		const dateAddedValue = values
		dateAddedValue.date = getFullDate()
		dateAddedValue.person = personVal
		try {
		  const docRef = await addDoc(collection(db, "sushi"), dateAddedValue);
		  console.log("Document written with ID: ", docRef.id);
		  // 寿司のデータをリセットする。
		  setValues(sushiObj)
		  alert('送信に成功しました。')
		} catch (e) {
		  console.error("Error adding document: ", e);
		}
	}

    return (
        <div>
            <AppBar position='relative' color='primary'>
                <Toolbar>
                    <Typography variant='h6' color='inherit' noWrap alignSelf='center'>
                    &#x1f363;寿司カウンター&#x1f363; 食べた寿司をカウントしよう
                    </Typography>
                </Toolbar>
            </AppBar>
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
				<Box
					sx={{
						p: 1,
					}}
				>現在{sum()}貫
				</Box>
            </Box>
			<Grid container justifyContent='center' spacing='10'>
				<RadioGroup row aria-label="person" name="person" value={personVal} onChange={changePersonVal}>
					<FormControlLabel value={personObj.momose} control={<Radio color="primary" />} label="ももちぇ" />
					<FormControlLabel value={personObj.takeshi} control={<Radio color="primary" />} label="おたけ" />
				</RadioGroup>
			</Grid>
			<Grid container justifyContent='center' spacing='10'>
				<Grid item xs={4} textAlign='right'>
					<Button key='reset' color='info' variant='contained'
						onClick={() => {setValues(sushiObj)}}
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
