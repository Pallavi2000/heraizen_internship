function factorial(){
    num = parseInt(document.getElementById("num").value)
    msg = ""
    if(num){
        res=1
        for(let i=2;i<=num;i++){
            res*=i
        msg = "Factorial of " + num + " is " + res
        }
    }
    document.getElementById("res").innerHTML = "<h2>"+msg+"</h2>";

}
function digitsum(){
    num = parseInt(document.getElementById("num").value)
    msg = ""
    if(num){
        digit = 0
        num1 = num
        while(num1!=0){
            digit = digit+parseInt(num1%10)
            num1 = parseInt(num1/10)
        }
        msg = "Sum of digit of " + num + " is " + digit 
    }
    document.getElementById("res").innerHTML = "<h2>"+msg+"</h2>";
}
function reverse(){
    num = parseInt(document.getElementById("num").value)
    msg = ""
    if(num){
        rev= 0
        num1 = num
        while(num1!=0){
            r =parseInt(num1 % 10) 
            rev = (rev * 10 )+r
            num1 = parseInt(num1 / 10)
        }
        msg = "Reverse of " + num + " is " + rev
    }
    document.getElementById("res").innerHTML = "<h2>"+msg+"</h2>";
}
function palindrome(){
    num = parseInt(document.getElementById("num").value)
    msg = ""
    if(num){
        rev= 0
        num1 = num
        while(num1!=0){
            r =parseInt(num1 % 10) 
            rev = (rev * 10 )+r
            num1 = parseInt(num1 / 10)
        }
        if(rev == num)
            msg = "The given number " + num + " is palindrome"
        else
            msg = "The given number " + num + " is not a palindrome"
    }
    document.getElementById("res").innerHTML = "<h2>"+msg+"</h2>";
}

