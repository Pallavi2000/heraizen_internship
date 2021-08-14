"""program to determine the work hours of the day entered based on the timetable""" 

table = { "Mon" : [3,2,2] ,
	  "Tue" : [3,2,2] ,
	  "Wed" : [3,2,2] ,
	  "Thu" : [3,2,1] ,
	  "Fri" : [3,2,1] ,
	  "Sat" : [3,1,0] ,
	  "Sun" : [0,0,0] 
	}

key_ele = input("Enter the day whose work hours to be displayed ")

for key,value in table.items():
	if key == key_ele :
		print(value)
