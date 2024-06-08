from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
import pandas as pd
from pathlib import Path
import os
from datetime import datetime

@csrf_exempt
def generate_net_height_file(request):
    if request.method == 'POST' and request.FILES.get('file'):
        uploaded_file = request.FILES['file']
        sorted_file = pd.ExcelFile(uploaded_file)

        def determine_net_height(league):
            if any(i in league for i in ['1st', '2nd', '3rd', '4th']):
                return "6'0\""
            elif '5th' in league:
                return "6'6\""
            elif '6th' in league:
                return "7'0\""
            elif any(i in league for i in ['7th', '8th', '9/10th', '11/12th']):
                return "7'4\""
            else:
                return "7'8\""

        def determine_ball_type(league):
            if any(i in league for i in ['1st', '2nd', '3rd', '4th', '5th']):
                return "VolleyLite"
            else:
                return "Leather"

        locations = ['McKinney', 'Murphy', 'PSA 1']
        date = datetime.now().strftime('%m-%d-%y')

        output_path = os.path.join('/tmp', f'net_height_{date}.xlsx')
        with pd.ExcelWriter(output_path, engine='xlsxwriter') as writer:
            for location in locations:
                for sheet_name in sorted_file.sheet_names:
                    df = sorted_file.parse(sheet_name)
                    df_location = df[df['Venue'].str.contains(location, case=False, na=False, regex=True)]

                    df_location['Net Height'] = df_location['League'].apply(determine_net_height)
                    df_location['Ball Type'] = df_location['League'].apply(determine_ball_type)

                    df_location['Date'] = pd.to_datetime(df_location['Date']).dt.strftime('%m/%d/%Y')
                    df_location['Time'] = pd.to_datetime(df_location['Time'], errors='coerce').dt.strftime('%I:%M %p')

                    df_location = df_location[['Date', 'Time', 'Venue', 'Net Height', 'Ball Type']]
                    df_location = df_location.rename(columns={'Venue': 'Court'})

                    # Sort the DataFrame by Date, Court, and Time to ensure the correct order
                    df_location.sort_values(by=['Date', 'Court', 'Time'], inplace=True)

                    prev_net_height = None
                    prev_court = None
                    prev_date = None
                    rows_to_write = []

                    for index, row in df_location.iterrows():
                        if row['Court'] != prev_court or row['Date'] != prev_date:
                            # Always add the first game of a new court or date
                            rows_to_write.append(row.to_dict())
                            prev_net_height = row['Net Height']
                        elif row['Net Height'] != prev_net_height:
                            rows_to_write.append(row.to_dict())
                            prev_net_height = row['Net Height']

                        prev_court = row['Court']
                        prev_date = row['Date']

                    if rows_to_write:
                        final_df = pd.DataFrame(rows_to_write)
                        final_df.to_excel(writer, sheet_name=location, index=False)

                        workbook = writer.book
                        worksheet = writer.sheets[location]

                        bold_format = workbook.add_format({'bold': True})

                        for col_num, value in enumerate(final_df.columns.values):
                            worksheet.write(0, col_num, value, bold_format)

        with open(output_path, 'rb') as f:
            response = HttpResponse(f.read(), content_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
            response['Content-Disposition'] = f'attachment; filename=net_height_{date}.xlsx'
        
        os.remove(output_path)
        return response

    return HttpResponse(status=400)