/****************************************************************************/
/*              		formutils.js                                */
/****************************************************************************/
/*			Autor: Renato Gobet Uzun                            */
/****************************************************************************/
/*                                                                          */
/*	Essas funções tem por objetivo de validar e auxiliar o envio do     */
/*	formulario HTTP                                                     */
/*                                                                          */
/****************************************************************************/
	
// Automatização da checagem de tamanho
function checklen( field, str, min, max )
{
    if( field.value.length < min || field.value.length > max )
    {
        alert( str ) ;
        field.focus() ;
        return false ;
    }
    return true ;
}


// Verifica se o formato do e-mail é válido
function isEmail (str) 
{
    var iError = 0 ;
    var i = 1;
    var iLen = str.length;

    if ( iLen <= 8 ) iError++;
    while ((i < iLen) && (str.charAt(i) != "@")) {
        i++ ;
    }
    if ((i >= iLen) || (str.charAt(i) != "@")) iError++; else i += 2;
    while ((i < iLen) && (str.charAt(i) != ".")) {
        i++ ;
    }

    // 1 car. depois de .
    if ((i >= iLen - 1) || (str.charAt(i) != ".")) iError++;

    if ( iError > 0 ) return false ;
    return true ;
}


// Retirar qualquer coisa que nao seja numeros
String.prototype.LetNumbers = function ()
{
    if ( this.length <= 0 ) return this ;
    s = this ;
    var newnumber = "" ;
    for ( i = 0 ; i <= s.length ; i++ )
    {
        if (! isNaN( s.charAt( i )) && s.charAt( i ) != " " )
            newnumber = newnumber + s.charAt( i );
    }
    return newnumber ;
};

String.prototype.OnlyNumbers = function ()
{
    return this.replace( /[^0-9]/g, '');
};

String.prototype.OnlyAlfa = function ()
{
    return this.replace( /[^a-zA-Z]/g, '');
};

String.prototype.unescapeHtml = function () 
{
    var temp = document.createElement("div");
    temp.innerHTML = this;
    var result = temp.childNodes[0].nodeValue;
    temp.removeChild(temp.firstChild);
    return result;
};



// Retirar qualquer coisa que nao seja letras	
String.prototype.LetAlpha = function ()
{
    if ( this.length <= 0 ) return this ;
    s = this ;
    var newAlpha = "" ;
    for ( i = 0 ; i <= s.length ; i++ )
    {
        if (s.charAt( i ) == ' ')
            newAlpha = newAlpha + s.charAt( i );
        if (s.charAt( i ) >= 'a' && s.charAt( i ) <= 'z')
            newAlpha = newAlpha + s.charAt( i );
        if (s.charAt( i ) >= 'A' && s.charAt( i ) <= 'Z')
            newAlpha = newAlpha + s.charAt( i );
    }
    return newAlpha ;
};
 

// Coloca a String com o formato de nome
String.prototype.toProperCase = function()
{
    if ( this.length <= 0 ) return this;

    var ignoreList = "do/da/de/du/e/a/o/dos/das/des";
    var ignoreList = "" ;
    var aTmp = this.split( ' ' );
    var sStr = '';

    for ( var i = 0; i < aTmp.length; i++ )
    {
        aTmp[ i ] = aTmp[ i ].toLowerCase();
        if ( ignoreList.indexOf( aTmp[ i ] ) == -1 )
        {
            sChar = aTmp[ i ].charAt( 0 );
            aTmp[ i ] = sChar.toUpperCase() + aTmp[ i ].substring( 1, aTmp[ i ].length );
        }
        sStr += aTmp[ i ] + ' ';
    }
    return sStr.substring( 0, sStr.length - 1 );
};


// Remve os acentos da string
String.prototype.removeAcentos = function ()
{
    if ( this.length <= 0 )
        return this ;
		
    s = this.toLowerCase() ;

    var aMask = new Array(
        ["a","á"], ["a","à"], ["a","ã"], ["a","â"], ["a","ä"],
        ["e","é"], ["e","è"], ["e","ê"], ["e","ë"],
        ["i","í"], ["i","ì"], ["i","î"], ["i","ï"],
        ["o","ó"], ["o","ò"], ["o","õ"], ["o","ô"], ["o","ö"],
        ["u","ú"], ["u","ù"], ["u","û"], ["u","ü"],
        ["c","ç"]
        );

    for ( var i = 0 ; i < aMask.length ; i++ )
        while ( s.indexOf( aMask[i][1] ) != -1 )
            s = s.replace(aMask[i][1],aMask[i][0]) ;

    return s ;
};


function FormatNumberLength(num, length) {
    var r = "" + num;
    while (r.length < length) {
        r = "0" + r;
    }
    return r;
}


// Permite apenas valores numéricos 
function OnlyNumbersKeyDown(e)
{
    var keynum = e.code;
	
    // Permitir Backspace, Tab e Delete
    if (keynum == 8 || keynum == 9 || keynum == 46 || !keynum )
        return true;
	
    numcheck = /\d/;
    return numcheck.test(e.key); 
	
}

//Permite apenas valores numéricos com a virgula 
function OnlyNumbersKeyDownWithDecimals(e)
{
    if ( e.code == 188)	// Virgula
        return true;
    else
        return OnlyNumbersKeyDown(e);
}


function FormataDataKeyUp(e)
{
    var controle = e.target;
    var keynum = e.code;

    // Ignora Backspace, Tab e Delete
    if (keynum && keynum != 8 && keynum != 9 && keynum != 46 )
    {
        if(controle.value.length == 2 || controle.value.length == 5)
            controle.value += '/';
    }
    return true;	        
}

function FormataTelefoneKeyUp(e)
{
    var controle = e.target;
    var keynum = e.code;

    // Ignora Backspace, Tab e Delete
    if (keynum && keynum != 8 && keynum != 9 && keynum != 46 )
    {
        if(controle.value.length == 4)
            controle.value += '-';
    }
    return true;	        
}
