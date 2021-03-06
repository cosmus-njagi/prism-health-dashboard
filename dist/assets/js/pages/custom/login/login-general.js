"use strict";

// Class Definition
var KTLogin = function() {
    var _login;

    var _showForm = function(form) {
        var cls = 'login-' + form + '-on';
        var form = 'kt_login_' + form + '_form';

        _login.removeClass('login-forgot-on');
        _login.removeClass('login-signin-on');
        _login.removeClass('login-signup-on');

        _login.addClass(cls);

        KTUtil.animateClass(KTUtil.getById(form), 'animate__animated animate__backInUp');
    }

    var _handleSignInForm = function() {
        var validation;

        // Init form validation rules. For more info check the FormValidation plugin's official documentation:https://formvalidation.io/
        validation = FormValidation.formValidation(
			KTUtil.getById('kt_login_signin_form'),
			{
				fields: {
					mobile: {
						validators: {
							notEmpty: {
								message: 'mobile is required'
							}
						}
					},
					password: {
						validators: {
							notEmpty: {
								message: 'Password is required'
							}
						}
					}
				},
				plugins: {
                    trigger: new FormValidation.plugins.Trigger(),
                    submitButton: new FormValidation.plugins.SubmitButton(),
                    //defaultSubmit: new FormValidation.plugins.DefaultSubmit(), // Uncomment this line to enable normal button submit after form validation
					bootstrap: new FormValidation.plugins.Bootstrap()
				}
			}
		);

        $('#kt_login_signin_submit').on('click', function (e) {
			e.preventDefault();
			console.log("your button has been clicked");

            validation.validate().then(function(status) {
				if (status == 'Valid') {
					var phone = $("input[name='phone']").val();
					var password = $("input[name='password']").val();
					var url = "http://172.105.167.182:8081/login";
					console.log(`${phone} ${password}`)
					fetch(url,{
						method:'post',
						headers: {
							'Content-Type': 'application/json'
						  },
						body:JSON.stringify({phone:phone,password:password})
					})
					.then(res=>{
						if(res.ok){
							window.location.href="index.html"
						}else{
							throw new Error('Login error');
						}
					})
					
					.catch((error) => {
						window.sessionStorage.clear();
							swal.fire({
								text:'Invalid Login credentials',
								icon: "error",
								buttonsStyling: false,
								confirmButtonText: "Retry",
								customClass: {
								confirmButton: "btn font-weight-bold btn-light-primary"
								}
							})
					  });
				} else {
					swal.fire({
		                text: "Sorry, looks like there are some errors detected, Check if fields are empty.",
		                icon: "error",
		                buttonsStyling: false,
		                confirmButtonText: "Ok",
                        customClass: {
    						confirmButton: "btn font-weight-bold btn-light-primary"
    					}
		            }).then(function() {
						KTUtil.scrollTop();
					});
				}
		    });
				
		    });
        

        // Handle forgot button
        $('#kt_login_forgot').on('click', function (e) {
            e.preventDefault();
            _showForm('forgot');
        });

        // Handle signup
        $('#kt_login_signup').on('click', function (e) {
            e.preventDefault();
            _showForm('signup');
        });
    }

    var _handleSignUpForm = function(e) {
        var validation;
        var form = KTUtil.getById('kt_login_signup_form');

        // Init form validation rules. For more info check the FormValidation plugin's official documentation:https://formvalidation.io/
        validation = FormValidation.formValidation(
			form,
			{
				fields: {
					fullname: {
						validators: {
							notEmpty: {
								message: 'Username is required'
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
                    password: {
                        validators: {
                            notEmpty: {
                                message: 'The password is required'
                            }
                        }
                    },
                    cpassword: {
                        validators: {
                            notEmpty: {
                                message: 'The password confirmation is required'
                            },
                            identical: {
                                compare: function() {
                                    return form.querySelector('[name="password"]').value;
                                },
                                message: 'The password and its confirm are not the same'
                            }
                        }
                    },
                    agree: {
                        validators: {
                            notEmpty: {
                                message: 'You must accept the terms and conditions'
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


        // Handle cancel button
        $('#kt_login_signup_cancel').on('click', function (e) {
            e.preventDefault();

            _showForm('signin');
        });
	}
	
	var _handleProductForm = function(e) {
        var validation;
        var form = KTUtil.getById('add_product_form');

        // Init form validation rules. For more info check the FormValidation plugin's official documentation:https://formvalidation.io/
        validation = FormValidation.formValidation(
			form,
			{
				fields: {
					name: {
						validators: {
							notEmpty: {
								message: 'product name is required'
							}
						}
					},
					description: {
						validators: {
							notEmpty: {
								message: 'product description is required'
							}
						}
					},
                    category: {
						validators: {
							notEmpty: {
								message: 'product category is required'
							}
						}
					},
                    subcategory: {
						validators: {
							notEmpty: {
								message: 'product subcategory is required'
							}
						}
					},
                    quantity: {
						validators: {
							notEmpty: {
								message: 'product quantity is required'
							}
						}
					},
					price: {
						validators: {
							notEmpty: {
								message: 'product price is required'
							}
						}
					},
					variant: {
						validators: {
							notEmpty: {
								message: 'product variant is required'
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

        $('#add_product_btn').on('click', function (e) { console.log("you have clicked button")
            e.preventDefault();
            validation.validate().then(function(status) {
		        if (status == 'Valid') {
                   var name = $("input[name='name']").val();
					var description = $("input[name='description']").val();
					var category = $("input[name='category']").val();
					var subcategory = $("input[name='subcategory']").val();
					var quantity = $("input[name='quantity']").val();
					var price = $("input[name='price']").val();
					var variant = $("input[name='variant']").val();
					var url = "http://172.105.167.182:8081/catalog/products";
					
					fetch(url,{
						method:'post',
						headers: {
							'Content-Type': 'application/json'
						  },
						body: JSON.stringify({
							name: name, description: description, category: category, subcategory: subcategory,
							quantity: quantity, price: price, variant: variant
						})
					})
					.then(res=>{
						if(res.ok){
							window.location.href="index.html"
						}else{
							throw new Error('Login error');
						}
					})
					
					.catch((error) => {
						window.sessionStorage.clear();
							swal.fire({
								text:'Invalid Login credentials',
								icon: "error",
								buttonsStyling: false,
								confirmButtonText: "Retry",
								customClass: {
								confirmButton: "btn font-weight-bold btn-light-primary"
								}
							})
					  });
				} else {
					swal.fire({
		                text: "Sorry, looks like there are some errors detected, please try again.",
		                icon: "error",
		                buttonsStyling: false,
		                confirmButtonText: "Ok, got it!",
                        customClass: {
    						confirmButton: "btn font-weight-bold btn-light-primary"
    					}
		            }).then(function() {
						KTUtil.scrollTop();
					});
				}
		    });
        });

        // Handle cancel button
        $('#kt_login_signup_cancel').on('click', function (e) {
            e.preventDefault();

            _showForm('signin');
        });
    }

    var _handleForgotForm = function(e) {
        var validation;

        validation = FormValidation.formValidation(
			KTUtil.getById('kt_login_forgot_form'),
			{
				fields: {
					email: {
						validators: {
							notEmpty: {
								message: 'Email address is required'
							},
                            emailAddress: {
								message: 'The value is not a valid email address'
							}
						}
					}
				},
				plugins: {
					trigger: new FormValidation.plugins.Trigger(),
					bootstrap: new FormValidation.plugins.Bootstrap()
				}
			}
		);

        // Handle submit button
        $('#kt_login_forgot_submit').on('click', function (e) {
            e.preventDefault();

            validation.validate().then(function(status) {
		        if (status == 'Valid') {
                    // Submit form
                    KTUtil.scrollTop();
				} else {
					swal.fire({
		                text: "Sorry, looks like there are some errors detected, please try again.",
		                icon: "error",
		                buttonsStyling: false,
		                confirmButtonText: "Ok, got it!",
                        customClass: {
    						confirmButton: "btn font-weight-bold btn-light-primary"
    					}
		            }).then(function() {
						KTUtil.scrollTop();
					});
				}
		    });
        });

        // Handle cancel button
        $('#kt_login_forgot_cancel').on('click', function (e) {
            e.preventDefault();

            _showForm('signin');
        });
    }

    // Public Functions
    return {
        // public functions
        init: function() {
            _login = $('#kt_login');

            _handleSignInForm();
			_handleSignUpForm();
			_handleProductForm();
            _handleForgotForm();
        }
    };
}();

/* Class Initialization
jQuery(document).ready(function() {
    KTLogin.init();
});*/
