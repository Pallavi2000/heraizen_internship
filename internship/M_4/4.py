"""try:
    word_count = 0
    with open("text1.txt") as f:
	    lines = f.readlines()
	    for line in lines:
            word_count += len(line.split(" "))
            or
            words = line.split(" ")
            for word in words:
                word = word.strip().strip("\n").replace(',',' ').replace('.',',')
                
        print()

except Exception as  e:
    print(f"File not found please check path {e}")        

