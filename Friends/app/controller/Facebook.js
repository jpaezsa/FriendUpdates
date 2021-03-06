/*
 * File: app/controller/Facebook.js
 *
 * This file was generated by Sencha Architect version 2.0.0.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Ext JS 4.1.x library, under independent license.
 * License of Sencha Architect does not include license for Ext JS 4.1.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.define('Friends.controller.Facebook', {
    extend: 'Ext.app.Controller',

    fbPermissions: 'friends_status,friends_about_me',

    onLaunch: function() {
        this.loadFb(this.onFbLoaded);
    },

    onFbLoaded: function() {
        console.log('onFbLoaded');
        var me = this;

        FB.Event.subscribe('auth.statusChange', function(response) {
            console.log('The status of the session is: ' + response.status);
            if (response.status === 'connected') {
                me.application.fireEvent('fb:ready');
            } else {
                Ext.Msg.confirm('This app requires Facebook authentication', 'Do you want to authorize this app?', function(btn){
                    if (btn === 'yes') {
                        me.fbLogin();
                    }
                });
            }
        });


    },

    loadFb: function(callback) {
        var me = this;

        window.fbAsyncInit = function() {
            FB.init({
                appId      : '356768871063192', // App ID
                status     : true, // check login status
                cookie     : true, // enable cookies to allow the server to access the session
                xfbml      : true  // parse XFBML
            });

            // Additional initialization code here
            console.log('FB JS SDK loaded');

            if (Ext.isFunction(callback)) {
                callback.call(me);
            }
        };

        // Load the SDK Asynchronously
        (function(d){
            var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
            if (d.getElementById(id)) {return;}
            js = d.createElement('script'); js.id = id; js.async = true;
            js.src = "//connect.facebook.net/en_US/all.js";
            ref.parentNode.insertBefore(js, ref);
        }(document));
    },

    fbLogin: function() {
        var me = this;

        FB.login(function(response){
            console.log(response);
        }, {scope: me.fbPermissions});
    }

});
