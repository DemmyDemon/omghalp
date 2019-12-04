var myName = "omghalp";

function setChapter(data){
    if (data.setCurrent){
        let link = document.querySelector("a[href='#"+data.setCurrent+"']");
        if (link){
            link.classList.add("current");
        }
    }
    if (data.markdown){
        let text = document.querySelector("#chaptertext")
        text.innerHTML = marked(data.markdown);
        text.scrollTo(0,0);
    }
}

function TellResource(event,data){
    let dataString = JSON.stringify(data);
    let http = new XMLHttpRequest();
    let target = "http://" + myName + "/" + event;
    http.open('POST', target);
    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    http.send(dataString);
    http.onreadystatechange = function() {
        if(http.readyState == 4 && http.status == 200) {
            if (http.responseText){
                let data = JSON.parse(http.responseText);
                setChapter(data);
            }
        }
    }
}
function hide(){
    let container = document.querySelector("#container")
    if (!container.classList.contains("hidden")){
        container.classList.add("hidden");
        TellResource("helpVisible",{visible:false});
    }
}
function show(){
    let container = document.querySelector("#container");
    if (container.classList.contains("hidden")){
        container.classList.remove("hidden");
        TellResource("helpVisible",{visible:true});
    }
}
function loadChapter(chapterFile){
    document.querySelectorAll(".current").forEach((old)=>{
        old.classList.remove("current");
    })
    TellResource("loadChapter",{file:chapterFile});
}
window.addEventListener("message", (event)=>{
    if (event.data.myname){
        myName = event.data.myname;
    }
    if (event.data.type == "visible"){
        if (event.data.visible){
            show();
        }
        else {
            hide();
        }
    }
    else if (event.data.type == "addChapter"){
        let list = document.querySelector("#chapterlist > ul");
        let listItem = document.createElement('li');
        let anchor = document.createElement('a');
        anchor.href = '#'+event.data.filename;
        anchor.text = event.data.text;
        anchor.addEventListener("click", (event)=>{
            event.preventDefault();
            loadChapter(anchor.hash);
        }, true);
        listItem.append(anchor);
        list.append(listItem);
    }
    else if (event.data.type == "setChapter"){
        document.querySelectorAll(".current").forEach((old)=>{
            old.classList.remove("current");
        })
        setChapter(event.data);
    }
});
document.addEventListener( "DOMContentLoaded", ()=>{
    document.querySelector("#buttonClose").addEventListener("click", (event)=>{
        hide();
    }, true);
}, false );

document.addEventListener( "keypress", (event)=>{
    hide();
});