# views.py

import pandas as pd
import os
from pathlib import Path
from django.http import JsonResponse, HttpResponse
from django.core.files.storage import FileSystemStorage
import xlsxwriter
from django.views.decorators.csrf import csrf_exempt
import logging

# Set up logging
logger = logging.getLogger(__name__)

@csrf_exempt
def basketball(request):
    if request.method != 'POST':
        logger.error('Invalid request method: %s', request.method)
        return JsonResponse({'error': 'Only POST method is allowed'}, status=405)

    if 'file' not in request.FILES:
        logger.error('No file uploaded in the request')
        return JsonResponse({'error': 'No file uploaded'}, status=400)

    try:
        uploaded_file = request.FILES['file']
        fs = FileSystemStorage()
        file_path = fs.save(uploaded_file.name, uploaded_file)

        # Read the uploaded CSV file
        game_data = pd.read_csv(fs.path(file_path))

        # Define the list of courts
        courts = ["PSA - McKinney 1", "PSA - McKinney 2", "PSA - McKinney 3", "PSA - McKinney 4",
                  "PSA - McKinney 5", "PSA - McKinney 6", "PSA - McKinney 7", "PSA - McKinney 8",
                  "PSA - Murphy 1", "PSA - Murphy 2", "PSA - Murphy 3", "PSA - Murphy 4",
                  "PSA - Murphy 5", "PSA - Murphy 6", "PSA - Murphy 7", "PSA - Murphy 8",
                  "PSA 1 - Blue 1", "PSA 1 - Blue 2", "PSA 1 - Blue 3", "PSA 1 - Blue 4",
                  "PSA 1 - Red 4", "PSA 1 - Red 5", "PSA 1 - Green 1",
                  "PSA 2 - Silver 1", "PSA 2 - Silver 2", "PSA 2 - Silver 3", "PSA 2 - Silver 4",
                  "PSA 2 - Silver 5", "PSA 2 - Silver 6", "PSA 2 - Silver 7", "PSA 2 - Silver 8"]

        downloads_folder = str(Path.home() / "Downloads")
        output_file = os.path.join(downloads_folder, f'sorted_{uploaded_file.name}.xlsx')

        with pd.ExcelWriter(output_file, engine='xlsxwriter') as writer:
            for court in courts:
                data_dict = {
                    "Date": game_data["Date"].to_list(),
                    "Start Time": game_data["Start Time"].to_list(),
                    "Venue": game_data["Venue"].to_list(),
                    "League": game_data["League"].to_list(),
                    "Home Team": game_data["Home Team"].to_list(),
                    "Away Team": game_data["Away Team"].to_list()
                }

                df = pd.DataFrame(data_dict)
                df.insert(5, "Home Score", "")
                df.insert(7, "Away Score", "")
                df.insert(8, "Referee Signature", "")
                filtered_data = df[df['Venue'] == court]
                court_sorted_data = filtered_data.sort_values(by=["Venue", "Date"])
                final_sort = court_sorted_data.drop(columns=['Venue', 'Date'])

                worksheet_name = court.split(" - ")[-1]
                workbook = writer.book
                worksheet = workbook.add_worksheet(worksheet_name)
                worksheet.set_landscape()

                for row_num in range(0, 25):
                    if row_num != 0:
                        worksheet.set_row(row_num, 25.1)

                worksheet.merge_range('A1:C1', court, workbook.add_format({'bold': True, 'align': 'center'}))
                worksheet.merge_range('E1:G1', game_data["Date"].iloc[0], workbook.add_format({'bold': True, 'align': 'center'}))

                final_sort.to_excel(writer, sheet_name=worksheet_name, index=False, startrow=1, startcol=0)

        with open(output_file, 'rb') as f:
            response = HttpResponse(f.read(), content_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
            response['Content-Disposition'] = f'attachment; filename="sorted_{uploaded_file.name}.xlsx"'
            return response

    except Exception as e:
        logger.exception('Error processing the request')
        return JsonResponse({'error': 'Internal Server Error', 'message': str(e)}, status=500)
