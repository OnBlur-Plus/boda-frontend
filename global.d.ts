import { AppStackParamList } from './src/App'

declare global {
  namespace ReactNavigation {
    interface RootParamList extends AppStackParamList {}
  }
}
