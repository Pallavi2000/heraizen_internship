"""Program to check the elegibility of the person to vote"""

age=int(input("Enter your age: "))
if age>=18:
    print(f"Thank you for casting your vote")
else:
    print(f"Sorry..! you are not elegible to vote")
