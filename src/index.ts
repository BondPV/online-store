import App from './components/app/app';
import './style.scss';

const main = document.querySelector('.main__wrap');

const app = new App();

if (!main) {
  throw new Error('HTML structure is broken. The main element is underfined!');
}

if (main && main instanceof HTMLElement) {
  main.innerHTML = app.start();
}
