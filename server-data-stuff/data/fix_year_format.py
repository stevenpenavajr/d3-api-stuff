import sys

# Swaps arrangement of month/day
def fixYearFormat(fileObject, myNewFile):
    for line in fileObject:
        startOfDate   = line.find('"date":')
        lineDateOn    = line[startOfDate+8:]
        beginningLine = line[:startOfDate+8]
        lineArray = lineDateOn.split('/')
        
        # Make the swap
        try:
            temp = lineArray[1]
            lineArray[1] = lineArray[0]
            lineArray[0] = temp        
        except IndexError:
            print()

        myNewFile.write(beginningLine + '/'.join(lineArray))  

def main():
    myFile  = open(sys.argv[1], "r")
    newFile = open("data_corrected.json", "a")
    fixYearFormat(myFile, newFile)
      
main()

# def main():
#     file_object  = open("./data.json", "r")

#     writef = open("new.json", "a")

#     for line in file_object:
#         index = line.find('"date":')
#         slash = line.find('/')
#         # origDay = line[index+8:slash]
#         line2 = line[index+8:]
#         p1 = (line[:index+8])
#         line3 = line2.split('/')
#         # print(origDay)
#         # print(line)
#         # line = line.split('/')
#         # orig = line[]
        
#         try:
#             temp = line3[1]
#             line3[1] = line3[0]
#             line3[0] = temp
                
#         except IndexError:
#             print()

#         # print(line2)
#         # print(p1 + '/'.join(line3))
#         writef.write(p1 + '/'.join(line3))
        
# main()