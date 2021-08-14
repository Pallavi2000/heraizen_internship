yr = int(input("Enter the year: "))

if (yr % 4 == 0  and yr % 100 != 0) or yr % 400 == 0 :
    print(f"The given year {yr} is a leap year")
else:
    print(f"Not a leap year")