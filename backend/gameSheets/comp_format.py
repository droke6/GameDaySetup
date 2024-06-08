def generate_comp_game_sheet(worksheet, home_team, away_team, venue, date, time, writer):
    comp_format = writer.book.add_format({'bold': True, 'font_size': 14, 'align': 'center', 'valign': 'vcenter'})
    comp_format.set_rotation(-90)
    title_format = writer.book.add_format({'bold': True, 'font_size': 14, 'align': 'center', 'valign': 'vcenter'})
    title_format2 = writer.book.add_format(
        {'bold': True, 'font_size': 11, 'border': 1, 'valign': 'vcenter'})
    title_format3 = writer.book.add_format(
        {'bold': True, 'font_size': 11, 'border': 1, 'align': 'center', 'valign': 'vcenter'})
    title_format4 = writer.book.add_format(
        {'bold': True, 'font_size': 11, 'border': 1})
    center_format = writer.book.add_format({'align': 'center'})
    center_border = writer.book.add_format({'align': 'center', 'border': 1, 'valign': 'vcenter'})
    center_bold = writer.book.add_format({'align': 'center', 'bold': True})
    vertical_format = writer.book.add_format({'font_size': 12, 'bold': True, 'align': 'center', 'valign': 'vcenter'})
    vertical_format.set_rotation(90)
    game_vertical_format = writer.book.add_format(
        {'font_size': 12, 'bold': True, 'align': 'center', 'valign': 'vcenter', 'border': 1})
    game_vertical_format.set_rotation(90)
    bg_color_format = writer.book.add_format({'bg_color': '#F2F2F2'})
    border_format = writer.book.add_format({'border': 1})

    worksheet.merge_range('O10:O23', 'COMPETITIVE LEAGUE SCORE SHEETS', comp_format)
    worksheet.merge_range('C1:G1', f'Home Team: {home_team}', title_format)
    worksheet.merge_range('J1:N1', f'Away Team: {away_team}', title_format)
    worksheet.merge_range('A3:A8', f'Court: {venue}', vertical_format)
    worksheet.merge_range('A11:A16', f'Facility: {venue}', vertical_format)
    worksheet.merge_range('A19:A24', f'Time: {time}', vertical_format)
    worksheet.merge_range('A27:A32', f'Date: {date}', vertical_format)
    worksheet.merge_range('B2:B9', 'Game 1', game_vertical_format)
    worksheet.merge_range('B13:B21', 'Game 2', game_vertical_format)
    worksheet.merge_range('B24:B32', 'Game 3', game_vertical_format)
    worksheet.set_column('B:B', 3.86)
    worksheet.set_column('I:I', 2.5)
    worksheet.set_column('C:C', 10.14)
    worksheet.set_column('J:J', 10.14)
    worksheet.set_row(1, 25.1)
    worksheet.set_row(10, 25.1)
    worksheet.set_row(12, 25.1)
    worksheet.set_row(21, 25.1)
    worksheet.set_row(23, 25.1)
    worksheet.set_row(32, 25.1)
    # worksheet.

    serves = ['C2', 'C13', 'C24', 'J2', 'J13', 'J24']
    for serve in serves:
        worksheet.write(serve, 'Serve', title_format2)

    timeouts = ['F2', 'F13', 'F24', 'M2', 'M13', 'M24']
    for cell in timeouts:
        worksheet.write(cell, 'Time Outs', title_format2)

    number_of_timeouts = ['G2', 'G13', 'G24', 'N2', 'N13', 'N24']
    for cell in number_of_timeouts:
        worksheet.write(cell, '1          2', center_border)

    y = ['D2:E2', 'D13:E13', 'D24:E24', 'K2:L2', 'K13:L13', 'K24:L24']
    for cell in y:
        worksheet.merge_range(cell, 'Y          N', center_border)

    starter_sub = ['C3', 'C14', 'C25', 'J3', 'J14', 'J25']
    for cell in starter_sub:
        worksheet.write(cell, 'Starter/Sub', title_format2)

    points = ['D3:G3', 'D14:G14', 'D25:G25', 'K3:N3', 'K14:N14', 'K25:N25']
    for cell in points:
        worksheet.merge_range(cell, 'Points', title_format3)

    home_score = ['H4:I4', 'H15:I15', 'H27:I27']
    for cell in home_score:
        worksheet.merge_range(cell, "Home Score", center_bold)

    away_score = ['H8:I8', 'H19:I19', 'H31:I31']
    for cell in away_score:
        worksheet.merge_range(cell, "Away Score", center_bold)

    total_score = ['H6:I6', 'H10:I10', 'H17:I17', 'H21:I21', 'H29:I29', 'H33:I33']
    for cell in total_score:
        worksheet.merge_range(cell, '__________', center_format)

    libero = ['C10', 'C21', 'C32', 'J10', 'J21', 'J32']
    for cell in libero:
        worksheet.write(cell, 'Libero', title_format2)

    sub_numbers = ['D11:G11', 'J11:N11', 'D22:G22', 'J22:N22', 'D33:G33', 'J33:N33']
    for cell in sub_numbers:
        worksheet.merge_range(cell, 'Sub Numbers ____  ____  ____  ____  ____  ____', title_format4)

    points_input = ['D4:G4', 'D5:G5', 'D6:G6', 'D7:G7', 'D8:G8', 'D9:G9', 'D10:G10',
                    'K4:N4', 'K5:N5', 'K6:N6', 'K7:N7', 'K8:N8', 'K9:N9', 'K10:N10',
                    'D15:G15', 'D16:G16', 'D17:G17', 'D18:G18', 'D19:G19', 'D20:G20', 'D21:G21',
                    'K15:N15', 'K16:N16', 'K17:N17', 'K18:N18', 'K19:N19', 'K20:N20', 'K21:N21',
                    'D26:G26', 'D27:G27', 'D28:G28', 'D29:G29', 'D30:G30', 'D31:G31', 'D32:G32',
                    'K26:N26', 'K27:N27', 'K28:N28', 'K29:N29', 'K30:N30', 'K31:N31', 'K32:N32']
    for cell in points_input:
        worksheet.merge_range(cell, '', border_format)

    players = ['C4', 'C5', 'C6', 'C7', 'C8', 'C9',
               'J4', 'J5', 'J6', 'J7', 'J8', 'J9',
               'C15', 'C16', 'C17', 'C18', 'C19', 'C20',
               'J15', 'J16', 'J17', 'J18', 'J19', 'J20',
               'C26', 'C27', 'C28', 'C29', 'C30', 'C31',
               'J26', 'J27', 'J28', 'J29', 'J30', 'J31', ]
    for cell in players:
        worksheet.write(cell, '', border_format)