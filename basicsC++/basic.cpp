#include<iostream> 
using namespace std; 

int main(){
    int a = 0;

    int* p = &a; 

    cout << a << " " << p; // p is 64 bit or 32 bit

    fprintf(stderr, "hang");

    return 0;
}