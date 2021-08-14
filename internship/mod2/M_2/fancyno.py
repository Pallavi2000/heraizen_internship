"""program to generate a fancy number for a new vehicle """

def sum_digit(N):

	digit=0	
	while N != 0:
		r = N % 10
		digit += r
		N //= 10
	return digit == 12

def get_num(N):

	a,N = N // 1000,N % 1000
	b,N = N // 100,N % 100
	c,N = N // 10,N % 10
	d,N = N // 1,N % 1
	
	return a,b,c,d

print(f"Fancy numbers generated are")
for i in range(1000,10000):
	if sum_digit(i):
		a,b,c,d = get_num(i)	
		if c == a-b and d == a+c :
			print(i)