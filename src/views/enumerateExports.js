import React from 'react';
import ReactDOM from 'react-dom';
import {Menu, Button, Icon, Input, Table} from 'antd';
import '../index.css';
import 'antd/dist/antd.css'
import axios from 'axios';
import Qs from 'qs';
import Info from '../data/dataList';
import Footer from '../data/processData';


class  EnumerateExports  extends React.Component{
    state = {
        current: '1',
        modulename: null,
        processname: null,
        enumExportsresp: null,

    };
    handleClick = e => {
        console.log('click ', e);
        this.setState({
            current: e.key,
        });
    };

    onEnumerateExports() {
        axios({
            url: 'http://127.0.0.1:8000/enumerateExports/',
            method: 'post',
            transformRequest: [function (data) {
                // 对 data 进行任意转换处理
                return Qs.stringify(data)
            }],
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            data: {
                modulename: this.state.modulename,
                processname: this.state.processname,


            }


        })
            .then(data => this.setState({
                enumExportsresp: data.data
            }))
            .catch(console.log("发送请求失败"));
    };


    render(){
        return(
            <div key='/enumerateExports'  >
                            <Input addonBefore="ModuleName:" value={this.state.modulename} onChange={e => this.setState({
                                modulename: e.target.value
                            })} style={{ width: 600 }} size={"large"} />
                            <Input.Search enterButton="Submit" addonBefore="ProcessName:" value={this.state.processname} onChange={e => this.setState({
                                processname: e.target.value
                            })} style={{ width: 600 }} size={"large"} onSearch={this.onEnumerateExports.bind(this)} />
                            <div>
                                <div>{this.state.enumExportsresp}</div>
                                <Info/>
                               
                            </div>
                            <div>
                                <Footer/>
                            </div>
                        </div>

        );
    }
}

export default EnumerateExports;