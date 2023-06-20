import React, {Component} from "react";
import ReactDOM from "react-dom";
import { Link } from 'react-router-dom'

import './RegistrationPage.css'
import { useForm } from "react-hook-form"

import RegisterForm from "../../components/itapComponents/RegisterForm/RegisterForm";
import SideBar from "../../components/side-bar";

export default class RegistrationPage extends Component {
    render() {
        return (
            <section style={{width:"1200px"}}>
                <div className="title">
                    <div><a style={{color:"black"}}>Регистрация</a></div>
                </div>

                <RegisterForm></RegisterForm>
            </section>
        )
    }
}