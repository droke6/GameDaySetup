from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
import pandas as pd
import xlsxwriter
from datetime import datetime
from .comp_format import generate_comp_game_sheet
from .core_format import generate_core_game_sheet
import os

@csrf_exempt
def generate_game_sheets(request):
    if request.method == 'POST' and request.FILES['file']:
        uploaded_file = request.FILES['file']
        xlsx = pd.ExcelFile(uploaded_file)
        today = datetime.now().strftime('%m.%d')
        output_filename = f'{today}_game_sheets.xlsx'

        with pd.ExcelWriter(output_filename, engine='xlsxwriter') as writer:
            for sheet_name in xlsx.sheet_names:
                data = pd.read_excel(xlsx, sheet_name=sheet_name)

                home_teams = []
                away_teams = []
                leagues = []
                venues = []
                times = []
                dates = []

                for index, row in data.iterrows():
                    league = row['League']
                    home_teams.append(row['Home Team'])
                    away_teams.append(row['Away Team'])
                    venues.append(row['Venue'])
                    leagues.append(row['League'])
                    dates.append(row['Date'])
                    times.append(row['Time'])

                counter = 0
                for i in range(len(home_teams)):
                    home_team = home_teams[counter]
                    away_team = away_teams[counter]
                    league = leagues[counter]
                    venue = venues[counter].split()[-1]
                    date = pd.to_datetime(dates[counter]).strftime('%m/%d')
                    time = times[counter]

                    worksheet = writer.book.add_worksheet(f"{sheet_name}_Sheet_{counter + 1}")

                    counter = (counter + 1) % len(home_teams)

                    if '1st' in league or '2nd' in league or '3rd' in league or '4th' in league or 'Core' in league:
                        generate_core_game_sheet(worksheet, home_team, away_team, venue, date, time, writer)
                    elif 'Competitive' in league or 'Coed' in league or '7th' in league or '8th' in league or '9th' in league or '11th' in league:
                        generate_comp_game_sheet(worksheet, home_team, away_team, venue, date, time, writer)

        with open(output_filename, 'rb') as excel:
            response = HttpResponse(excel.read(), content_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
            response['Content-Disposition'] = f'attachment; filename={output_filename}'
        
        os.remove(output_filename)
        return response

    return HttpResponse(status=400)
