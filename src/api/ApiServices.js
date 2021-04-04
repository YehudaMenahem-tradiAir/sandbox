


export default class ApiServices{
    //try get
    static getAsyncInfoWithGet(){
        let xhttp = new XMLHttpRequest()
        let url = 'https://jsonplaceholder.typicode.com/todos/1'
        xhttp.open('GET',url)
        xhttp.responseType = 'json'
        xhttp.send()
        xhttp.onload = function(){
            let res = xhttp.response
            console.log(`%cHello from the get req: ${res.title}`,`font-size:20px;color:pink`)
        }
    }

    //try fetch 
    static getAsyncInfoWithFetchPost(){
        fetch('https://jsonplaceholder.typicode.com/posts',{
            method: 'POST',
            body: JSON.stringify({
                title: 'title',
                id: 8
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        })
        .then(response => response.json())
        .then(json => {
            console.log('%cthe fetch response:' + JSON.stringify(json),'font-size:20px;color:green')
        })
    }

    //try post
    static getAysncInfoWithPost(){
        let xhttp = new XMLHttpRequest()
        let url = 'https://jsonplaceholder.typicode.com/posts'
        let body = JSON.stringify({
            title: 'title test',
            id: 33
        })
        xhttp.open('POST',url)
        xhttp.responseType = 'json'
        xhttp.send(body)
        xhttp.onload = function(){
            let res = xhttp.response
            console.log(`%cThe response from post:${JSON.stringify(res)}`,'font-size: 22px; color:gray')
        }
    }

    //try promise
    static getPromiseAsync(){
        let promise = new Promise(function(resolve,reject){
            setTimeout(() => {
                resolve(5)
            }, 5000);
        })

        promise.then(function(value){
            console.log(`%cThe return from promise:${value}`,'font-size:25px;color:red')
        })
    }

    //try web socket

}