/**
 * 寿司カウンターで使用するインターフェースや型
 */

/**
 * 寿司の貫数オブジェクトの型
 */
export interface SushiObj {
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

/**
 * Firestoreの寿司の貫数オブジェクトの型
 */
export interface SushiDB {
	person: number, // 人物
    red: number, // 赤身
    white: number, // 白身
    shellfish: number, // 甲殻類
    shell: number, // 貝
    urchin: number, // ウニ
    blueBacked: number, // 光もの
    boiled: number, // 煮物
    roe: number, // 魚卵
	date: string, // 日付
	sum: number,
}

export interface SushiJa {
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

export interface Person {
	takeshi: string,
	momose: string
}
