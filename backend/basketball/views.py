from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import pandas as pd
import xlsxwriter
import os
from pathlib import Path
from datetime import datetime
from io import StringIO

courts = ["PSA - McKinney 1", "PSA - McKinney 2", "PSA - McKinney 3", "PSA - McKinney 4",
          "PSA - McKinney 5", "PSA - McKinney 6", "PSA - McKinney 7", "PSA - McKinney 8",
          "PSA - Murphy 1", "PSA - Murphy 2", "PSA - Murphy 3", "PSA - Murphy 4",
          "PSA - Murphy 5", "PSA - Murphy 6", "PSA - Murphy 7", "PSA - Murphy 8",
          "PSA 1 - Blue 1", "PSA 1 - Blue 2", "PSA 1 - Blue 3", "PSA 1 - Blue 4",
          "PSA 1 - Red 4", "PSA 1 - Red 5", "PSA 1 - Green 1",
          "PSA 2 - Silver 1", "PSA 2 - Silver 2", "PSA 2 - Silver 3", "PSA 2 - Silver 4",
          "PSA 2 - Silver 5", "PSA 2 - Silver 6", "PSA 2 - Silver 7", "PSA 2 - Silver 8"]

@csrf_exempt
def basketball(request):
    if request.method == 'POST' and 'files' in request.FILES:
        downloads_folder = str(Path.home() / "Downloads")
        file = request.FILES['files']

        try:
            # Read CSV data
            csv_data = file.read().decode('utf-8')
            data = pd.read_csv(StringIO(csv_data))
            
            # Ensure 'Date' column exists and extract date from the data
            if 'Date' not in data.columns:
                return JsonResponse({"error": "Invalid file format: 'Date' column missing."}, status=400)
            
            date_str = data['Date'].iloc[0]
            date = datetime.strptime(date_str, '%Y-%m-%d').strftime('%Y%m%d')
            
            # Process data for each court and save to Excel
            with pd.ExcelWriter(os.path.join(downloads_folder, f'sorted_basketball_games_{date}.xlsx'), engine='xlsxwriter') as writer:
                for court in courts:
                    sorted_data = process_data(data, court)
                    worksheet_name = court.split(" - ")[-1]
                    workbook = writer.book
                    worksheet = workbook.add_worksheet(worksheet_name)
                    worksheet.set_landscape()

                    for row_num in range(0, 25):
                        if row_num != 0:
                            worksheet.set_row(row_num, 25.1)

                    worksheet.merge_range('A1:C1', court, workbook.add_format({'bold': True, 'align': 'center'}))
                    worksheet.merge_range('E1:G1', date_str, workbook.add_format({'bold': True, 'align': 'center'}))

                    sorted_data.to_excel(writer, sheet_name=worksheet_name, index=False, startrow=1, startcol=0)

            return JsonResponse({"message": "Files processed and sorted successfully."})

        except Exception as e:
            return JsonResponse({"error": f"Error processing file {file.name}: {str(e)}"}, status=500)
    
    return JsonResponse({"error": "Please upload a file."}, status=400)

def process_data(data, venue):
    data_dict = {
        "Date": data["Date"].to_list(),
        "Start Time": data["Start Time"].to_list(),
        "Venue": data["Venue"].to_list(),
        "League": data["League"].to_list(),
        "Home Team": data["Home Team"].to_list(),
        "Away Team": data["Away Team"].to_list()
    }

    df = pd.DataFrame(data_dict)
    df.insert(5, "Home Score", "")
    df.insert(7, "Away Score", "")
    df.insert(8, "Referee Signature", "")
    filtered_data = df[df['Venue'] == venue]
    court_sorted_data = filtered_data.sort_values(by=["Venue", "Date"])
    final_sort = court_sorted_data.drop(columns=['Venue', 'Date'])

    return final_sort
