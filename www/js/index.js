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

 //GLOBAL SCOPE VARS
 var GLat = null;
 var GLng = null;
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
		/*
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
		*/
		
		if(window.localStorage.getItem("email")!=null && window.localStorage.getItem("password")!=null){
			var email = window.localStorage.getItem("email");
			var password = window.localStorage.getItem("password");
			
			uyeKayit(email,password);
		}
		else{
			$(".loginSections").show();
		}
		
    }
};

function uyeKayit(email,password){

	var email = (email===undefined) ? document.getElementById("regEmail").value : email;
	var password = (password===undefined) ? document.getElementById("regPassword").value : password;

	var postData = '{"aksiyon":"uyeKayit","data":{"memberType":"member","email":"'+email+'","password":"'+password+'"}}';

	
	$.post("http://www.sagclick.com/BAKKALDAN/com/bakkaldan/DEBUG/debugger.php", { bilgi: postData}).done(
	function(data){
	
		var sonuc = JSON.parse(data);
		if(sonuc.response==true){
			$(".loginSections").hide();
			window.localStorage.setItem("email", email);
			window.localStorage.setItem("password", password);
			profilBilgilerim();
			
		}
		else{
			window.localStorage.removeItem("email");
			window.localStorage.removeItem("password");
			$(".loginSections").show();
		}
	}
	);
}



function sifremiUnuttum(){

	var email = document.getElementById("forgotEmail").value;

	var postData = '{"aksiyon":"sifremiUnuttum","data":{"memberType":"member","email":"'+email+'"}}';

	
	$.post("http://www.sagclick.com/BAKKALDAN/com/bakkaldan/DEBUG/debugger.php", { bilgi: postData}).done(
	function(data){
	
		var sonuc = JSON.parse(data);
		if(sonuc.response==true){
			alert("Şifreni e-posta adresine gönderdik.");
		}
		else{
			alert("Bir hata oluştu, lütfen tekrar dene.");
		}
	}
	);
}
function cikisYap(){


	var postData = '{"aksiyon":"guvenliCikis","data":{"":""}}';

	
	$.post("http://www.sagclick.com/BAKKALDAN/com/bakkaldan/DEBUG/debugger.php", { bilgi: postData}).done(
	function(data){
		
		var sonuc = JSON.parse(data);
		if(sonuc.response==true){
			window.localStorage.removeItem("email");
			window.localStorage.removeItem("password");
			document.location = "index.html";
		}
		else{
			//	alert("Bir hata oluştu, lütfen tekrar dene.");

		}
	}
	);
}
function profilBilgilerim(){


	var postData = '{"aksiyon":"profilBilgilerim","data":{"":""}}';

	
	$.post("http://www.sagclick.com/BAKKALDAN/com/bakkaldan/DEBUG/debugger.php", { bilgi: postData}).done(
	function(data){
		
		var sonuc = JSON.parse(data);
		if(sonuc.response==true){
			$("#profilAdSoyad").html(sonuc.data.firstName+" "+sonuc.data.lastName);
			$("#profilTelefon").html(sonuc.data.phone);
			if(sonuc.data.state=="beklemede"){
				
				$("#noGpsTextFirstTimer").css("display","block");
				$(".firstTimeSection").fadeToggle(0);
			
			}
			else if(sonuc.data.state=="aktif"){
				DefaultAdresiGetir();
				BakkallariGetir();
				$(".inAppSection").fadeToggle(0);
				
				
			}
			else $(".loginSections").show();
		}
		else{
			$(".loginSections").show();
		}
	}
	);
}

