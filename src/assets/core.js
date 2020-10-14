let userAgent = navigator.userAgent;
let u = {};   //存储方法的对象
let LS = localStorage;
let SS = sessionStorage;
// let BASE_URL = 'http://demo.ymz666.com/';
let BASE_URL = '';
import store from '@/store/index.js';

import router from '@/router/index';

import qs from 'qs';
import axios from 'axios';
import  js from './jquery-2.1.1';
// axios.defaults.withCredentials = true // 让ajax携带cookie

window.$core = u;

// 判断是否有滚动条
u.hasScrollbar = () => {
    return document.documentElement.clientHeight < document.documentElement.offsetHeight;
}

// 获取滚动条高度
u.getScrollBarWidth = () => {
    let odiv = document.createElement('div'),//创建一个div
        styles = {
            width: '100px',
            height: '100px',
            overflowY: 'scroll'//让他有滚动条
        }, i, scrollbarWidth;
    for (i in styles) odiv.style[i] = styles[i];
    document.body.appendChild(odiv);//把div添加到body中
    scrollbarWidth = odiv.offsetWidth - odiv.clientWidth;//相减
    odiv.remove();//移除创建的div
    return scrollbarWidth;//返回滚动条宽度
}


// 获取数据（普通获取）
u.request = (path, callback, params, type) => {
    var HostName = LS.getItem('hostName');
    HostName = HostName.replace("str-",'');
    BASE_URL =  'http://'+HostName+'/vue.php?' || '';
    console.log(BASE_URL)
    let Path = path.indexOf('http') >= 0 ? path : BASE_URL + path;
    js.ajax({
        type: 'post',
        url: Path,
        data: params,
        dataType: "json",
        success: function(e,t,a) {
            callback(e);
        },
        error: function(e, t, a) {
            console.log(e);
            alert('您的网络不稳定，请更换网络重新尝试');
        }
    })
};

u.getRequest = (path, callback, params) => {  //request get 获取
    let Path = path.indexOf('http') >= 0 ? path : BASE_URL + path;
    let set_headers = {};
    if (path == 'm=user&a=login') {
        // set_headers = { token: $core.getLocal('token') || '' };
        // axios.defaults.headers['token']=$core.getLocal('token')||'';
    }
    axios.get(Path, { params, headers: set_headers })
        .then(ret => {
            if (ret.data.code === 7) {
                $core.setLocal('login', false);
                router.replace({ name: 'Login' });
                return;
            }
            callback(ret.data);
        })
        .catch(err => {
            console.log(err);
            alert('您的网络不稳定，请更换网络重新尝试');
        });
};

// 上传文件
u.uploadImg = (path, callback, params) => {
    let Path = path.indexOf('http') >= 0 ? path : BASE_URL + path;
    let set_headers = {};
    if (path !== 'm=user&a=login') {
        set_headers = { 'token': $core.getLocal('token') || '', 'Content-Type': 'multipart/form-data' };
        // axios.defaults.headers['token']=$core.getLocal('token')||'';
    }
    axios.post(Path, params, { headers: set_headers })
        .then(ret => {
            callback(ret.data);
        })
        .catch(err => {
            callback('uploadError');
        });
}

// 下载保存文件
u.saveFile = (url, param, name) => {
    let path = url.indexOf('http') >= 0 ? url : BASE_URL + url;
    let set_headers = { 'token': $core.getLocal('token') || '' };
    let params = new FormData();
    for (const i in param) {
        params.append(i, param[i]);
    }
    console.log(param);
    
    axios.post(path, params, {
        headers: set_headers,
        responseType: 'arraybuffer'
    }).then(function (res) {
        //   var blob = res.data;
        //   console.log(res.data);
        //   console.log(res.headers);

        //  // FileReader主要用于将文件内容读入内存
        //   var reader = new FileReader();
        //   reader.readAsDataURL(blob);
        //   // onload当读取操作成功完成时调用
        //   reader.onload = function(e) {
        //     var a = document.createElement('a');
        //     // 获取文件名fileName
        //     // var fileName = res.headers["content-disposition"].split("=");
        //     // fileName = fileName[fileName.length - 1];
        //     // fileName = fileName.replace(/"/g, "");
        //     // a.download = fileName;
        //     a.href = e.target.result;
        //     document.body.appendChild(a);
        //     a.click();
        //     document.body.removeChild(a);
        //   }

        console.log(res);

        //  导出成csv 

        // 创建一个新的url，此url指向新建的Blob对象
        let url = window.URL.createObjectURL(new Blob([res.data]))
        // 创建a标签，并隐藏改a标签
        let link = document.createElement('a')
        link.style.display = 'none'
        // a标签的href属性指定下载链接
        link.href = url
        //setAttribute() 方法添加指定的属性，并为其赋指定的值。
        link.setAttribute('download', name + '.csv')
        document.body.appendChild(link)
        link.click();
        document.body.removeChild(link) // 下载完成移除元素
        window.URL.revokeObjectURL(url) // 释放掉blob对象


        // 导出成excel及其他文件

        // // res.data 是一个 blob 流格式
        // // text/csv
        // // application/vnd.openxmlformats-officedocument.spreadsheetml.sheet
        // const blob = new Blob([res.data], { type: 'application/vnd.msexcel;charset=utf-8' })
        // const downloadElement = document.createElement('a')
        // let href = window.URL.createObjectURL(blob)
        // downloadElement.href = href
        // // downloadElement.download = res.headers['content-disposition'].split('=')[1]
        // downloadElement.download = name;
        // document.body.appendChild(downloadElement)
        // downloadElement.click()
        // document.body.removeChild(downloadElement) // 下载完成移除元素
        // window.URL.revokeObjectURL(href) // 释放掉blob对象
    });
}

// 将数据存储到本地
u.setLocal = (key, value) => {
    let v = value;
    v = typeof v === 'object' ? 'obj-' + JSON.stringify(v) : 'str-' + v;
    LS && LS.setItem(key, v);
}

// 获取缓存
u.getLocal = key => {
    let v = LS.getItem(key);

    if (v) {
        v = $core.getStorageValue(v);
        return v;
    }
};

// 清掉某个缓存
u.rmLocal = key => {
    key && LS.removeItem(key);
};

// 获取值
u.getStorageValue = v => {
    if (v.indexOf('obj-') === 0) {
        let V = v.slice(4);

        return JSON.parse(V);
    } else if (v.indexOf('str-') === 0) {
        return v.slice(4);
    }
};

// 显示Toast的不间断弹窗
u.showToastLoading = (Toast) => {
    Toast.loading({
        forbidClick: true,
        overlay: true,
        duration: 0
    });
}







