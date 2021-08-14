from car import Car

car1=Car("KA190012",5)
car2=Car("KA190013",4)
car3=Car("KA190014",3)

car1.start()
car3.start()
car1.change_gear()
car1.change_gear()
car1.change_gear()
car2.stop()

lst=[ca1,car2,car3]

for i in lst:
    i.showInfo()
c=len(list(filter(lambda x:x.is_started and x.gear_status == 0,lst)))
print(c)

