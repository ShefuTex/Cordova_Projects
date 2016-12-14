/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

function getSIDFromResponse(response) {

    var USIDNode, myDocument;
    var result = '';

    if (response) {
        if (document.implementation.createDocument) {
            // Mozilla, create a new DOMParser 
            var parser = new DOMParser();
            myDocument = parser.parseFromString(response, "text/xml");
        } else if (window.ActiveXObject) {
            // Internet Explorer, create a new XML document using ActiveX 
            // and use loadXML as a DOM parser. 
            myDocument = new ActiveXObject("Microsoft.XMLDOM");
            myDocument.async = "false";

            myDocument.loadXML(response);
        }

        if (myDocument) {
            result = myDocument.getElementsByTagName("USID-ErrorCode")[0].childNodes[0].nodeValue;
        }
    }
    return result;
}

function getEnvironment() {

    var environment = $('#environment').val();
    var result = {server: 'equitystreaming.bbvanet.com.mx', streaming: 'equitybwt.bbvanet.com.mx'};

    switch (environment){
        case 'teststreaming':
            result.server =  'teststreaming.bbvanet.com.mx';
            result.streaming = 'testbwt.bbvanet.com.mx';
            break;
        case 'equitystreaming':
            result.server =  'equitystreaming.bbvanet.com.mx';
            result.streaming = 'equitybwt.bbvanet.com.mx';
            break;
        case 'wtst':
            result.server =  'wtst.infobolsa.es';
            result.streaming = 'streamingst.infobolsa.es';
            break;
        case 'wtstsb':
            result.server =  'wtstsb.infobolsa.es';
            result.streaming = 'streamingstsb.infobolsa.es';
            break;
        case 'ifbwtsptest':
            result.server =  'ifbwtsptest.infobolsa.es';
            result.streaming = 'streamingifbwtsptest.infobolsa.es';
            break;
        }

    return result;

}

function peticionSID() {


    var environment = getEnvironment($('#environment').val());
    var server = environment.server;
    var streaming = environment.streaming;

    var os = $('#os').val() || '';
    var clientid = $('#clientid').val();
    var profileid = $('#profileid').val() || 'HTBANCOMERST';
    var appname = $('#appname').val() || 'BCMR';
    var browserdata = $('#browserdata').val() || '150.205.102.220';
    var validity = $('#validity').val() || '150000';
    var sessionID = $('#sessionID').val() || 'SESIONEXTERNA';
    var host = $('#host').val() || '';
    var protocol = $('#protocol').val() || 'http';
    
    var url = protocol + '://' + server + '/WTMGRest/sidmg/RequestSid';
    var sid = '';
    var accounts = $('#accounts').val() || '1';
    var debug = $('#debug').val() || '0';

    var language = $('#language').val();
    var thousand = $('#thousand').val();
    var decimal = $('#decimal').val();
    


    var parametros = { clientid: clientid, profileid: profileid, appname: appname, browserdata: browserdata, validity: validity, sessionID: sessionID, host: host };

    // Hacemos la petición para obtener la clave hash
    $.post(url, parametros).success(function (response) {
        sid = getSIDFromResponse(response);
        if (sid !== '') {
            redirectBancomer(os, accounts, debug, protocol, server, streaming, sid, language, thousand, decimal);
        }
    });
}

function redirectBancomer(os, accounts, debug, protocol, server, streaming, sid, language, thousand, decimal) {
    var url = "../site/index.html";

    //Save data (LocalStorage)
    window.sessionStorage.setItem("os", os);
    window.sessionStorage.setItem("accounts", accounts);
    window.sessionStorage.setItem("debug", debug);
    window.sessionStorage.setItem("protocol", protocol);
    window.sessionStorage.setItem("server", server);
    window.sessionStorage.setItem("streaming", streaming);
    window.sessionStorage.setItem("sid", sid);

    window.sessionStorage.setItem("language", language);
    window.sessionStorage.setItem("thousand", thousand);
    window.sessionStorage.setItem("decimal", decimal);
    
    document.location.href = url;
}

var app = {
    // Application Constructor
    initialize: function () {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // `load`, `deviceready`, `offline`, and `online`.
    bindEvents: function () {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of `this` is the event. In order to call the `receivedEvent`
    // function, we must explicity call `app.receivedEvent(...);`
    onDeviceReady: function () {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function (id) {
       // console.log('Received Event: ' + id);
        $('#sendButton').removeAttr("disabled");
    }
};