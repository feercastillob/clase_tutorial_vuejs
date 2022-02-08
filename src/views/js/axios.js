var urlBase ="http://hightek.com.mx:8080/CursoVue/webresources/";

import axios from 'axios'

function getData(urlget){
    var url= urlBase + urlget;
    return axios({
        method: 'GET',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        url: url,
        validateStatus: (status) => {
            return true; // I'm always returning true, you may want to do it depending on the status received
        },
    })
    .catch(error => {
        //console.log(error.response.status);
        //console.log("request: ",error.request);
        //console.log('Error', error.message);
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            // console.log(error.response.data);
            console.log(error.response.status);
            console.log("response");
            // console.log(error.response.headers);
        }else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log('request',error.request);
            console.log("request");
        } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
            console.log("error");
        }
        return error;
    }).then((response) => {
        return response.data;
    });
}

function postData(params,urlpost){
    var url= urlBase + urlpost;
    return axios({
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded' },
        data: params,
        url: url,
        validateStatus: (status) => {
            return true; // I'm always returning true, you may want to do it depending on the status received
        },
    }).then((response) => {
    return response.data;
    }).catch(error => {
        //console.log(error.response.status);
        //console.log("request: ",error.request);
        //console.log('Error', error.message);
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            // console.log(error.response.data);
            console.log(error.response.status);
            console.log("response");
            // console.log(error.response.headers);
        } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and aninstance of
            // http.ClientRequest in node.js
            console.log('request',error.request);
            console.log("request");
        } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
            console.log("error");
        }
        return error;
    })
}

function putData(params, urlput) {
    var url= urlBase + urlput;
    return axios({
        method: "PUT",
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        data: params,
        url: url,
    }).then((response) => {
        return response.data;
    }).catch(error => {
        //console.log(error.response.status);
        //console.log("request: ",error.request);
        //console.log('Error', error.message);
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            // console.log(error.response.data);
            console.log(error.response.status);
            console.log("response");
            // console.log(error.response.headers);
        } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and aninstance of
            // http.ClientRequest in node.js
            console.log('request',error.request);
            console.log("request");
        } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
            console.log("error");
        }
        return error;
    })
}

function deleteData(params, urlput) {
    var url= urlBase + urlput;
    return axios({
        method: "DELETE",
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        data: params,
        url: url,
    }).then((response) => {
        return response.data;
    }).catch(error => {
        //console.log(error.response.status);
        //console.log("request: ",error.request);
        //console.log('Error', error.message);
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            // console.log(error.response.data);
            console.log(error.response.status);
            console.log("response");
            // console.log(error.response.headers);
        } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and aninstance of
            // http.ClientRequest in node.js
            console.log('request',error.request);
            console.log("request");
        } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
            console.log("error");
        }
        return error;
    })
}

export{postData, getData, putData, deleteData}