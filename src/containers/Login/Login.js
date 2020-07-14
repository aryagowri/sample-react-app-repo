import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import FormControl from '../../components/UI/FormControl/FormControl';
import Button from '../../components/UI/Button/Button';
import Modal from '../../components/UI/Modal/Modal';
import * as actions from '../../store/actions/index';
import { checkValidity } from '../../Utility/utility';
import styles from './Login.module.css';

const Login = props => {
    const [formControls, setFormControls] = useState({
        email: {
            controlType: 'input',
            label: 'Email',
            value: '',
            attribute: {
                type: 'email'
            },
            errMsg: '',
            touched: false,
            validation: {
                required: true,
                email: true
            }
        },
        password: {
            controlType: 'input',
            label: 'Password',
            value: '',
            attribute: {
                type: 'password'
            },
            errMsg: '',
            touched: false,
            validation: {
                required: true,
                minLength: 5,
                maxLength: 10
            }
        }
    });
    const [isLogin, setIsLogin] = useState(true);
    const [isFormValid, setIsFormValid] = useState(false);
    
    useEffect(() => {
        let isValid = true;
        for(let key in formControls) {
            console.log('isValid', isValid, 'errMsg', formControls[key].errMsg, 'touched', formControls[key].touched)
            isValid = isValid && formControls[key].errMsg === '' && formControls[key].touched;
        }
        setIsFormValid(isValid);
    }, [formControls]);
    const changeHandler = event => {
        const {name, value} = event.target;
        const errorMsg = checkValidity(value, formControls[name].validation);
        
        setFormControls({
            ...formControls,
            [name]: {
                ...formControls[name],
                value: event.target.value,
                errMsg: errorMsg,
                touched: true
            }
        });
        
    }
    const loginSwitchBtnHandler = () => {
        setIsLogin(prevState => !prevState);
        resetHandler();
    }
    const closeBtnHandler = event => {
        event.preventDefault();
        props.history.goBack();
    }
    const resetHandler = event => {
        event.preventDefault();
        setFormControls({
            ...formControls,
            email: {
                ...formControls.email,
                value: '',
                errMsg: '',
                touched: false
            },
            password: {
                ...formControls.password,
                value: '',
                errMsg: '',
                touched: false
            }
        })
    }
    const loginHandler = event => {
        event.preventDefault();
        props.onLoginSubmit(formControls.email.value, formControls.password.value, isLogin);
    }
    let formArray = [];
    for(let element in formControls) {
        formArray.push({
            id: element,
            desc: formControls[element]
        })
    }
    let authRedirect = null;
    if(props.isAuthUser) {
        authRedirect = <Redirect to="/" />
    }
    return (
        <Modal show={true} backdropClickHandler={closeBtnHandler}>
            {authRedirect}
            <div className={styles.CloseButton}><Button clickHandler={closeBtnHandler}>&times;</Button></div>
            <h2 className={styles.LoginHeading}>{ isLogin ? 'LOGIN' : 'SIGN UP' }</h2>
            <form onSubmit={loginHandler} className={styles.LoginForm}>
                {formArray.map(element =>
                    <FormControl attributes={element.desc.attribute} id={element.id} name={element.id} 
                        value={element.desc.value} controlType={element.controlType} onChange={changeHandler} 
                        label={element.desc.label} key={element.id} errorMsg={element.desc.errMsg}
                         touched={element.desc.touched}/>
                )}
                <div className={styles.ButtonContainer}>
                    <Button clickHandler={resetHandler}>Reset</Button>
                    <Button disabled={!isFormValid}>{ isLogin ? 'Login' : 'Sign Up' }</Button>
                </div>
            </form>
            <p className={styles.SignupPara}>{ isLogin ? 'Don\'t have an account?': 'Already have an account?' }<button 
            className={styles.SignUpButton} onClick={loginSwitchBtnHandler}>{ isLogin ? 'Sign up' : 'Login' }</button></p>
        </Modal>
    );
}
const mapStateToProps = state => {
    return {
        loading: state.login.loading,
        error: state.login.error,
        isAuthUser: state.login.token !== null
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onLoginSubmit: (email, password, isLogin) => dispatch(actions.loginSubmit(email, password, isLogin))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);