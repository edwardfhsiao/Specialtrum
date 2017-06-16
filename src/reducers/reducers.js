import * as ACTION from '../actions';
import { DEFAULT_STATE } from './ConstValue';
import { AppNavigator } from '../navigators/index';

export function articleList(articleList = DEFAULT_STATE.articleList, action) {
  switch (action.type) {
    case ACTION.SET_ARTICLE_LIST:
      return action.articleList;
    default:
      return articleList;
  }
}

export function article(article = DEFAULT_STATE.article, action) {
  switch (action.type) {
    case ACTION.SET_ARTICLE:
      return action.article;
    default:
      return article;
  }
}

export function isShowAppNavigator(isShowAppNavigator = DEFAULT_STATE.isShowAppNavigator, action) {
  switch (action.type) {
    case ACTION.SET_IS_SHOW_APP_NAVIGATOR:
      return action.isShowAppNavigator;
    default:
      return isShowAppNavigator;
  }
}

export function nav(nav = DEFAULT_STATE.nav, action) {
  let nextNav;
  switch (action.type) {
    case ACTION.SET_NAV:
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.back(),
        nav
      );
    default:
      nextNav = AppNavigator.router.getStateForAction(action, nav);
      break;
  }
  return nextNav || nav;
}