function BakkallariGetir(){
	
	var postData = '{"aksiyon":"bakkallariGetirApp","data":{"":""}}';

	
	$.post("http://www.sagclick.com/BAKKALDAN/com/bakkaldan/DEBUG/debugger.php", { bilgi: postData}).done(
	function(data){
		
		$("#appShopStoreSelectList").html('Dükkanlar yükleniyor.');
		var sonuc = JSON.parse(data);
		if(sonuc.response==true){
			var checkStr = "";
			$("#appShopStoreSelectList").html('');
			for(var i=0;i<sonuc.data.length;i++){

				var odemeSecenekleriStr = "";
				if(sonuc.data[i].krediKarti=='var') odemeSecenekleriStr = odemeSecenekleriStr + '<img src="assets/img/payCCard.png" style="width:24px;margin-top:-5px;margin-left:1px;">';
				if(sonuc.data[i].ticket=='var') odemeSecenekleriStr = odemeSecenekleriStr + '<img src="assets/img/payTicket.png" style="width:24px;margin-top:-5px;margin-left:1px;">';							
											
				checkStr = (i==0) ? "checked" : "";
				$("#appShopStoreSelectList").append('<input type="radio" name="storePicker" value="'+sonuc.data[i].dukkanId+'" '+checkStr+'><label style="  margin-bottom: 7px;  margin-top: 7px;" for="store1"> <span><img src="assets/img/open.png" style="width:24px;margin-top:-10px;margin-left:3px;margin-right:3px"></span><div style="width: 115px;display: inline-block;vertical-align: top;text-transform:capitalize">'+sonuc.data[i].dukkanBaslik+'	</div>	<span style="text-align:right">	<img src="assets/img/payCash.png" style="width:24px;margin-top:-5px;margin-left:1px;">'+odemeSecenekleriStr+'	</span>		</label>	<br>');
			}
		}
		else{
			alert("Bir hata oluştu, lütfen tekrar dene.");
		}
	}
	);
	

}

function siparisVer(){
	var selectedShop = null;
	$("#appShopStoreSelectList :radio").each(function() {
		if($(this)[0].checked===true){
			selectedShop=$(this)[0].value;
		}
	});
	if(selectedShop!==null){
		var message = $("#userNewOrder").val();
		var postData = '{"aksiyon":"siparisVer","data":{"message":"'+message+'","dukkanId":"'+selectedShop+'"}}';
		$.post("http://www.sagclick.com/BAKKALDAN/com/bakkaldan/DEBUG/debugger.php", { bilgi: postData}).done(
			function(data){
		
				var sonuc = JSON.parse(data);
				if(sonuc.response===true){
					$("#userNewOrder").val('');
					SiparislerimiGetir();
					$(".inAppTabs").hide();
					$("#appOrders").fadeIn();
					
				}
				else{
					alert("Sipariş bilgilerine bir göz at.");
				}
			}
		);
	}
	else{
		alert("Dükkan yoksa sipariş de yok.");
	}
}

function SiparislerimiGetir(){
	var postData = '{"aksiyon":"siparislerimiGetir","data":{"":""}}';

	
	$.post("http://www.sagclick.com/BAKKALDAN/com/bakkaldan/DEBUG/debugger.php", { bilgi: postData}).done(
	function(data){
	
		$("#appOrdersList").html('Siparişler yükleniyor.');
		var sonuc = JSON.parse(data);
		if(sonuc.response==true){
			
			$("#appOrdersList").html('');
			for(var i=0;i<sonuc.data.length;i++){
				var checkStr = "";
				if(sonuc.data[i].siparisDurumu=='gOnay'){
					checkStr = checkStr + '<img style="width:14px;vertical-align:initial;" src="assets/img/check.png">';

				}
				else if(sonuc.data[i].siparisDurumu=='aIptal'){
					checkStr = checkStr + '<img style="width:14px;vertical-align:initial;" src="assets/img/check.png">';
					checkStr = checkStr + '<img style="width:14px;vertical-align:initial;" src="assets/img/cross.png">';

				}
				else if(sonuc.data[i].siparisDurumu=='aOnay'){
					checkStr = checkStr + '<img style="width:14px;vertical-align:initial;" src="assets/img/check.png">';
					checkStr = checkStr + '<img style="width:14px;vertical-align:initial;" src="assets/img/check.png">';

				}
				else if(sonuc.data[i].siparisDurumu=='gIptal'){
					checkStr = checkStr + '<img style="width:14px;vertical-align:initial;" src="assets/img/cross.png">';

				}
			
				var operasyonButonuStr = "";
				if(sonuc.data[i].siparisDurumu=='gOnay') operasyonButonuStr = operasyonButonuStr + '<button onclick="SiparisIptal('+sonuc.data[i].siparisId+')" class="btn" style="margin: -4px 5px 0px 0px;background-color:#D94200;color:#fff;height:22px;padding:0px 5px;"> X </button>';
											
				$("#appOrdersList").append('<div id="appOrder01"  style="  padding: 10px 0px;  border-bottom-color: rgb(119, 119, 119);  border-bottom-style: solid;  border-bottom-width: 1px;">	<div id="appOrder01Cancel" style="display:inline-block">'+operasyonButonuStr+'</div><div id="appOrder01Title"  style="display:inline-block" > <span id="appOrder01Store" style="font-weight:bold">'+sonuc.data[i].dukkanBaslik+'</span>	<span id="appOrder01Time" style="font-size: 0.7em;">'+sonuc.data[i].siparisZamani+'</span> <span id="appOrder01Status">'+checkStr+'</span>	</div>	<div id="appOrder01Details" class="appOrderDetails" style="font-size: 0.7em;padding-left:5px"> <b>'+sonuc.data[i].gonderenAdresBaslik+' - </b> '+sonuc.data[i].siparisIcerik+'</div></div>');
			}
		}
		else{
			$("#appOrdersList").html('');
			//alert("Bir hata oluştu, lütfen tekrar dene.");
		}
	}
	);
}


