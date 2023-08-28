
// This is a public library of functions that can be shared between apps regardless of use. 

export const replaceAll = function(thisString: string, str1: string, str2: string, ignore: boolean) 
{
    return thisString.replace(new RegExp(str1.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g,"\\$&"),(ignore?"gi":"g")),(typeof(str2)=="string")?str2.replace(/\$/g,"$$$$"):str2);
} 

export function e2() {
    var u='',m='xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx',i=0,rb=Math.random()*0xffffffff|0;
    while(i++<36) {
        var c=m[i-1],r=rb&0xf,v=c==='x'?r:(r&0x3|0x8);
        u+=(c==='-'||c==='4')?c:v.toString(16);rb=i%8===0?Math.random()*0xffffffff|0:rb>>4
    }
    return u
}