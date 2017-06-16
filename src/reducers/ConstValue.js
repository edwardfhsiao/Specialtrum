import { AppNavigator } from '../navigators/index';

const firstAction = AppNavigator.router.getActionForPathAndParams('Index');
// const tempNavState = AppNavigator.router.getStateForAction(firstAction);
// const secondAction = AppNavigator.router.getActionForPathAndParams('Index');
const initialNavState = AppNavigator.router.getStateForAction(firstAction);

const DEFAULT_STATE = {
  articleList: [],
  article: {},
  nav: initialNavState,
  isShowAppNavigator: true
};

const toggleShowAppNavigator = (ref, bool, speed = 500) => {
  return !bool
    ? ref.fadeOut(speed).then(endState => {
        console.log(endState.finished ? 'bounce finished' : 'bounce cancelled');
      })
    : ref.fadeIn(speed).then(endState => {
        console.log(endState.finished ? 'bounce finished' : 'bounce cancelled');
      });
};

const ANIMATABLE_SPEED = 500;

export { DEFAULT_STATE, toggleShowAppNavigator, ANIMATABLE_SPEED };
