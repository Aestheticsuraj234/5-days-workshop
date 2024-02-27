// javascript hoti kya hai?

// variables kya hote hai?jjjjj
var a = 10;
let b = 20;
const c = 30;
// data types kya hote hai?
//* number, string, boolean, object, array, null, undefined , symbol, Nan
let num = 999;
let str = `hello`;
let bool = true; //false;
let obj ={
    name:"Suraj",
    age:20,
    city:"Pune"
}
let array  = ["string" , 10, true, obj, [12,45,6,7], "world" ];
let nul = null;
let und = undefined;

// operators kya hote hai?

// arithmetic operators

//* + - * / % ++ -- **
let x = 0; //number
let y = 10; //number



// comparison operators
// *== === != !== > < >= <=
console.log(x==y);



// logical operators
// * && || !

console.log(x==y || x===y);



// assignment operators
//  *= += -= /= %=
// conditional (ternary) operator
// * ? :
let age = 16;
console.log(age>=18 ?"you can vote":"you can't vote")


// if else
if(x===y){
console.log("x and y are equal");
}
else if(x>y)
{

console.log("x is greater than y");
}
else{
console.log("x and y are not equal");
}
// for loop
for(let i=1;i<=100;i++){
    console.log(i);
}
// functions
function add(a,b)
{

    console.log(a+b);
}


add(10,20);