function SiparisIptal(siparisId){
	if(confirm("Siparişini iptal edelim mi?")==true){
		var postData = '{"aksiyon":"siparisIptal","data":{"siparisId":"'+siparisId+'"}}';

		
		$.post("http://www.sagclick.com/BAKKALDAN/com/bakkaldan/DEBUG/debugger.php", { bilgi: postData}).done(
		function(data){
		
			var sonuc = JSON.parse(data);
			if(sonuc.response==true){
				SiparislerimiGetir();
			}
			else{
				alert("Bir hata oluştu, lütfen tekrar dene.");
			}
		}
		);
	}
}

function AdreslerimiGetir(){
	
	var postData = '{"aksiyon":"adreslerimiGetir","data":{"":""}}';

	
	$.post("http://www.sagclick.com/BAKKALDAN/com/bakkaldan/DEBUG/debugger.php", { bilgi: postData}).done(
	function(data){
	
		$("#addressPopulatingForm").html('Adreslerin yükleniyor.');
		var sonuc = JSON.parse(data);
		if(sonuc.response===true){
			var checkStr = "";
			var defaultStr = "";
			$("#addressPopulatingForm").html('');
			for(var i=0;i<sonuc.data.length;i++){
				
				checkStr = (i===0) ? "checked" : "";
				defaultStr = (i===0) ? "(Aktif)" : "";
				$("#addressPopulatingForm").append('<br><input type="radio" name="addressPicker" onclick="DefaultAdresimYap(\''+sonuc.data[i].adresId+'\')" '+checkStr+'>	<label style="  margin-bottom: 7px;  margin-top: 7px;text-transform:capitalize" for="Adresim">'+sonuc.data[i].adresBaslik+defaultStr+'</label>	<button class="btn" style="display:inline-block;position:relative;float:right;background-color:#D94200;color:#fff;height:23px;padding:0px 5px;margin-top:8px;margin-left:8px;" onclick="AdresSil(\''+sonuc.data[i].adresId+'\',\''+sonuc.data[i].adresBaslik+'\');return false;"> X </button><button class="btn" style="display:inline-block;position:relative;float:right;background-color:#00A2D9;color:#fff;height:23px;padding:0px 3px;margin-top:8px;" onclick="AdresDuzenlenecek(\''+sonuc.data[i].adresId+'\');return false;">Düzenle</button>');
			}
		}
		else{
			$("#addressPopulatingForm").html('');
			alert("Bir hata oluştu, lütfen tekrar dene.");
		}
	}
	);
	

}

function AdresSil(adresId,adresBaslik){
	if(confirm(adresBaslik + " adresini silelim mi?")==true){
		var postData = '{"aksiyon":"adresSil","data":{"adresId":"'+adresId+'"}}';

		
		$.post("http://www.sagclick.com/BAKKALDAN/com/bakkaldan/DEBUG/debugger.php", { bilgi: postData}).done(
		function(data){
		
			var sonuc = JSON.parse(data);
			if(sonuc.response==true){
				AdreslerimiGetir();
			}
			else{
				alert("En az 1 kayıtlı adresin olmalı.");
			}
		}
		);
	}
}

