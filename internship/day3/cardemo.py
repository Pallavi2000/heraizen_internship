class Car:
	def __init__(self,regno,no_gears):
		self.regno=regno
		self.no_gears=no_gears
        self.is_started=False
        self.gear_status=0
    
	def start(self):
        if self.is_started :
            print(f"car with reg no {self.regno} is already started")
        else:
            print(f"Car with reg no {self.regno} is started")
            self.is_startecd = True
	def stop(self):
        if self.is_started:
		    print(f"car with reg no {self.regno} is stopped")
            self.is_started=False
        else:
            print(f"car with reg no {self.regno} is already stopped")
    def change_gear(self):
        if self.is_started:
            print(f"car with reg no {self.regno} changed its gear")
        else:
            print(f"We cannot change the gear")

