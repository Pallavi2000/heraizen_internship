"""program to find the grade of the student"""

sub1=int(input("Enter your mark of subject 1 : "))
sub2=int(input("Enter your mark of subject 2 : "))
sub3=int(input("Enter your mark of subject 3 : "))
if sub1<35 or sub2<35 or sub3<35:
    print(f"Better luck next Time")
else:
    avg=(sub1+sub2+sub3)/3
    if avg<=100:
        if avg>=35 and avg<=65:
            g="C"
        elif avg>65 and avg<=85:
            g="B"
        else:
            g="A"
        print(f" YourAverage : {avg} and Grade : {g}")
    else:
        print(f"Something went wrong")
