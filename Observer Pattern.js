//HTML Elements
var root = document.getElementsByTagName('body')[0];

//Container for Checkboxes
var chkBoxCtnr = document.createElement('div');
root.appendChild(chkBoxCtnr);

//Button
var btn = document.createElement('button');
btn.innerText = 'Create';
root.appendChild(btn);

//Base Subject
function subject(){

    var observersList = [];

    return {
        addObserver : function(observer){
           observersList.push(observer); 
        },
        removeObserver : function(index){
           observersList.splice(index, 1); 
        },
        count : function(){
            return observersList.length;
        },
        notify : function(cxt){
            for(var i=0; i<observersList.length; i++)
                observersList[i].update(cxt);
        }
    }
}

//Base Observer
function observer(){
    return {
        update : function(){}
    }
}

//Concrete Subject
var ctrlBox = document.createElement('input');
ctrlBox.type = 'checkbox';
root.appendChild(ctrlBox);

extend( ctrlBox, new subject());

ctrlBox.onchange = function(){
    this.notify(this.checked);
}

//Concrete Observer
btn.onclick = function(){
    //create checkbox
    chkBox = document.createElement('input');
    chkBox.type = 'checkbox';
    chkBoxCtnr.appendChild(chkBox);

    //extend it
    extend(chkBox, new observer());

    //implement update
    chkBox.update = function(btnState){
        this.checked = btnState;
    }

    //add this observer to the subject
    ctrlBox.addObserver(chkBox);
}

//Helpers
function extend(obj, extension){
    for(key in extension)
        obj[key] = extension[key];
}