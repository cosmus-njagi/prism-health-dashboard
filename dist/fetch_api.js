
$('document').ready(()=>{
    $('signup_submit').on('click', function(e){
        e.preventDefault();
        handleSignup();
    })

})

var handleSignup=function(e){
    var validation;
    var form = KTUtil.getById('signup_form');

    validation = FormValidation.formValidation(
        form,
        {
            fields: {
                firstname: {
                    validators: {
                        notEmpty: {
                            message: 'Firstname is required'
                        }
                    }
                },
                lastname: {
                    validators: {
                        notEmpty: {
                            message: 'Lastname is required'
                        }
                    }
                },
                email: {
                    validators: {
                        notEmpty: {
                            message: 'Email address is required'
                        },
                        emailAddress: {
                            message: 'The value is not a valid email address'
                        }
                    }
                },
                phone: {
                    validators: {
                        notEmpty: {
                            message: 'Phone is required'
                        },
                        regexp: {
                            regexp: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
                            message: 'The phone can only have  number and underscore'
                        }
                    }
                },
                city: {
                    validators: {
                        notEmpty: {
                            message: 'City  is required'
                        }
                    }
                },
                zipcode: {
                    validators: {
                        notEmpty: {
                            message: 'zipcode  is required'
                        }
                    }
                },
                zipcode: {
                    validators: {
                        notEmpty: {
                            message: 'National Id  is required'
                        }
                    }
                },

            },
            plugins: {
                trigger: new FormValidation.plugins.Trigger(),
                bootstrap: new FormValidation.plugins.Bootstrap()
            }
        }
    );

    validation.validate().then(function(status){
        if(status=='Valid'){
            let firstName= $("input[name='firstname']").val();
            let lastName=  $("input[name='lastname']").val();
            let email= $("input[name='email']").val();
            let phone= $("input[name='phone']").val();
            let city= $("input[name='city']").val();
            let zipcode= $("input[name='zipcode']").val();
            let nationalId= $("input[name='nationalId']").val();
            let userRole='AGGREGATOR';
            var password=generatePassword();

            let body= JSON.stringify({firstName:firstName,lastName:lastName,email:email, password:password, phone:phone,city:city,zipcode:zipcode,nationalId:nationalId,userRole:userRole});
            url='http://localhost:8002/auth/login';
            let token=window.sessionStorage.getItem('token');

            fetch(url,{
                method:'post',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                  },
                body:body
            }).then(res=> {
                if(res.ok){
                    return res.json;
                }else{
                    throw new Error('Aggregator not saved')
                }
            })
            .then(res=>{
                swal.fire({
                    text:`${res.firstName} saved successfully`,
                    icon: "success",
                    buttonsStyling: false,
                    confirmButtonText: "OK",
                    customClass: {
                    confirmButton: "btn font-weight-bold btn-light-primary"
                    }
                })
            })
            .then(()=>{
                location.reload();
            })
            .catch(err=>{
                swal.fire({
                    text:`An error occured`,
                    icon: "success",
                    buttonsStyling: false,
                    confirmButtonText: "OK",
                    customClass: {
                    confirmButton: "btn font-weight-bold btn-light-primary"
                    }
                }) 
            })
        }

    });

    var generatePassword= function(){
        return  Math.random().toString(36).substr(2, 8);
    }
    
}
