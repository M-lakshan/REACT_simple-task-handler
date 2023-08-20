export const elm_main_height_change = () => {
  let new_height = window.innerHeight - 20 -
    (document.querySelector('header').clientHeight + document.querySelector('footer').clientHeight);
  document.querySelector('main').style.height = `${new_height}px`;
}