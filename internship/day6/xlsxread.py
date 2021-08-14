from openpyxl import Workbook
import openpyxl as pyxl

wb = pyxl.load_workbook("ws.xlsx")
sheet = wb.active
for row in sheet.iter_rows():
    data = [c.value for c in row]
    print(data)