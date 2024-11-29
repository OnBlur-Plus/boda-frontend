import { ImageSourcePropType } from 'react-native'

export const ACCIDENT_LEVEL = {
  LOW: 1,
  MEDIUM: 2,
  HIGH: 3,
} as const

export const ACCIDENT_LEVEL_LABEL: Record<
  (typeof ACCIDENT_LEVEL)[keyof typeof ACCIDENT_LEVEL],
  string
> = {
  [ACCIDENT_LEVEL.LOW]: '낮음',
  [ACCIDENT_LEVEL.MEDIUM]: '중간',
  [ACCIDENT_LEVEL.HIGH]: '높음',
}

export const ACCIDENT_TYPE = {
  NON_SAFETY_VEST: 'NON_SAFETY_VEST',
  NON_SAFETY_HELMET: 'NON_SAFETY_HELMET',
  FALL: 'FALL',
  USE_PHONE_WHILE_WORKING: 'USE_PHONE_WHILE_WORKING',
  SOS_REQUEST: 'SOS_REQUEST',
} as const

export const METADATA_BY_TYPE: Record<
  (typeof ACCIDENT_TYPE)[keyof typeof ACCIDENT_TYPE],
  { image: ImageSourcePropType; name: string }
> = {
  [ACCIDENT_TYPE.NON_SAFETY_VEST]: {
    image: require('../assets/image/1.png'),
    name: '재해 경고',
  },
  [ACCIDENT_TYPE.NON_SAFETY_HELMET]: {
    image: require('../assets/image/1.png'),
    name: '재해 경고',
  },
  [ACCIDENT_TYPE.USE_PHONE_WHILE_WORKING]: {
    image: require('../assets/image/1.png'),
    name: '재해 경고',
  },
  [ACCIDENT_TYPE.FALL]: {
    image: require('../assets/image/2.png'),
    name: '재해 발생 알림',
  },
  [ACCIDENT_TYPE.SOS_REQUEST]: {
    image: require('../assets/image/3.png'),
    name: '비상 상황 알림',
  },
}
