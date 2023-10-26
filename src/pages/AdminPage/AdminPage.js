import React, { Component, useEffect, useState } from "react";
import axios from 'axios';

import SideBar from '../../components/side-bar';

import './AdminPage.css'
import UsersTable from "../../components/itapComponents/UsersTable/UsersTable";
import {Link, useLocation, useNavigate} from "react-router-dom";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import {TableRow} from "@mui/material";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";

import iconImp from './../../images/icons8-alert-96.png'

const baseURL = "http://192.168.30.24:9091/api/finpol/main"

const AdminPage = (props) => {
    const userSession = JSON.parse(localStorage.getItem("user"))
    const navigate = useNavigate()

    const [users, setUsers] = useState(0)
    const [logs, setLogs] = useState(0)
    const [todayLogs, setTodayLogs] = useState(0)

    const [impLogs, setImpLogs] = useState([
        {
            date: '',
            username: '',
            requestBody: []
        }
    ])

    const location = useLocation()

    useEffect(() => {
        const a = !userSession.roles.includes("ADMIN") ? navigate('/') : ""

        axios.get(`${baseURL}/general`)
        .then(res => {
            setUsers(res.data.userNumber)
            setLogs(res.data.allLogsNum)
            setTodayLogs(res.data.todayRequests)
            // console.log(this.location)
        })

        axios.get(`${baseURL}/getLogsImp`)
            .then(res => {
                setImpLogs( res.data );
                console.log(res.data)
            })
    }, [])

    return (
        <div className={'adminPage'} style={{display: 'flex', flexDirection: 'row'}}>
            <section>

                <div className="countStats">
                    <div className="lastQuery">
                        <div>Количество пользователей</div>
                        <div><a style={{color:"black"}}>{users}</a></div>
                    </div>

                    <div>
                        <div>Количество запросов</div>
                        <div><a style={{color:"black"}}>{logs}</a></div>
                    </div>

                    <div>
                        <div>Количество запросов за сегодня</div>
                        <div><a style={{color:"black"}}>{todayLogs}</a></div>
                    </div>
                </div>
                <div style={{display: 'flex', justifyContent: 'center'}}>
                    <h1 style={{color: 'black'}}>Нарушение</h1>
                </div>
                <div>
                    <TableContainer>
                        <Table className="table adminPanelTable uitable">
                            <TableHead>
                                <TableRow className="uitableHead">
                                    <TableCell style={{ width: '5%' }}><a>#</a></TableCell>
                                    <TableCell style={{ width: '20%' }}><a>Почта</a></TableCell>
                                    <TableCell style={{ width: 100 }}><a>Дата</a></TableCell>
                                    <TableCell align="left"><a>ИИН</a></TableCell>
                                    <TableCell align="left"><a></a></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {impLogs.length <= 0 || impLogs.map((row, index) => (
                                    <TableRow hover>
                                        <TableCell><a>{index+1}</a></TableCell>
                                        <TableCell style={{ width: '20%' }}>{row.username}</TableCell>
                                        <TableCell><a>{row.date.substring(0, 10)}</a></TableCell>
                                        <TableCell><a>{row.request_body}</a></TableCell>
                                        <TableCell><img style={{width: '30px'}} src={iconImp}/></TableCell>
                                        {/*{this.active(row)}*/}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
                <div>
                    <UsersTable></UsersTable>
                </div>
                <div className="footer"></div>
            </section>
        </div>

    );
}

export default AdminPage;