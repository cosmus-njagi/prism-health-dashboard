// A guide to performing Fetch API, POST, GET , UPDATE , DELETE functions
//1. in the js file start by calling the document ready function to load that script immediately the page loads
$("document").ready(()=>{  
    //call in the functions to load on onclick of a button
    //assuming button has an id of postf
    console.log("your button has been clicked");
    $('add_product_btn').on('click', function(e){
        e.preventDefault();
        add_product();
            })
   //assuming button has an id of getf
    $('getf').on('click', function(e){
        e.preventDefault();
        getf();
    })
    //assuming button has an id of getf
    $('updatef').on('click', function(e){
        e.preventDefault();
        updatef();
    })
     //assuming button has an id of getf
    $('deletef').on('click', function(e){
        e.preventDefault();
        deletef();
    })


})

// POST
// Start by getting the variables from the html input files

var add_product=function(){
    console.log("your button has been clicked");
    var name = $("input[name='name']").val();
    var description = $("input[description='description']").val();
    var category = $("input[category='category']").val();
    var sub_category = $("input[sub_category='sub_category']").val();
    var quantity = $("input[quantity='quantity']").val();
    var price = $("input[price='price']").val();
    var variant = $("input[variant='variant']").val();
    var image = $("input[image='image']").val();
    // declare url
    var url = "http://172.105.167.182:8081/catalog/products"
    // create submit body  element
    var body = JSON.stringify({ name: name, description: description, category: category, sub_category: sub_category, quantity: quantity, price: price, variant: variant, image: image })
    // if request requires a token to be passed, get the token from session storage
    var token = window.sessionStorage.get("token") //get according to the way ypu had named the token variable
    //using fetch API
    console.log("hello")
    fetch(url, {
        method: "post",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, //remember to single space between Bearer and var token
        },
        body: body

    }).then((res) => {  //fetch returns a result, check if that result is ok or has status 200
        if (res.ok) {
            return res.json() //return a res json
        } else { // result has status other than 200

            throw new Error(" ....")

       }
   }).then((user)=>{ //res is status ok, we pass a var user to this promise
            //process the data
            //Assuming you had a table or div element you wanted to populate your data
            //Assuming data returned at this point is a single json  with id, username and email fields
            let html="<h1> New User Data single</h1>";
            html+=` <li>Id : ${user.id} </li>
                    <li>Id : ${user.name} </li>
                    <li>Id : ${user.email} </li>`
        //Assuming you have a div id output, load in the data to the div by its is name like as follows
        document.getElementById('output').innerHTML=html;

        "**************************************************************"
        //Assuming data received back is a list of useers

         html="<h1> Users List </h1>";
        data.forEach((user)=>{ //loop over each data
            html+=`
            <ul>
            <li>Id : ${user.id} </li>
            <li>Id : ${user.name} </li>
            <li>Id : ${user.email} </li>
            </ul>       
                `})
        document.getElementById('output').innerHTML=html;
    })
    .catch((err)=>{
        console.log(err.mesage); // handle the error , you can use the swal fire or alert to notify the user
    })
}
        


    //Get 
    
var getf= function(){
        //you can choose to get the email from the session storage or from a id component 
        // I will use the document.getElementById instead of the JQUERY get by id to get email value 
        var email= document.getElementById('email').value;
        var url="http://localhost:8080/provider/"+ email;
       //
        fetch(url,{
            method:"GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`, //remember to single space between Bearer and var token
       },
        })  
         .then((res)=>{ //Check if res is ok
           if(res.om){
               return res.json()
           }else { // res is not ok
             throw new Error("Error occurred");
           }
         })
         .then((user)=>{
             //if single Json is returned
            let html="<h1> New User Data single</h1>";
            html+=` <li>Id : ${user.id} </li>
                    <li>Id : ${user.name} </li>
                    <li>Id : ${user.email} </li>`
        //Assuming you have a div id output, load in the data to the div by its is name like as follows
        document.getElementById('output').innerHTML=html;

        "**************************************************************"
        //Assuming data received back is a list of useers

        html="<h1> Users List </h1>";
        data.forEach((user)=>{ //loop over each data
            html+=`
            <ul>
            <li>Id : ${user.id} </li>
            <li>Id : ${user.name} </li>
            <li>Id : ${user.email} </li>
            </ul>       
                `})
        document.getElementById('output').innerHTML=html;
    })
    .catch((err)=>{
        console.log(err.mesage); // handle the error , you can use the swal fire or alert to notify the user
    })

}
//update function

var  updatef=()=>{
      //you can choose to get the email from the session storage or from a id component 
        // I will use the document.getElementById instead of the JQUERY get by id to get email value 
        var email= document.getElementById('email').value;
        var url="http://localhost:8080/provider/"+ email;
       //
        fetch(url,{
            method:"PATCH",  //choose either patch or put
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`, //remember to single space between Bearer and var token
       },
        })  
         .then((res)=>{ //Check if res is ok
           if(res.om){
               return res.json()
           }else { // res is not ok
             throw new Error("Error occurred");
           }
         })
         .then((user)=>{
             //if single Json is returned
            let html="<h1> New User Data single</h1>";
            html+=` <li>Id : ${user.id} </li>
                    <li>Id : ${user.name} </li>
                    <li>Id : ${user.email} </li>`
        //Assuming you have a div id output, load in the data to the div by its is name like as follows
        document.getElementById('output').innerHTML=html;

        "**************************************************************"
        //Assuming data received back is a list of useers

        html="<h1> Users List </h1>";
        data.forEach((user)=>{ //loop over each data
            html+=`
            <ul>
            <li>Id : ${user.id} </li>
            <li>Id : ${user.name} </li>
            <li>Id : ${user.email} </li>
            </ul>       
                `})
        document.getElementById('output').innerHTML=html;
    })
    .catch((err)=>{
        console.log(err.mesage); // handle the error , you can use the swal fire or alert to notify the user
    })

}

var deletef=()=>{
    var url=`https://jsonplaceholder.typicode.com/todos/1`
    fetch(url, {method: `DELETE`})
}


