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
        logger.info('File uploaded successfully: %s', file_path)

        # Read the uploaded CSV file
        game_data = pd.read_csv(fs.path(file_path))
        logger.info('CSV file read successfully')

        # Define the list of courts
        courts = [
            "PSA - McKinney 1", "PSA - McKinney 2", "PSA - McKinney 3", "PSA - McKinney 4",
            "PSA - McKinney 5", "PSA - McKinney 6", "PSA - McKinney 7", "PSA - McKinney 8",
            "PSA - Murphy 1", "PSA - Murphy 2", "PSA - Murphy 3", "PSA - Murphy 4",
            "PSA - Murphy 5", "PSA - Murphy 6", "PSA - Murphy 7", "PSA - Murphy 8",
            "PSA 1 - Blue 1", "PSA 1 - Blue 2", "PSA 1 - Blue 3", "PSA 1 - Blue 4",
            "PSA 1 - Red 4", "PSA 1 - Red 5", "PSA 1 - Green 1",
            "PSA 2 - Silver 1", "PSA 2 - Silver 2", "PSA 2 - Silver 3", "PSA 2 - Silver 4",
            "PSA 2 - Silver 5", "PSA 2 - Silver 6", "PSA 2 - Silver 7", "PSA 2 - Silver 8"
        ]

        downloads_folder = str(Path.home() / "Downloads")
        output_file = os.path.join(downloads_folder, "game_sheets.xlsx")
        logger.info('Output file path: %s', output_file)

        with pd.ExcelWriter(output_file, engine='xlsxwriter') as writer:
            for court in courts:
                court_data = game_data[game_data['Location'] == court]
                court_data.to_excel(writer, sheet_name=court, index=False)
                logger.info('Sheet created for court: %s', court)

        logger.info('Game sheets created successfully')
        return JsonResponse({'message': 'Game sheets created successfully', 'file_path': output_file})

    except Exception as e:
        logger.error('An error occurred: %s', str(e))
        return JsonResponse({'error': 'An error occurred while processing the file', 'details': str(e)}, status=500)