function DefaultAdresimYap(adresId){
	
	var postData = '{"aksiyon":"adresDefault","data":{"adresId":"'+adresId+'"}}';

	
	$.post("http://www.sagclick.com/BAKKALDAN/com/bakkaldan/DEBUG/debugger.php", { bilgi: postData}).done(
	function(data){
		
		var sonuc = JSON.parse(data);
		if(sonuc.response==true){
			AdreslerimiGetir();
		}
		else{
			alert("Bir hata oluştu, lütfen tekrar dene.");
		}
	}
	);
	
}

function DefaultAdresiGetir(){
	
	var postData = '{"aksiyon":"defaultAdresiGetir","data":{"":""}}';

	
	$.post("http://www.sagclick.com/BAKKALDAN/com/bakkaldan/DEBUG/debugger.php", { bilgi: postData}).done(
	function(data){
		
		var sonuc = JSON.parse(data);
		if(sonuc.response==true){
	
			$("#siparisDefaultAdres").html(sonuc.data.defaultAdresBaslik);
		}
		else{
			alert("Bir hata oluştu, lütfen tekrar dene.");
		}
	}
	);
	
}
function IlkDefaAdresEkleme(){
	
	function onSuccess(position) {
		alert("Bulduk Seni!");
		
		$("#gpstenBulButonuFirstTime").prop("disabled", false);
		$("#gpstenBulButonuFirstTime").text('GPS\'i AÇTIM, BENİ BUL');
		$("#noGpsTextFirstTimer").css("display","none");
		$("#addedFirstAddressList").css("display","block");
		GLat = position.coords.latitude;
		GLng = position.coords.longitude;
		initializeNew();
	};


	function onError(error) {
		alert("GPS'ini açıp, tekrar dene.");
		$("#gpstenBulButonuFirstTime").prop("disabled", false);
		$("#gpstenBulButonuFirstTime").text('GPS\'i AÇTIM, BENİ BUL');
		$("#addedFirstAddressList").css("display","none");
		$("#noGpsTextFirstTimer").css("display","block");
	}

	navigator.geolocation.getCurrentPosition(onSuccess, onError, {  enableHighAccuracy: true });
	$("#gpstenBulButonuFirstTime").prop("disabled", true);
	$("#gpstenBulButonuFirstTime").text("AZ KALDI, SENİ BULMAK ÜZEREYİZ");
}
function YeniAdresEkleme(){


	function onSuccess(position) {
		alert("Bulduk Seni!");

		$("#gpstenBulButonu").prop("disabled", false);
		$("#gpstenBulButonu").text('GPS\'i AÇTIM, BENİ BUL');
		$("#noGpsText").css("display","none");
		$("#genelAdresGirme").css("display","block");
		$("#adresEklemeDuzenleme").html('<button type="submit" class="btn" style="width:48%;width: 48%;background-color:rgb(189, 53, 53);color:white;" onclick=\'VazgecKapama();return false;\'>VAZGEÇ</button>	<button type="submit" class="btn btn-blue " style="width:48%" onclick=\'YeniAdresKaydi("InApp");return false;\' >KAYDET</button>');
		GLat = position.coords.latitude;
		GLng = position.coords.longitude;
		initialize();
	};


	function onError(error) {
		alert("GPS'ini açıp, tekrar dene.");
		$("#gpstenBulButonu").prop("disabled", false);
		$("#gpstenBulButonu").text('GPS\'i AÇTIM, BENİ BUL');
		$("#genelAdresGirme").css("display","none");
		$("#noGpsText").css("display","block");
	}

	navigator.geolocation.getCurrentPosition(onSuccess, onError, {  enableHighAccuracy: true });
	$("#gpstenBulButonu").prop("disabled", true);
	$("#gpstenBulButonu").text("AZ KALDI, SENİ BULMAK ÜZEREYİZ");

}

