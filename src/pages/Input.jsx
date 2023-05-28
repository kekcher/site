import React from 'react';
import { useNavigate } from 'react-router-dom';
import logoSvg from '../img/logoInput.svg';
import { mainContext } from '../App';
import add_icon from '../img/plus.svg';

import '../css/Input.css';
import '../css/Sphere.css';
import ChooseInterest from '../components/ChooseInterest';

class Input extends React.Component {
  state = {
    activeBox: 0,
    userCategory: 'undefined',
    login: '',
    password: '',
    loginpassword: '',
    secondpassword: '',
    telem: '',
    code: '',
    inputCount: 3,
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onFocusInput = () => {
    document.querySelectorAll('input').forEach((input) => {
      input.className = '';
    });
    document.querySelectorAll('.error_label').forEach((label) => {
      label.classList.add('none_active');
    });
  };

  onClickLogin = () => {
    let logic = true;

    document.querySelectorAll('input').forEach((input) => {
      if (input.value === '') {
        logic = false;
        input.className = 'error_input';
        this.state.activeBox === 2
          ? input.nextElementSibling.classList.remove('none_active')
          : document.getElementById('error_label_input').classList.remove('none_active');
      }
    });
    if (this.state.activeBox === 1 && logic) {
      const navigate = useNavigate();
      const { setPage } = React.useContext(mainContext);
      navigate('/');
      setPage('home');
    }
    if (this.state.activeBox === 2 && logic) {
      this.setState({ activeBox: 3 });
    }
  };

  NextChoose = () => {
    this.state.userCategory === 'undefined'
      ? document.querySelectorAll('.choose_who').forEach((item) => {
          item.classList.add('error_input');
        })
      : this.state.activeBox === 4
      ? this.setState({ activeBox: 5 })
      : this.setState({ activeBox: 4 });
  };

  AddInput = () => {
    this.setState({ inputCount: this.state.inputCount + 1 });
    let input = document.createElement('input');
    input.type = 'text';
    input.className = 'more_input';
    input.placeholder = `${this.state.inputCount}. Я интересуюсь...`;
    document.querySelector('.more_container').appendChild(input);
    input.focus();
  };

  render() {
    const { activeBox, userCategory, login, password, loginpassword, secondpassword, telem, code } =
      this.state;

    return (
      <>
        {activeBox === 0 && (
          <div className="first_input_container">
            <img className="logo_input" src={logoSvg} alt="logo" />
            <div style={{ marginBottom: '30%' }}>
              <button onClick={() => this.setState({ activeBox: 1 })} className="come_btn">
                Войти
              </button>
              <p>или</p>
              <p
                style={{ textDecorationLine: 'underline' }}
                onClick={() => this.setState({ activeBox: 2 })}>
                зарегистрироваться
              </p>
            </div>
          </div>
        )}
        {activeBox === 1 && (
          <div className="input_container">
            <img className="input_logo" src={logoSvg} />

            <form className="input_form" action="#" style={{ height: '40vh' }}>
              <h1 className="input_form_sign">Вход</h1>
              <input
                onFocus={this.onFocusInput}
                onChange={this.handleChange}
                type="text"
                name="login"
                value={login}
                placeholder="Логин"
              />
              <input
                onFocus={this.onFocusInput}
                onChange={this.handleChange}
                type="password"
                name="password"
                value={password}
                placeholder="Пароль"
              />
              <p id="error_label_input" className="error_label none_active">
                Неверный логин или пароль!
              </p>
              <button onClick={this.onClickLogin}>Войти</button>
            </form>

            <p>
              Нет аккаунта?{' '}
              <a
                className="input_link"
                onClick={() => {
                  this.setState({ activeBox: 2 });
                }}>
                Зарегистрироваться
              </a>
            </p>
          </div>
        )}
        {activeBox === 2 && (
          <div className="input_container">
            <img className="input_logo" src={logoSvg} />
            <form className="input_form" action="#" style={{ height: '60vh' }}>
              <h1 className="input_form_sign">Регистрация</h1>
              <input
                onFocus={this.onFocusInput}
                onChange={this.handleChange}
                type="text"
                name="telem"
                value={telem}
                placeholder="Номер телефона/Почта"
              />
              <p className="error_label none_active">Неверный номер телефона или почта!</p>
              <input
                onFocus={this.onFocusInput}
                onChange={this.handleChange}
                type="text"
                name="code"
                value={code}
                placeholder="Код"
              />
              <p className="error_label none_active">Неверный код!</p>
              <input
                onFocus={this.onFocusInput}
                onChange={this.handleChange}
                type="password"
                name="loginpassword"
                value={loginpassword}
                placeholder="Пароль"
              />
              <p className="error_label none_active">Недопустимый пароль!</p>
              <input
                onFocus={this.onFocusInput}
                onChange={this.handleChange}
                type="password"
                name="secondpassword"
                value={secondpassword}
                placeholder="Повторите пароль"
              />
              <p className="error_label none_active">Пароли не совпадают!</p>
              <button onClick={this.onClickLogin}>Далее</button>
            </form>
            <p className="sign_conf">
              Нажимая “Далее”, Вы соглашаетесь с{' '}
              <u style={{ textDecorationLine: 'underline' }}>регламентом</u> и{' '}
              <u style={{ textDecorationLine: 'underline' }}>политикой конфиденциальности</u>
            </p>
            <p>
              Есть аккаунт?{' '}
              <a
                className="input_link"
                onClick={() => {
                  this.setState({ activeBox: 1 });
                }}>
                Войти
              </a>
            </p>
          </div>
        )}
        {activeBox === 3 && (
          <div className="input_container" style={{ backgroundImage: 'url()' }}>
            <p className="choose_header">Кем вы являетесь?</p>
            <button
              className={userCategory === 'professional' ? 'choose_who your_choose' : 'choose_who '}
              onClick={() => {
                this.setState({ userCategory: 'professional' });
                document.querySelectorAll('.choose_who').forEach((item) => {
                  item.classList.remove('error_input');
                });
              }}>
              Профессионал
            </button>
            <button
              className={userCategory === 'сustomer' ? 'choose_who your_choose' : 'choose_who '}
              onClick={() => {
                this.setState({ userCategory: 'сustomer' });
                document.querySelectorAll('.choose_who').forEach((item) => {
                  item.classList.remove('error_input');
                });
              }}>
              Заказчик
            </button>
            <button
              className={userCategory === 'organization' ? 'choose_who your_choose' : 'choose_who '}
              onClick={() => {
                this.setState({ userCategory: 'organization' });
                document.querySelectorAll('.choose_who').forEach((item) => {
                  item.classList.remove('error_input');
                });
              }}>
              Организация
            </button>
            <button onTo className="choose_next_btn" onClick={this.NextChoose}>
              Далее
            </button>
          </div>
        )}
        {activeBox === 4 && (
          <>
            <ChooseInterest />
            <div className="choose_next">
              <button onTo className="next_button" onClick={this.NextChoose}>
                Далее
              </button>
            </div>
          </>
        )}
        {activeBox === 5 && (
          <div className="more">
            <h3 className="more_header">Может быть мы что-то забыли?</h3>
            <div className="more_container">
              <input className="more_input" placeholder="1. Я интересуюсь..." />
              <input className="more_input" placeholder="2. Я интересуюсь..." />
            </div>
            <img className="more_add" src={add_icon} onClick={this.AddInput} />
            <button className="more_ready">Готово</button>
          </div>
        )}
      </>
    );
  }
}

export default Input;
