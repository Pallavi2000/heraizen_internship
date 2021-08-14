""" Program to calculate trip cost for the given number of people"""

no_of_person=int(input("Enter the number of persons : "))
distance_km=int(input("Enter the distance in km: "))
m=int(input("Enter the milage: "))
f=int(input("Enter the fuel price: "))

litr=distance_km/m
tot=litr*f
person=tot/no_of_person

print(f"Total cost per head is {person}")