function YeniAdresKaydi(str){
	
	var title = $("#addressTitle"+str).val();
	var directions = $("#addressDirection"+str).val();
	if(GLat!==null && GLng!==null){
		var postData = '{"aksiyon":"adresEkle","data":{"title":"'+title+'","directions":"'+directions+'","lat":"'+GLat+'","lng":"'+GLng+'"}}';
		if(str=="FirstTimer"){
			var name = $("#nameSurname").val();
			var phone = $("#userTel").val();
			postData = '{"aksiyon":"ilkKayitGuncelleme","data":{"name":"'+name+'","phone":"'+phone+'","title":"'+title+'","directions":"'+directions+'","lat":"'+GLat+'","lng":"'+GLng+'"}}';
		}

		$.post("http://www.sagclick.com/BAKKALDAN/com/bakkaldan/DEBUG/debugger.php", { bilgi: postData}).done(
		function(data){
			
			var sonuc = JSON.parse(data);
			if(sonuc.response==true){
				
				if(str=="InApp"){
					AdreslerimiGetir();
					$("#addNewAddress").hide();
					$("#addedAddressList").fadeIn();
				}
				else{
					$("#profilAdSoyad").html(name);
					$("#profilTelefon").html(phone);
					DefaultAdresiGetir();
					BakkallariGetir();
					$(".firstTimeSection").delay(1500).toggle(0);
					$(".inAppSection").delay(2500).fadeToggle(0);
					
				}
				
			}
			else{
				alert("Bir hata oluştu, lütfen tekrar dene.");
			}
		}
		);
		
	}
}

function AdresDuzenlenecek(adresId){
	var postData = '{"aksiyon":"adresBilgileriniGetir","data":{"adresId":"'+adresId+'"}}';

	
	$.post("http://www.sagclick.com/BAKKALDAN/com/bakkaldan/DEBUG/debugger.php", { bilgi: postData}).done(
	function(data){

		var sonuc = JSON.parse(data);
		if(sonuc.response==true){
			$("#gpstenBulButonu").prop("disabled", false);
			$("#gpstenBulButonu").text('GPS\'i AÇTIM, BENİ BUL');
			$("#addNewAddress").hide();
			$("#addedAddressList").hide();
			$("#addNewAddress").fadeIn();
			$("#noGpsText").css("display","none");
			$("#genelAdresGirme").css("display","block");
			$("#adresEklemeDuzenleme").html('<button type="submit" class="btn" style="width:48%;width: 48%;background-color:rgb(189, 53, 53);color:white;" onclick=\'VazgecKapama();return false;\'>VAZGEÇ</button>	<button type="submit" class="btn btn-blue " style="width:48%" onclick=\'AdresDuzenle("'+adresId+'");return false;\' >KAYDET</button>');

			$("#addressTitleInApp").val(sonuc.data.addressTitle);
			$("#addressDirectionInApp").val(sonuc.data.addressDirections);
			GLat=sonuc.data.addressLat;
			GLng=sonuc.data.addressLng;
			initialize();
			  
			
		}
		else{
			alert("Bir hata oluştu, lütfen tekrar dene.");
		}
	}
	);
}

function VazgecKapama(){
	
	$("#addNewAddress").hide();
	$("#addedAddressList").delay(500).fadeIn(0);
}

function AdresDuzenle(adresId){
	var title = $("#addressTitleInApp").val();
	var directions = $("#addressDirectionInApp").val();
	if(GLat!==null && GLng!==null){
		var postData = '{"aksiyon":"adresDuzenle","data":{"adresId":"'+adresId+'","title":"'+title+'","directions":"'+directions+'","lat":"'+GLat+'","lng":"'+GLng+'"}}';

		
		$.post("http://www.sagclick.com/BAKKALDAN/com/bakkaldan/DEBUG/debugger.php", { bilgi: postData}).done(
		function(data){
		
			var sonuc = JSON.parse(data);
			if(sonuc.response==true){
				AdreslerimiGetir();
				
				$("#addNewAddress").hide();
				$("#addedAddressList").fadeIn();
				
			}
			else{
				alert("Bir hata oluştu, lütfen tekrar dene.");
			}
		}
		);
		
	}
}

function BeniBul(str){
	function onSuccess(position) {
		alert("Bulduk Seni!");
		
		 GLat = position.coords.latitude;
		 GLng = position.coords.longitude;
		 if(str==undefined) initialize();
		 else if(str=="new") initializeNew();
	};


	function onError(error) {
		alert("GPS'ini açıp, tekrar dene.");
		$("#gpstenBulButonu").prop("disabled", false);
		$("#gpstenBulButonu").text('GPS\'i AÇTIM, BENİ BUL');
		$("#genelAdresGirme").css("display","none");
		$("#noGpsText").css("display","block");
	}

	navigator.geolocation.getCurrentPosition(onSuccess, onError, {  enableHighAccuracy: true });
	$("#gpstenBulButonu").prop("disabled", true);
	$("#gpstenBulButonu").text("AZ KALDI, SENİ BULMAK ÜZEREYİZ");
}
