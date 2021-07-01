export const cppCode=`
#include<iostream>
using namespace std;

int main(){
    int n;
    cin>>n;
    int ans=1;
    for(int i=1;i<=n;i++){ans*=i;}
    cout<<n<<" factorial is: "<<ans<<endl;
}
`

export const jsCode=`
console.log("Welcome to discoded!")
`

export const goCode=`
package main
import ( "fmt" )

func main(){
    var s string
    fmt.Scanf("%s",&s)
    fmt.Println("Welcome to discoded! >>"+s)
}
`

export const pyCode=`
print("Hello !!")
`

export const monkeyCode=`
let add=fn(a,b){a+b}
let mul=fn(a,b){a*b}
add(mul(1,4),mul(5,7))
`
export const cCode=`
#include<stdio.h>
int main(){
    printf(">>>Welcome to discoded ");
}
`
