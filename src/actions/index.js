import { PATH } from '../common/path';
import { AlertIOS } from 'react-native';

export const SET_ARTICLE_LIST = 'SET_ARTICLE_LIST';
export const setArticleList = articleList => ({
  type: SET_ARTICLE_LIST,
  articleList
});

export const SET_ARTICLE = 'SET_ARTICLE';
export const setArticle = article => ({
  type: SET_ARTICLE,
  article
});

export const SET_NAV = 'SET_NAV';
export const setNav = nav => ({
  type: SET_NAV,
  nav
});

export const SET_IS_SHOW_APP_NAVIGATOR = 'SET_IS_SHOW_APP_NAVIGATOR';
export const setIsShowAppNavigator = isShowAppNavigator => ({
  type: SET_IS_SHOW_APP_NAVIGATOR,
  isShowAppNavigator
});

export const fetchArticle = (id, page) => (dispatch, getState) => {
  debugger;
  let article;
  let state = getState();
  let { articleList } = state;
  if (articleList.length <= 0) {
    fetchArticlesApi(page, state.perPage)
      .then(response => {
        if (response.code === 0) {
          dispatch(setArticleList(response.items));
          article = filterArticle(response.items, id);
          dispatch(setArticle(article));
        } else {
          if (response.message) {
            message.showError(response.message);
          }
        }
      })
      .catch(() => {
        message.showError('网络出错');
      });
  } else {
    article = filterArticle(articleList, id);
    dispatch(setArticle(article));
  }
};

export const fetchArticles = () => (dispatch, getState) => {
  fetch(PATH.apiUrl + 'articles', { method: 'get' })
    .then(response => {
      if (response.status == 200) {
        response.json().then(data => {
          console.log(data);
        });
      } else {
        console.log(-200);
      }
    })
    .catch(error => {
      console.log(error);
    });
  console.log(0);
  return fetch('https://facebook.github.io/react-native/movies.json', {
    method: 'get'
  })
    .then(response => response.json())
    .then(responseJson => {
      dispatch(setArticleList(responseJson.movies));
    })
    .catch(error => {
      console.error(error);
    });
};

function filterArticle(articleList, id) {
  let article;
  let result = articleList.filter(item => parseInt(item.id) === parseInt(id));
  if (result.length) {
    article = result[0];
  }
  return article;
}

function fetchArticlesApi(page, perPage) {
  debugger;
  return (dispatch, getState) => {
    fetch('https://facebook.github.io/react-native/movies.json', {
      method: 'get'
    })
      .then(response => response.json())
      .then(data => {
        debugger;
        dispatch(setArticleList(response.items));
      })
      .catch(error => {
        console.log(error);
      });
  };
}
