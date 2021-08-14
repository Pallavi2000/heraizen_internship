"""Program to calculate Simple interest"""

principle = float(input("Enter the principle value: "))
rate_of_interest = float(input("Enter the rate of interest: "))
time = float(input("Enter the time: "))

simple_interest = (principle * rate_of_interest * time) / 100
print(f"Simple interest = {simple_interest}")
