import { SushiJa, Person } from '../types/SushiType'

/**
 * 既定値などはこのファイルで管理する。
 */

/**
 * 寿司の英語対応表
 */
export const SUSHI_JA: SushiJa = {
    red: '赤身',
    white: '白身',
    shellfish: '甲殻類',
    shell: '貝',
    urchin: 'ウニ',
    blueBacked: '光もの',
    boiled: '煮物',
    roe: '魚卵',
}

/**
 * 人物の区分値
 */
export const PERSON: Person = {
	takeshi: '2',
	momose: '1',
}

/**
 * 人物名
 */
export const PERSON_NAME: any = {
	1: 'ばぼちぇ',
	2: 'おまみ',
}

/**
 * 寿司データのキャッシュキー名
 */
export const SUSHI_CACHE = 'sushi_cache_key'

/**
 * 寿司の合計のキャッシュキー名
 */
export const SUM_CACHE = 'sum_cache_key'
