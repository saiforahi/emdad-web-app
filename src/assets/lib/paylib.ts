export function(w) {
	var paylib = {
		cards: [
			{type: "meeza",		pattern: /^507803/,		cvv: 3, luhn: true},
			{type: "meeza",		pattern: /^507808/,		cvv: 3, luhn: true},
			{type: "meeza",		pattern: /^507809/,		cvv: 3, luhn: true},
			{type: "meeza",		pattern: /^507810/,		cvv: 3, luhn: true},
			{type: "omannet",	pattern: /^400282/,		cvv: 3, luhn: true},
			{type: "omannet",	pattern: /^402004/,		cvv: 3, luhn: true},
			{type: "omannet",	pattern: /^403803/,		cvv: 3, luhn: true},
			{type: "omannet",	pattern: /^404029/,		cvv: 3, luhn: true},
			{type: "omannet",	pattern: /^407545/,		cvv: 3, luhn: true},
			{type: "omannet",	pattern: /^410469/,		cvv: 3, luhn: true},
			{type: "omannet",	pattern: /^413298/,		cvv: 3, luhn: true},
			{type: "omannet",	pattern: /^419244/,		cvv: 3, luhn: true},
			{type: "omannet",	pattern: /^419291/,		cvv: 3, luhn: true},
			{type: "omannet",	pattern: /^422610/,		cvv: 3, luhn: true},
			{type: "omannet",	pattern: /^422681/,		cvv: 3, luhn: true},
			{type: "omannet",	pattern: /^422820/,		cvv: 3, luhn: true},
			{type: "omannet",	pattern: /^422821/,		cvv: 3, luhn: true},
			{type: "omannet",	pattern: /^422822/,		cvv: 3, luhn: true},
			{type: "omannet",	pattern: /^422823/,		cvv: 3, luhn: true},
			{type: "omannet",	pattern: /^426371/,		cvv: 3, luhn: true},
			{type: "omannet",	pattern: /^426372/,		cvv: 3, luhn: true},
			{type: "omannet",	pattern: /^426681/,		cvv: 3, luhn: true},
			{type: "omannet",	pattern: /^428257/,		cvv: 3, luhn: true},
			{type: "omannet",	pattern: /^432410/,		cvv: 3, luhn: true},
			{type: "omannet",	pattern: /^432415/,		cvv: 3, luhn: true},
			{type: "omannet",	pattern: /^433084/,		cvv: 3, luhn: true},
			{type: "omannet",	pattern: /^433236/,		cvv: 3, luhn: true},
			{type: "omannet",	pattern: /^433829/,		cvv: 3, luhn: true},
			{type: "omannet",	pattern: /^435949/,		cvv: 3, luhn: true},
			{type: "omannet",	pattern: /^437425/,		cvv: 3, luhn: true},
			{type: "omannet",	pattern: /^437426/,		cvv: 3, luhn: true},
			{type: "omannet",	pattern: /^437427/,		cvv: 3, luhn: true},
			{type: "omannet",	pattern: /^437569/,		cvv: 3, luhn: true},
			{type: "omannet",	pattern: /^439357/,		cvv: 3, luhn: true},
			{type: "omannet",	pattern: /^447168/,		cvv: 3, luhn: true},
			{type: "omannet",	pattern: /^456595/,		cvv: 3, luhn: true},
			{type: "omannet",	pattern: /^464156/,		cvv: 3, luhn: true},
			{type: "omannet",	pattern: /^464157/,		cvv: 3, luhn: true},
			{type: "omannet",	pattern: /^464175/,		cvv: 3, luhn: true},
			{type: "omannet",	pattern: /^464426/,		cvv: 3, luhn: true},
			{type: "omannet",	pattern: /^467362/,		cvv: 3, luhn: true},
			{type: "omannet",	pattern: /^473820/,		cvv: 3, luhn: true},
			{type: "omannet",	pattern: /^483791/,		cvv: 3, luhn: true},
			{type: "omannet",	pattern: /^484130/,		cvv: 3, luhn: true},
			{type: "omannet",	pattern: /^484131/,		cvv: 3, luhn: true},
			{type: "omannet",	pattern: /^484172/,		cvv: 3, luhn: true},
			{type: "omannet",	pattern: /^489091/,		cvv: 3, luhn: true},
			{type: "omannet",	pattern: /^490907/,		cvv: 3, luhn: true},
			{type: "omannet",	pattern: /^510723/,		cvv: 3, luhn: true},
			{type: "omannet",	pattern: /^515722/,		cvv: 3, luhn: true},
			{type: "omannet",	pattern: /^523672/,		cvv: 3, luhn: true},
			{type: "omannet",	pattern: /^524278/,		cvv: 3, luhn: true},
			{type: "omannet",	pattern: /^528647/,		cvv: 3, luhn: true},
			{type: "omannet",	pattern: /^528669/,		cvv: 3, luhn: true},
			{type: "omannet",	pattern: /^533117/,		cvv: 3, luhn: true},
			{type: "omannet",	pattern: /^534417/,		cvv: 3, luhn: true},
			{type: "omannet",	pattern: /^535981/,		cvv: 3, luhn: true},
			{type: "omannet",	pattern: /^536028/,		cvv: 3, luhn: true},
			{type: "omannet",	pattern: /^539150/,		cvv: 3, luhn: true},
			{type: "omannet",	pattern: /^542160/,		cvv: 3, luhn: true},
			{type: "omannet",	pattern: /^549184/,		cvv: 3, luhn: true},
			{type: "omannet",	pattern: /^559071/,		cvv: 3, luhn: true},
			{type: "omannet",	pattern: /^559406/,		cvv: 3, luhn: true},
			{type: "omannet",	pattern: /^559407/,		cvv: 3, luhn: true},
			{type: "omannet",	pattern: /^559753/,		cvv: 3, luhn: true},
			{type: "omannet",	pattern: /^588855/,		cvv: 3, luhn: true},
			{type: "omannet",	pattern: /^601722/,		cvv: 3, luhn: true},
			{type: "mada",		pattern: /^401757/,		cvv: 3, luhn: true},
			{type: "mada",		pattern: /^407197/,		cvv: 3, luhn: true},
			{type: "mada",		pattern: /^407395/,		cvv: 3, luhn: true},
			{type: "mada",		pattern: /^409201/,		cvv: 3, luhn: true},
			{type: "mada",		pattern: /^410685/,		cvv: 3, luhn: true},
			{type: "mada",		pattern: /^417633/,		cvv: 3, luhn: true},
			{type: "mada",		pattern: /^419593/,		cvv: 3, luhn: true},
			{type: "mada",		pattern: /^422817/,		cvv: 3, luhn: true},
			{type: "mada",		pattern: /^422818/,		cvv: 3, luhn: true},
			{type: "mada",		pattern: /^422819/,		cvv: 3, luhn: true},
			{type: "mada",		pattern: /^428331/,		cvv: 3, luhn: true},
			{type: "mada",		pattern: /^428671/,		cvv: 3, luhn: true},
			{type: "mada",		pattern: /^428672/,		cvv: 3, luhn: true},
			{type: "mada",		pattern: /^428673/,		cvv: 3, luhn: true},
			{type: "mada",		pattern: /^431361/,		cvv: 3, luhn: true},
			{type: "mada",		pattern: /^432328/,		cvv: 3, luhn: true},
			{type: "mada",		pattern: /^434107/,		cvv: 3, luhn: true},
			{type: "mada",		pattern: /^439954/,		cvv: 3, luhn: true},
			{type: "mada",		pattern: /^440533/,		cvv: 3, luhn: true},
			{type: "mada",		pattern: /^440647/,		cvv: 3, luhn: true},
			{type: "mada",		pattern: /^440795/,		cvv: 3, luhn: true},
			{type: "mada",		pattern: /^445564/,		cvv: 3, luhn: true},
			{type: "mada",		pattern: /^446393/,		cvv: 3, luhn: true},
			{type: "mada",		pattern: /^446404/,		cvv: 3, luhn: true},
			{type: "mada",		pattern: /^446672/,		cvv: 3, luhn: true},
			{type: "mada",		pattern: /^455036/,		cvv: 3, luhn: true},
			{type: "mada",		pattern: /^455708/,		cvv: 3, luhn: true},
			{type: "mada",		pattern: /^457865/,		cvv: 3, luhn: true},
			{type: "mada",		pattern: /^458456/,		cvv: 3, luhn: true},
			{type: "mada",		pattern: /^462220/,		cvv: 3, luhn: true},
			{type: "mada",		pattern: /^468540/,		cvv: 3, luhn: true},
			{type: "mada",		pattern: /^468541/,		cvv: 3, luhn: true},
			{type: "mada",		pattern: /^468542/,		cvv: 3, luhn: true},
			{type: "mada",		pattern: /^468543/,		cvv: 3, luhn: true},
			{type: "mada",		pattern: /^483010/,		cvv: 3, luhn: true},
			{type: "mada",		pattern: /^483011/,		cvv: 3, luhn: true},
			{type: "mada",		pattern: /^483012/,		cvv: 3, luhn: true},
			{type: "mada",		pattern: /^486094/,		cvv: 3, luhn: true},
			{type: "mada",		pattern: /^486095/,		cvv: 3, luhn: true},
			{type: "mada",		pattern: /^486096/,		cvv: 3, luhn: true},
			{type: "mada",		pattern: /^489318/,		cvv: 3, luhn: true},
			{type: "mada",		pattern: /^489319/,		cvv: 3, luhn: true},
			{type: "mada",		pattern: /^493428/,		cvv: 3, luhn: true},
			{type: "mada",		pattern: /^504300/,		cvv: 3, luhn: true},
			{type: "mada",		pattern: /^508160/,		cvv: 3, luhn: true},
			{type: "mada",		pattern: /^513213/,		cvv: 3, luhn: true},
			{type: "mada",		pattern: /^520058/,		cvv: 3, luhn: true},
			{type: "mada",		pattern: /^521076/,		cvv: 3, luhn: true},
			{type: "mada",		pattern: /^524130/,		cvv: 3, luhn: true},
			{type: "mada",		pattern: /^524514/,		cvv: 3, luhn: true},
			{type: "mada",		pattern: /^529415/,		cvv: 3, luhn: true},
			{type: "mada",		pattern: /^529741/,		cvv: 3, luhn: true},
			{type: "mada",		pattern: /^530060/,		cvv: 3, luhn: true},
			{type: "mada",		pattern: /^530906/,		cvv: 3, luhn: true},
			{type: "mada",		pattern: /^531095/,		cvv: 3, luhn: true},
			{type: "mada",		pattern: /^531196/,		cvv: 3, luhn: true},
			{type: "mada",		pattern: /^532013/,		cvv: 3, luhn: true},
			{type: "mada",		pattern: /^535825/,		cvv: 3, luhn: true},
			{type: "mada",		pattern: /^535989/,		cvv: 3, luhn: true},
			{type: "mada",		pattern: /^536023/,		cvv: 3, luhn: true},
			{type: "mada",		pattern: /^537767/,		cvv: 3, luhn: true},
			{type: "mada",		pattern: /^539931/,		cvv: 3, luhn: true},
			{type: "mada",		pattern: /^543085/,		cvv: 3, luhn: true},
			{type: "mada",		pattern: /^543357/,		cvv: 3, luhn: true},
			{type: "mada",		pattern: /^549760/,		cvv: 3, luhn: true},
			{type: "mada",		pattern: /^554180/,		cvv: 3, luhn: true},
			{type: "mada",		pattern: /^557606/,		cvv: 3, luhn: true},
			{type: "mada",		pattern: /^558848/,		cvv: 3, luhn: true},
			{type: "mada",		pattern: /^585265/,		cvv: 3, luhn: true},
			{type: "mada",		pattern: /^588845/,		cvv: 3, luhn: true},
			{type: "mada",		pattern: /^588846/,		cvv: 3, luhn: true},
			{type: "mada",		pattern: /^588848/,		cvv: 3, luhn: true},
			{type: "mada",		pattern: /^588849/,		cvv: 3, luhn: true},
			{type: "mada",		pattern: /^588850/,		cvv: 3, luhn: true},
			{type: "mada",		pattern: /^588982/,		cvv: 3, luhn: true},
			{type: "mada",		pattern: /^588983/,		cvv: 3, luhn: true},
			{type: "mada",		pattern: /^589005/,		cvv: 3, luhn: true},
			{type: "mada",		pattern: /^589206/,		cvv: 3, luhn: true},
			{type: "mada",		pattern: /^604906/,		cvv: 3, luhn: true},
			{type: "mada",		pattern: /^605141/,		cvv: 3, luhn: true},
			{type: "mada",		pattern: /^636120/,		cvv: 3, luhn: true},
			{type: "mada",		pattern: /^968201/,		cvv: 3, luhn: true},
			{type: "mada",		pattern: /^968202/,		cvv: 3, luhn: true},
			{type: "mada",		pattern: /^968203/,		cvv: 3, luhn: true},
			{type: "mada",		pattern: /^968204/,		cvv: 3, luhn: true},
			{type: "mada",		pattern: /^968205/,		cvv: 3, luhn: true},
			{type: "mada",		pattern: /^968206/,		cvv: 3, luhn: true},
			{type: "mada",		pattern: /^968207/,		cvv: 3, luhn: true},
			{type: "mada",		pattern: /^968208/,		cvv: 3, luhn: true},
			{type: "mada",		pattern: /^968209/,		cvv: 3, luhn: true},
			{type: "mada",		pattern: /^968210/,		cvv: 3, luhn: true},
			{type: "mada",		pattern: /^968211/,		cvv: 3, luhn: true},
			{type: "jcb",		pattern: /^1800/,		cvv: 3, luhn: true},
			{type: "jcb",		pattern: /^2131/,		cvv: 3, luhn: true},
			{type: "mastercard",	pattern: /^222[123456789]/,	cvv: 3, luhn: true},
			{type: "mastercard",	pattern: /^22[3456789]/,	cvv: 3, luhn: true},
			{type: "mastercard",	pattern: /^2[3456]/,		cvv: 3, luhn: true},
			{type: "mastercard",	pattern: /^27[01]/,		cvv: 3, luhn: true},
			{type: "mastercard",	pattern: /^2720/,		cvv: 3, luhn: true},
			{type: "diners",	pattern: /^30[0-5]/,		cvv: 3, luhn: true},
			{type: "amex",		pattern: /^3[47]/,		cvv: 4, luhn: true},
			{type: "jcb",		pattern: /^352[89]/,		cvv: 3, luhn: true},
			{type: "jcb",		pattern: /^35[345678]/,		cvv: 3, luhn: true},
			{type: "diners",	pattern: /^36/,			cvv: 3, luhn: true},
			{type: "diners",	pattern: /^38/,			cvv: 3, luhn: true},
			{type: "electron",	pattern: /^4026/,		cvv: 3, luhn: true},
			{type: "electron",	pattern: /^417500/,		cvv: 3, luhn: true},
			{type: "electron",	pattern: /^4405/,		cvv: 3, luhn: true},
			{type: "electron",	pattern: /^4508/,		cvv: 3, luhn: true},
			{type: "electron",	pattern: /^4844/,		cvv: 3, luhn: true},
			{type: "electron",	pattern: /^491[37]/,		cvv: 3, luhn: true},
			{type: "visa",		pattern: /^4/,			cvv: 3, luhn: true},
			{type: "maestro",	pattern: /^5018/,		cvv: 3, luhn: true},
			{type: "dankort",	pattern: /^5019/,		cvv: 3, luhn: true},
			{type: "maestro",	pattern: /^5020/,		cvv: 3, luhn: true},
			{type: "maestro",	pattern: /^5038/,		cvv: 3, luhn: true},
			{type: "rupay",		pattern: /^508[56789]/,		cvv: 3, luhn: true},
			{type: "mastercard",	pattern: /^5/,			cvv: 3, luhn: true},
			{type: "rupay",		pattern: /^606[123456789]/,	cvv: 3, luhn: true},
			{type: "rupay",		pattern: /^60[78]/,		cvv: 3, luhn: true},
			{type: "discover",	pattern: /^6011/,		cvv: 3, luhn: true},
			{type: "cup",		pattern: /^62[24568]/,		cvv: 3, luhn: false},
			{type: "cup",		pattern: /^81719/,		cvv: 3, luhn: false},
			{type: "rupay",		pattern: /^627387/,		cvv: 3, luhn: true},
			{type: "maestro",	pattern: /^6304/,		cvv: 3, luhn: true},
			{type: "discover",	pattern: /^64[4-9]/,		cvv: 3, luhn: true},
			{type: "rupay",		pattern: /^6521[56789]/,	cvv: 3, luhn: true},
			{type: "rupay",		pattern: /^652[23456789]/,	cvv: 3, luhn: true},
			{type: "rupay",		pattern: /^6530/,		cvv: 3, luhn: true},
			{type: "rupay",		pattern: /^6531[01234]/,	cvv: 3, luhn: true},
			{type: "discover",	pattern: /^65/,			cvv: 3, luhn: true},
			{type: "maestro",	pattern: /^6703/,		cvv: 3, luhn: true},
			{type: "maestro",	pattern: /^6706/,		cvv: 3, luhn: true},
			{type: "maestro",	pattern: /^6709/,		cvv: 3, luhn: true},
			{type: "maestro",	pattern: /^6759/,		cvv: 3, luhn: true},
			{type: "maestro",	pattern: /^676[1-3]/,		cvv: 3, luhn: true},
			{type: "maestro",	pattern: /^6771/,		cvv: 3, luhn: true}]
	}
	var cs = "";
	paylib.card = {
		last: "",
		lastType: "",
		enabled: false
	}
	paylib.card.cardInfo = function(pan) {
		pan = paylib.util.digitsOnly(pan);
		if (pan.length<3) { return null; }
		var ci,i,len
		for (i=0,len=paylib.cards.length; i<len; i++) {
			ci=paylib.cards[i];
			if (ci.pattern.test(pan)) return ci
		}
		return null;
	}
	paylib.card.cardType = function(pan) {
		var ci = paylib.card.cardInfo(pan);
		if (ci) {
			var ct=paylib.util.lowerAlphaOnly(ci.type);
			if (ct.length > 0) {
				return ct;
			}
		}
		return "unknown"
	}
	paylib.card.identify = function(pan) {
		var ct = paylib.card.cardType(pan);
		if (ct != paylib.card.lastType) {
			paylib.card.lastType=ct;
			var accepted = false;
			if (ct !== "unknown") {
				if (paylib._payform.cardsAllowed[ct]>0) {
					accepted = true;
				}
			}
			try {
				paylib._payform.notifyCardType(ct,accepted);
			} catch(e) {
			}
		}
	}
	paylib.card.formatNumber = function(pan) {
		pan = paylib.util.digitsOnly(pan);
		if (pan.length<4 || pan.length>19) { return pan; }
		var format = /(\d{1,4})(\d{1,4})?(\d{1,4})?(\d{1,4})?/;
		switch (pan.length) {
			case 17: format = /(\d{1,4})(\d{1,4})(\d{1,4})(\d{1,5})/; break;
			case 18: format = /(\d{1,6})(\d{1,12})/; break;
			case 19: format = /(\d{1,6})(\d{1,13})/; break;
		}
		if (paylib.card.cardType(pan)=="amex") {
			if (pan.length<=15) {
				format = /(\d{1,4})(\d{1,6})?(\d{1,5})?/;
			} else {
				format = /(\d{1,19})/;
			}
		}
		var parts = format.exec(pan);
		parts.shift();
		var result = paylib.util.trimString(parts.join(" "));
		return result;
	}
	paylib.card.formatNumberFinal = function(pan) {
		pan = paylib.util.digitsOnly(pan);
		var format
		switch (pan.length) {
			case 13: format = /(\d{1,4})(\d{1,4})(\d{1,5})/; break;
			case 14: format = /(\d{1,4})(\d{1,6})(\d{1,4})/; break;
			case 15: format = /(\d{1,4})(\d{1,6})(\d{1,5})/; break;
			case 16: format = /(\d{1,4})(\d{1,4})(\d{1,4})(\d{1,4})/; break;
			case 17: format = /(\d{1,4})(\d{1,4})(\d{1,4})(\d{1,5})/; break;
			case 18: format = /(\d{1,6})(\d{1,12})/; break;
			case 19: format = /(\d{1,6})(\d{1,13})/; break;
			default: return pan;
		}
		var parts = format.exec(pan);
		parts.shift();
		var result = paylib.util.trimString(parts.join(" "));
		return result;
	}
	paylib.card.luhnCheck = function(pan) {
		pan = paylib.util.digitsOnly(pan);
		var ca, sum = 0, mul = 0;
		var len = pan.length;
		while (len--) {
			ca = parseInt(pan.charAt(len),10) << mul;
			ca > 9 ? sum+=ca-9 : sum+=ca
			mul = 1 - mul;
		}
		return (sum%10 === 0) && (sum > 0);
	}
	paylib.card.panCheckValid = function(pan) {
		pan = paylib.util.digitsOnly(pan);
		if (pan.length<13 || pan.length>19) { return {valid: false, ci: null}; }
		var ci = paylib.card.cardInfo(pan)
		if (!ci) { return {valid: false, ci: null}; }
		if (ci.type=="amex") {
			if (pan.length!=15) { return {valid: false, ci: ci}; }
		}
		if (ci.luhn) {
			if (!paylib.card.luhnCheck(pan)) {
				return {valid: false, ci: ci};
			}
		}
		return {valid: true, ci: ci};
	}
	paylib.card.expiryCheckValid = function(exm, exy) {
		if (exy > 0 && exy < 100) { exy+=2000; }
		if (exm < 1 || exm > 12) { return "month"; }
		if (exy < 2018 || exy > 2099) { return "year"; }
		var month = (new Date).getMonth() + 1;
		var year = (new Date).getFullYear();
		if (exy < year) { return "year"; }
		if (exy == year && exm < month) { return "month"; }
		return null;
	}
	paylib.card.maskPan = function(pan) {
		var panm
		if (pan.length>4) {
			pan = paylib.card.formatNumberFinal(pan);
			panm = pan.replace(/\d/g,"#");
			var l = pan.length
			panm = panm.substring(0,l-4)+pan.substring(l-4)
		} else {
			panm = pan.replace(/\d/g,"#");
		}
		return panm;
	}
	paylib.card.maskCVV = function(cvv) {
		return cvv.replace(/\d/g,"#");
	}
	paylib.card.panChanged = function(evnt) {
		return setTimeout(function(t) {
			return function() {
				var v = paylib.util.trimString(paylib.util.getStr(t));
				if (v != paylib.card.last) {
					paylib._payform.clearErrors();
					v = paylib.card.formatNumber(v);
					paylib.util.set(t,v);
					paylib.card.last = v
					paylib.card.identify(v);
					paylib._payform.notifyCardChanged();
				}
				return true;
			}
		}(evnt.target));
	}
	paylib.card.panTyped = function(evnt) {
		if (paylib.util.controlKey(evnt)) { return true; }
		if (evnt.which<48 || evnt.which>57) {
			if (evnt.which!=32) { return paylib.util.stopEvent(evnt); }
		}
		paylib._payform.clearErrors();
		if (evnt.which==32) { return true; }
		// Adding a digit to the field
		var t = evnt.target;
		if (paylib.util.hasTextSelection(t)) { return true; }
		var v=paylib.util.digitsOnly(paylib.util.getStr(evnt.target));
		if (v.length>18) {
			return paylib.util.stopEvent(evnt);
		}
		return true;
	}
	paylib.card.panInput = function(evnt) {
		var t = evnt.target;
		var v = paylib.util.getStr(t);
		if (v === paylib.card.last) {
			return true;
		}
		paylib._payform.clearErrors();
		var cp = Math.max(t.selectionStart,t.selectionEnd);
		if (cp >= v.length) {
			// Typing at end of input
			if (/\s+$/.test(v)) {
				v = paylib.card.formatNumber(v)+" ";
			} else {
				v = paylib.card.formatNumber(v);
			}
			cp=v.length+8;
		} else {
			// Typing at start/middle of input. Adjust position to account for spaces after formatting
			var c,d=0,s=0;
			for (c = cp-1; c>=0; c--) {
				if (v[c]<'0' || v[c]>'9') { cp--; } // Ignore anything that is not a digit
			}
			v = paylib.card.formatNumber(v);
			c=0;
			while (d<cp && c<v.length) {
				if (v[c++]==' ') { s++; } else { d++; }
			}
			cp+=s;
		}
		paylib.util.set(t,v);
		paylib.card.last=v;
		paylib.card.identify(v);
		paylib._payform.notifyCardChanged();
		return setTimeout(function(t,cp) {
			return function() {
				t.selectionStart=t.selectionEnd=cp;
				return true;
			}
		}(t,cp));
	}
	paylib.card.digitsChanged = function(evnt) {
		return setTimeout(function(t) {
			return function() {
				var v = paylib.util.digitsOnly(paylib.util.getStr(t));
				var vi = paylib.util.intFromStr(v);
				var f = paylib.util.attrData(t);
				if (f == "expmonth") {
					if (vi > 0 && vi < 13) {
						v=("00"+vi).slice(-2);
					} else {
						v="";
					}
				}
				if (f == "expyear") {
					if (vi > 0) {
						vi = 2000 + (vi % 100);
						if (paylib.util.attrMaxLen(t)==2) {
							v=("00"+vi).slice(-2);
						} else {
							v=""+vi;
						}
					} else {
						v="";
					}
				}
				
				paylib.form.setvalues();
				if (paylib._payform.values.pan.length >0 && 
					  paylib._payform.values.exm >0 && paylib._payform.values.exy >0 &&
						paylib._payform.values.cvv.length >0
					) {
						var pc = paylib.card.panCheckValid(paylib._payform.values.pan);
						if ((!pc.valid) || (pc.ci==null)) {
							return paylib.form.error({errorField: "number", errorText: "Card number is not valid", errorCode: 1001});
						}
						var s=paylib.util.lowerAlphaOnly(pc.ci.type);
						if (s.length>0) {
							if (!paylib._payform.cardsAllowed[s]) {
								return paylib.form.error({errorField: "number", errorText: "Card type is not supported", errorCode: 1002});
							}
						}
						var ee = paylib.card.expiryCheckValid(paylib._payform.values.exm,paylib._payform.values.exy);
						if (ee) {
							return paylib.form.error({errorField: "exp"+ee, errorText: "Card expiry is not valid", errorCode: 1003});
						}
						if (paylib._payform.values.cvv.length != pc.ci.cvv) {
							return paylib.form.error({errorField: "cvv", errorText: "Card security code is not valid", errorCode: 1004});
						}
						paylib._payform.validCard()
				}
				
				paylib.util.set(t,v);
				paylib._payform.clearErrors();
				return true;
			}
		}(evnt.target));
	}
	paylib.card.digitsTyped = function(evnt) {
		if (paylib.util.controlKey(evnt)) { return true; }
		if (evnt.which<48 || evnt.which>57) {
			return paylib.util.stopEvent(evnt);
		}
		paylib._payform.clearErrors();
		var t = evnt.target;
		if (paylib.util.hasTextSelection(t)) { return true; }
		var v = paylib.util.digitsOnly(paylib.util.getStr(t));
		if (v.length>3) {
			return paylib.util.stopEvent(evnt);
		}
		return true;
	}

	paylib.util = {}
	paylib.util.events=[]
	paylib.util.consoleError = function(err) {
		console && console.log && console.log("PAYLIB: "+err);
		return false;
	}
	paylib.util.trimString = function(str) {
		return (""+str).replace(/^\s\s*/, '').replace(/\s\s*$/, '');
	}
	paylib.util.tidyString = function(str) {
		return (""+str).replace(/\s+/g, ' ').replace(/^ /, '').replace(/ $/, '');
	}
	paylib.util.digitsOnly = function(str) {
		return (""+str).replace(/\D/g,"");
	}
	paylib.util.lowerAlphaOnly = function(str) {
		if (typeof(str)==="string") {
			return str.toLowerCase().replace(/[^a-z]/g,"")
		}
		return ""
	}
	paylib.util.cardName = function(str) {
		str = paylib.util.lowerAlphaOnly(str)
		switch (str) {
			case "chinaunionpay":
			case "unionpay":
				return "cup"
			case "americanexpress":
				return "amex"
			case "dinersclub":
			case "dinersclubinternational":
				return "diners"
		}
		return str
	}
	paylib.util.addEvent = function(element, trigger, action, removeable) {
		if (removeable) {
			paylib.util.events.push({element: element, trigger: trigger, action: action})
		}
		if (element.addEventListener) {
			element.addEventListener(trigger, action, false);
			return true;
		} else if (element.attachEvent) {
			element.attachEvent('on'+trigger, action);
			return true;
		}
		return false;
	}
	paylib.util.removeEvent = function(element, trigger, action) {
		try {
			if (element.removeEventListener) {
				element.removeEventListener(trigger, action, false);
				return true;
			} else if (element.detachEvent) {
				element.detachEvent('on'+trigger, action);
				return true;
			}
		} catch(e) {
		}
		return false;
	}
	paylib.util.removeEvents = function(element, trigger, action) {
		var e
		while (paylib.util.events.length) {
			e = paylib.util.events.pop()
			if (e) {
				paylib.util.removeEvent(e.element, e.trigger, e.action)
			}
		}
	}
	paylib.util.addTextEvents = function(element, ops) {
		if (ops) {
			if (typeof(ops.onChange) === "function") {
				paylib.util.addEvent(element,"paste",ops.onChange,true)
				paylib.util.addEvent(element,"blur",ops.onChange,true)
				paylib.util.addEvent(element,"change",ops.onChange,true)
			}
			if (typeof(ops.onKeyPress) === "function") {
				paylib.util.addEvent(element,"keypress",ops.onKeyPress,true)
			}
			if (typeof(ops.onInput) === "function") {
				paylib.util.addEvent(element,"input",ops.onInput,true);
			}
		}
	}
	paylib.util.controlKey = function(evnt) {
		if (evnt.metaKey || evnt.ctrlKey) { return true; }
		if (evnt.which < 32) { return true; }
		return false;
	}
	paylib.util.stopEvent = function(evnt) {
		evnt.stopPropagation();
		evnt.preventDefault();
		return false;
	}
	paylib.util.getStr = function(obj) {
		var t = obj.type.toLowerCase();
		var v;
		if (t == "select-one") {
			v = obj.options[obj.selectedIndex].value;
		} else {
			v = obj.value;
		}
		if (null === v) { return ""; }
		return ""+v;
	}
	paylib.util.intFromStr = function(str) {
		if (str) {
			str=""+str;
			if (str.length > 0) {
				var i = parseInt(str,10);
				if (i>0) {
					return i;
				}
			}
		}
		return 0;
	}
	paylib.util.getInt = function(obj) {
		return paylib.util.intFromStr(paylib.util.digitsOnly(paylib.util.getStr(obj)));
	}
	paylib.util.set = function(obj,newval) {
		obj.value = newval;
	}
	paylib.util.hasTextSelection = function(obj) {
		if (null != obj.selectionStart && obj.selectionStart !== obj.selectionEnd) { return true; }
		return false;
	}
	paylib.util.attrData = function(obj) {
		var f = obj.getAttribute("data-paylib")
		if (typeof(f) === "string") {
			if (f.length>0) {
				return f;
			}
		}
		return "";
	}
	paylib.util.attrMaxLen = function(obj) {
		var f = obj.getAttribute("maxlength")
		if (typeof(f) === "string") {
			return paylib.util.intFromStr(f);
		}
		return 0;
	}
	paylib.util.ajaxFail = function(callback) {
		callback(paylib.form.defaultError());
	}
	paylib.util.ajax = function(url,request,callback) {
		if (typeof resetSessionTimer === "function")
			resetSessionTimer();
		url = "https://secure.paytabs.sa/" + url.replace(/^\/+/g, '');
		if ('XDomainRequest' in window && window.XDomainRequest !== null) {
			var xdr = new XDomainRequest();
			xdr.open('POST',url)
			xdr.onload = function() {
				try {
					var resp = paylib.JSON.parse(xdr.responseText ? xdr.responseText : "{}");
					callback(resp);
				} catch(e) {
					paylib.util.ajaxFail(callback);
				}
			}
			xdr.onerror = function() {
				paylib.util.ajaxFail(callback);
			}
			xdr.onprogress = function() {}
			xdr.ontimeout = function() {
				callback({status: 408, errorText: "Request timeout, please try again"});
			}
			setTimeout(function() { xdr.send(request); },500);
			return
		}
		var xhr = new XMLHttpRequest;
		xhr.onreadystatechange = function () {
			if (xhr.readyState == 4) {
				if (this.status === 200) {
					var resp
					try {
						resp = paylib.JSON.parse(xhr.responseText ? xhr.responseText : "{}");
						if (resp == null) {
							resp = {
								status: xhr.status,
								error: true,
								errorText: xhr.statusText
							}
						}
						callback(resp);
					} catch (e) {
						paylib.util.ajaxFail(callback);
					}
				} else {
					// check for expired session
					if (this.status === 500) {
						location.href = '/payment/expired';
					} else {
						const response = JSON.parse(xhr.response);
						if (response.error && response.status === 500) {
							location.href = '/payment/expired';
							return
						}
						callback(response);
					}
				}
			}
		}
		xhr.open("POST", url, true);
		xhr.setRequestHeader("Content-type", "application/json");
		xhr.send(request);
	}

	paylib.JSON = {}
	paylib.JSON.stringify = function(obj) {
		// Use browser provided JSON stringify if available, otherwise use own stringify
		if (void 0 != JSON && void 0 != JSON.stringify) {
			return JSON.stringify(obj);
		}
		var esc = /[\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
		var csub = {"\b": "\\b", "\t": "\\t", "\n": "\\n", "\f": "\\f", "\r": "\\r", "\"": "\\\"", "\\": "\\\\"};
		function quote(str) {
			esc.lastIndex = 0;
			return esc.test(str)
				? '"' + str.replace(esc, function (a) {
					var c = csub[a];
					return typeof c === "string" ? c : "\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4);
				}) + '"'
				: '"'+str+'"';
		}
		function toString(obj) {
			switch (typeof obj) {
				case "string":	return quote(obj);
				case "boolean":	return String(obj);
				case "number":	return isFinite(obj)?String(obj):"null";
				case "object":
					if (!obj) { return "null"; }
					var item, val, entries = [];
					if (obj.constructor == Array) {
						for (item in obj) {
							val = toString(obj[item]);
							entries.push(val);
						}
						return "["+String(entries)+"]";
					} else {
						for (item in obj) {
							val = toString(obj[item]);
							entries.push(quote(item)+':'+val);
						}
						return "{"+String(entries)+"}";
					}
			}
		}
		return toString(obj);
	}
	paylib.JSON.parse = function(str) {
		try {
			// Use browser provided JSON parser if available, otherwise use own parser
			if (void 0 != JSON && void 0 != JSON.parse) {
				return JSON.parse(str);
			}
			str=String(str);
			// Escape any possibly dangerous characters in the string to prevent problems with JavaScript
			// not dealing with them correctly.
			var esc=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
			esc.lastIndex=0;
			if (esc.test(str)) {
				str=str.replace(esc,function(a) {
					return ("\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4));
				});
			}
			// Check string is safe to pass into eval
			var backslash_pairs = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g;
			var simple_tokens = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g;
			var open_brackets = /(?:^|:|,)(?:\s*\[)+/g;
			var is_safe = /^[\],:{}\s]*$/;
	
			if (is_safe.test(str.replace(backslash_pairs,"@").replace(simple_tokens,"]").replace(open_brackets,""))) {
				var obj = eval("("+str+")");
				return obj;
			}
		} catch (e) {
		}
		return null;
	}

	paylib.form = {
		masked: false
	}
	paylib.form.inlineForm = function(ops) {
		if (!ops) { return paylib.util.consoleError("Inline: No options provided"); }
		if (typeof(ops.form) !== "object") { return paylib.util.consoleError("Inline: Form element must be provided"); }
		if (ops.form.nodeName !== "FORM") { return paylib.util.consoleError("Inline: Form element must be of form type"); }
		if (typeof(ops.key) !== "string") { return paylib.util.consoleError("Inline: Client key must be provided"); }
		if (typeof(ops.callback) !== "function") { return paylib.util.consoleError("Inline: Callback function must be provided"); }
		var i, f, s, len, fields = {}
		for (i = 0, len=ops.form.length; i < len; i++) {
			f = paylib.util.attrData(ops.form[i]);
			if (f.length>0) {
				fields[f]=ops.form[i];
			}
		}
		if (!fields.number) { return paylib.util.consoleError("Inline: Card number field not found"); }
		if (!fields.expmonth) { return paylib.util.consoleError("Inline: Expiry (month) field not found"); }
		if (!fields.expyear) { return paylib.util.consoleError("Inline: Expiry (year) field not found"); }
		if (!fields.cvv) { return paylib.util.consoleError("Inline: Card security code field not found"); }
		fields.number.removeAttribute("name")
		fields.expmonth.removeAttribute("name")
		fields.expyear.removeAttribute("name")
		fields.cvv.removeAttribute("name")
		paylib.util.addTextEvents(fields.number,{
			onChange:	paylib.card.panChanged,
			onKeyPress:	paylib.card.panTyped,
			onInput:	paylib.card.panInput});
		if (fields.expmonth.nodeName !== "SELECT") {
			paylib.util.addTextEvents(fields.expmonth,{
				onChange:	paylib.card.digitsChanged,
				onKeyPress:	paylib.card.digitsTyped});
		}
		if (fields.expyear.nodeName !== "SELECT") {
			paylib.util.addTextEvents(fields.expyear,{
				onChange:	paylib.card.digitsChanged,
				onKeyPress:	paylib.card.digitsTyped});
		}
		paylib.util.addTextEvents(fields.cvv,{
			onChange:	paylib.card.digitsChanged,
			onKeyPress:	paylib.card.digitsTyped});
		paylib._payform			= {};
		paylib._payform.form		= ops.form;
		paylib._payform.key		= ops.key;
		paylib._payform.callback	= ops.callback;
		paylib._payform.autosubmit	= true;
		paylib._payform.fields		= {}
		paylib._payform.fields.pan	= fields.number;
		paylib._payform.fields.exm	= fields.expmonth;
		paylib._payform.fields.exy	= fields.expyear;
		paylib._payform.fields.cvv	= fields.cvv;
		paylib._payform.cardsAllowed	= {}
		if (typeof(ops.cardsAllowed) === "object") {
			for (i=0, len = ops.cardsAllowed.length; i<len; i++) {
				s = paylib.util.cardName(ops.cardsAllowed[i]);
				if (s.length>0) {
					paylib._payform.cardsAllowed[s]=1;
				}
			}
		} else {
			for (i=0, len=paylib.cards.length; i<len; i++) {
				s=paylib.util.cardName(paylib.cards[i].type);
				if (s.length>0) {
					paylib._payform.cardsAllowed[s]=1;
				}
			}
		}
		if (typeof(ops.currency) === "string") {
			paylib._payform.currency = ops.currency
		} else {
			paylib._payform.currency = ""
		}
		if (typeof(ops.autoSubmit) === "boolean") {
			if (!ops.autoSubmit) { paylib._payform.autosubmit = false; }
		}
		if (typeof(ops.notifyCardType) === "function") {
			paylib._payform.notifyCardType = ops.notifyCardType;
		} else {
			paylib._payform.notifyCardType = function() { return true; }
		}
		if (typeof(ops.notifyCardChanged) === "function") {
			paylib._payform.notifyCardChanged = ops.notifyCardChanged;
		} else {
			paylib._payform.notifyCardChanged = function() { return true; }
		}
		if (typeof(ops.beforeValidate) === "function") {
			paylib._payform.beforeValidate = ops.beforeValidate;
		} else {
			paylib._payform.beforeValidate = function() { return true; }
		}
		if (typeof(ops.beforeSubmit) === "function") {
			paylib._payform.beforeSubmit = ops.beforeSubmit;
		} else {
			paylib._payform.beforeSubmit = function() { return true; }
		}
		if (typeof(ops.validCard) === "function") {
			paylib._payform.validCard = ops.validCard;
		} else {
			paylib._payform.validCard = function() { return true; }
		}
		if (typeof(ops.clearErrors) === "function") {
			paylib._payform.clearErrors = ops.clearErrors;
		} else {
			paylib._payform.clearErrors = function() { return true; }
		}
		paylib.card.enable();
		paylib.card.identify("");
		paylib._payform.notifyCardChanged();
		paylib.card.last="";
		paylib.card.lastType="";
		ops.form.onsubmit=function(evnt) {
			try {
				paylib.util.stopEvent(evnt);
				paylib.form.setvalues();
				paylib.form.process();
			} catch(e) {
			}
			return false;
		}
	}
	paylib.form.setvalues = function() {
		paylib._payform.values = []
		paylib._payform.values.pan = paylib.util.digitsOnly(paylib.util.getStr(paylib._payform.fields.pan));
		paylib._payform.values.cvv = paylib.util.digitsOnly(paylib.util.getStr(paylib._payform.fields.cvv));
		paylib._payform.values.exm = paylib.util.getInt(paylib._payform.fields.exm);
		paylib._payform.values.exy = paylib.util.getInt(paylib._payform.fields.exy);
	}
	paylib.form.process = function() {
		paylib.form.prepare();
		paylib._payform.clearErrors();
		try {
			if (!paylib._payform.beforeValidate()) {
				return paylib.form.error({beforeValidate: true});
			}
		} catch(e) {
			return paylib.form.error({beforeValidate: true});
		}
		if (paylib.card.enabled == true) {
			var pc = paylib.card.panCheckValid(paylib._payform.values.pan);
			if ((!pc.valid) || (pc.ci==null)) {
				return paylib.form.error({errorField: "number", errorText: "Card number is not valid", errorCode: 1001});
			}
			var s=paylib.util.lowerAlphaOnly(pc.ci.type);
			if (s.length>0) {
				if (!paylib._payform.cardsAllowed[s]) {
					return paylib.form.error({errorField: "number", errorText: "Card type is not supported", errorCode: 1002});
				}
			}
			var ee = paylib.card.expiryCheckValid(paylib._payform.values.exm,paylib._payform.values.exy);
			if (ee) {
				return paylib.form.error({errorField: "exp"+ee, errorText: "Card expiry is not valid", errorCode: 1003});
			}
			if (paylib._payform.values.cvv.length != pc.ci.cvv) {
				return paylib.form.error({errorField: "cvv", errorText: "Card security code is not valid", errorCode: 1004});
			}
		}
		try {
			if (!paylib._payform.beforeSubmit()) {
				return paylib.form.error({beforeSubmit: true});
			}
		} catch(e) {
			return paylib.form.error({beforeSubmit: true});
		}
		if (paylib.card.enabled == true) {
			var req = {
				clientKey: paylib._payform.key,
				currency: paylib._payform.currency,
				payment: {
					method: "card",
					cardNumber: ""+paylib._payform.values.pan,
					expiryMonth: paylib._payform.values.exm,
					expiryYear: paylib._payform.values.exy,
					cvv: ""+paylib._payform.values.cvv
				}
			}
			var reqstr = paylib.JSON.stringify(req);
			paylib.util.ajax("/payment/tokenise",reqstr,paylib.form.response);
		} else {
			if (paylib._payform.autosubmit) {
				paylib._payform.form.submit();
			} else {
				paylib.form.doCallback({status: 200});
			}
		}
		return false;
	}
	paylib.form.defaultError = function() {
		return {
			status: 400,
			error: true,
			errorText: "Unable to process card, please check card details"};
	}
	paylib.form.response = function(response) {
		if (response.error || response.errorText) {
			if (response.errorField) {
				paylib.form.error(response);
			} else {
				paylib.form.error(paylib.form.defaultError());
			}
			return;
		}
		if (typeof(response.token) === "string") {
			if (response.token.length>5) {
				if (paylib._payform.autosubmit) {
					var el = paylib.form.addHiddenField(paylib._payform.form, "token", response.token);
					paylib._payform.form.submit();
				} else {
					paylib.form.doCallback({status: 200, token: response.token});
				}
				return false;
			}
		}
		paylib.form.error(paylib.form.defaultError());
	}
	paylib.form.disableButtons = function(form) {
		for (var i = 0; i < form.length; i++) {
			if ("button" === form[i].type || "submit" === form[i].type) {
				form[i].disabled = true;
			}
		}
	}
	paylib.form.enableButtons = function(form) {
		for (var i = 0; i < form.length; i++) {
			if ("button" === form[i].type || "submit" === form[i].type) {
				form[i].disabled = false;
			}
		}
	}
	paylib.form.prepare = function() {
		paylib.form.masked = true;
		paylib.form.disableButtons(paylib._payform.form);
		paylib.util.set(paylib._payform.fields.pan, paylib.card.maskPan(paylib._payform.values.pan));
		paylib.util.set(paylib._payform.fields.cvv, paylib.card.maskCVV(paylib._payform.values.cvv));
		paylib.card.last = "";
	}
	paylib.form.restore = function() {;
		if (paylib._payform.form) {
			if (paylib.form.masked == true) {
				var pan = paylib.card.formatNumber(paylib._payform.values.pan);
				paylib.util.set(paylib._payform.fields.pan, pan);
				paylib.util.set(paylib._payform.fields.cvv, paylib._payform.values.cvv);
				paylib.card.last = pan;
				paylib.form.masked = false;
			}
			paylib.form.enableButtons(paylib._payform.form);
		}
	}
	paylib.form.doCallback = function(response) {
		try {
			var st = paylib.util.intFromStr(response.status);
			if (st < 200) { st = 501; }
			response.status = st;
			paylib._payform.callback(response);
		} catch(e) {
		}
	}
	paylib.form.error = function(response) {
		response.error = true;
		response.status = 501;
		paylib.form.doCallback(response);
		paylib.form.restore();
		return false;
	}
	paylib.card.disable = function() {
		paylib.card.enabled=false;
	}
	paylib.card.enable = function() {
		paylib.card.enabled=true;
	}
	paylib.form.addHiddenField = function(form, name, value) {
		var el = document.createElement("input");
		el.type = "hidden";
		el.name = name;
		el.value = value;
		form.appendChild(el);
		return el
	}

	paylib.inlineForm = function(ops) {
		paylib.form.inlineForm(ops);
	}
	paylib.resetForm = function() {
		paylib.util.removeEvents()
		try {
			paylib._payform.form.onsubmit = function(evnt) {
				return false;
			}
		} catch(e) {
		}
		paylib._payform = [];
	}
	paylib.handleError = function(element, response) {
		if (response && element) {
			if (response.error) {
				if (response.errorText) {
					element.innerHTML = response.errorText;
				}
			}
		}
		paylib.form.restore();
	}
	paylib.emptyForm = function() {
		paylib._payform.values = []
		paylib.util.set(paylib._payform.fields.pan, "");
		paylib.util.set(paylib._payform.fields.cvv, "");
		paylib.util.set(paylib._payform.fields.exm, "");
		paylib.util.set(paylib._payform.fields.exy, "");
		paylib.card.last = "";
		paylib.form.masked = false;
		paylib.form.enableButtons(paylib._payform.form);
	}
	paylib.loaded = function() {
		return true;
	}
	w.paylib = paylib
}