import os
import pandas as pd
from io import BytesIO
from xls2xlsx import XLS2XLSX
import xlsxwriter
from django.http import HttpResponse, HttpResponseBadRequest
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def download_sorted_file(request):
    if request.method == 'POST':
        # Get the uploaded file
        uploaded_file = request.FILES.get('file')
        if not uploaded_file:
            return HttpResponseBadRequest("No file uploaded.")

        # Get the dates from the request
        date1 = request.POST.get('date1')
        date2 = request.POST.get('date2')
        date3 = request.POST.get('date3')
        if not (date1 and date2 and date3):
            return HttpResponseBadRequest("Missing date parameters.")
        
        game_dates = [date1, date2, date3]

        # Read the uploaded file into a BytesIO object
        file_content = uploaded_file.read()
        input_file = BytesIO(file_content)

        # Convert the .xls file to .xlsx if necessary
        if uploaded_file.name.endswith('.xls'):
            original = XLS2XLSX(input_file)
            output_xlsx = BytesIO()
            original.to_xlsx(output_xlsx)
            output_xlsx.seek(0)
            input_file = output_xlsx

        # Load the Excel file into a DataFrame
        game_data = pd.read_excel(input_file)

        required_columns = [
            "EventID", "Game Date", "Time", "Venue", "Area",
            "League", "Home Team", "Visit Team"
        ]

        def process_data(data, location):
            # Check for required columns
            for col in required_columns:
                if col not in data.columns:
                    return HttpResponseBadRequest(f"Missing required column: {col}")

            data_dict = {
                "Event ID": data["EventID"].to_list(),
                "Date": pd.to_datetime(data["Game Date"], format='%m/%d/%Y').dt.strftime('%m/%d/%Y'),
                "Time": pd.to_datetime(data["Time"], format='%H:%M:%S').dt.strftime('%I:%M %p'),
                "Venue": data["Venue"].to_list(),
                "Area": data["Area"].to_list(),
                "League": data["League"].to_list(),
                "Home Team": data["Home Team"].to_list(),
                "Away Team": data["Visit Team"].to_list()
            }

            courts = {
                'McKinney': ['PSA - McKinney 2', 'PSA - McKinney 4', 'PSA - McKinney 5', 'PSA - McKinney 6', 'PSA - McKinney 7', 'PSA - McKinney 8'],
                'Murphy': ['PSA - Murphy 4', 'PSA - Murphy 6', 'PSA - Murphy 7', 'PSA - Murphy 8'],
                'Plano': ['PSA 1 - Blue 5 (VB)', 'PSA 1 - Green 2', 'PSA 1 - Green 3', 'PSA 1 - Green 4', 'PSA 1 - Green 5', 'PSA 1 - Red 5']
            }

            df = pd.DataFrame(data_dict)

            dates = game_dates
            filtered_data = df[df['Date'].isin(dates)]
            venues_to_include = courts.get(location, [])
            second_filter = filtered_data[filtered_data['Venue'].isin(venues_to_include)]
            court_sorted_data = second_filter.sort_values(by=['Date', 'Venue'])
            court_sorted_data['Date'] = court_sorted_data['Date'].str.split().str[0]
            final_sort = court_sorted_data.drop(columns=['Event ID', 'Area'])

            return final_sort

        locations = ['McKinney', 'Murphy', 'Plano']

        # Create a BytesIO object to save the Excel file in memory
        output = BytesIO()
        
        with pd.ExcelWriter(output, engine='xlsxwriter') as writer:
            for location in locations:
                sorted_data = process_data(game_data, location)
                if isinstance(sorted_data, HttpResponseBadRequest):
                    return sorted_data
                sorted_data.to_excel(writer, sheet_name=location, index=False)
                worksheet = writer.sheets[location]
                for col_num, value in enumerate(sorted_data.columns.values):
                    worksheet.write(0, col_num, value, writer.book.add_format({'border': 0}))
        
        output.seek(0)

        # Return the generated Excel file as a downloadable response
        response = HttpResponse(output, content_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
        response['Content-Disposition'] = 'attachment; filename="sorted.xlsx"'
        return response

    return HttpResponseBadRequest("Invalid request method.")
