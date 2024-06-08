def generate_core_game_sheet(worksheet, home_team, away_team, venue, date, time, writer):

    title_format = writer.book.add_format(
        {'bold': True, 'font_size': 14, 'align': 'center', 'border': 1, 'valign': 'vcenter'})
    game_format = writer.book.add_format(
        {'bold': True, 'font_size': 11, 'align': 'center', 'border': 1, 'valign': 'vcenter'})
    serve_timeout = writer.book.add_format({'bold': True, 'font_size': 11, 'align': 'center', 'border': 1})
    border_format = writer.book.add_format({'border': 1})
    number_format = writer.book.add_format({'border': 1, 'align': 'left'})
    left_right = writer.book.add_format({'left': 1, 'right': 1})
    vertical_format = writer.book.add_format(
        {'font_size': 12, 'bold': True, 'align': 'center', 'valign': 'vcenter'})
    vertical_format.set_rotation(90)
    bg_color_format = writer.book.add_format({'bg_color': '#F2F2F2', 'border': 1})
    total_score_format = writer.book.add_format({'bg_color': '#F2F2F2', 'bold': True, 'border': 1})
    bold_format = writer.book.add_format({'bold': True})
    center_align = writer.book.add_format({'align': 'center', 'border': 1})

    players = ['B3:B5', 'B20:B22']
    title = "Player #"

    for player in players:
        worksheet.merge_range(player, title, title_format)

    count1 = 1
    count2 = 1

    player_numbers1 = ["B6", "B7", "B8", "B9", "B10", "B11", "B12", "B13", "B14", "B15", "B16", "B17"]
    player_numbers2 = ["B23", "B24", "B25", "B26", "B27", "B28", "B29", "B30", "B31", "B32", "B33", "B34"]

    for player_number in player_numbers1:
        worksheet.write(player_number, count1, number_format)
        count1 += 1

    for player_number in player_numbers2:
        worksheet.write(player_number, count2, number_format)
        count2 += 1

    game1_range = ['C5:E5', 'C22:E22']
    game2_range = ['G5:I5', 'G22:I22']
    game3_range = ['K5:M5', 'K22:M22']

    for game in game1_range:
        worksheet.merge_range(game, "Game 1", title_format)

    for game in game2_range:
        worksheet.merge_range(game, "Game 2", title_format)

    for game in game3_range:
        worksheet.merge_range(game, "Game 3", title_format)

    blank_cells = ['F3:F18', "J3:J18", 'F20:F35', 'J20:J35']

    for blank_cell in blank_cells:
        worksheet.merge_range(blank_cell, '', bg_color_format)

    scores = ["C6:E6", "C7:E7", "C8:E8", "C9:E9", "C10:E10", "C11:E11", "C12:E12", "C13:E13", "C14:E14",
              "C15:E15", "C16:E16", "C17:E17", "C18:E18",
              "G6:I6", "G7:I7", "G8:I8", "G9:I9", "G10:I10", "G11:I11", "G12:I12", "G13:I13", "G14:I14",
              "G15:I15", "G16:I16", "G17:I17", "G18:I18",
              "K6:M6", "K7:M7", "K8:M8", "K9:M9", "K10:M10", "K11:M11", "K12:M12", "K13:M13", "K14:M14",
              "K15:M15", "K16:M16", "K17:M17", "K18:M18",
              "C23:E23", "C24:E24", "C25:E25", "C26:E26", "C27:E27", "C28:E28", "C29:E29", "C30:E30",
              "C31:E31",
              "C32:E32", "C33:E33", "C34:E34", "C35:E35",
              "G23:I23", "G24:I24", "G25:I25", "G26:I26", "G27:I27", "G28:I28", "G29:I29", "G30:I30",
              "G31:I31",
              "G32:I32", "G33:I33", "G34:I34", "G35:I35",
              "K23:M23", "K24:M24", "K25:M25", "K26:M26", "K27:M27", "K28:M28", "K29:M29", "K30:M30",
              "K31:M31",
              "K32:M32", "K33:M33", "K34:M34", "K35:M35"
              ]
    for score in scores:
        worksheet.merge_range(score, '', border_format)

    total_scores = ['B18', 'B35']
    for total_score in total_scores:
        worksheet.write(total_score, 'Total Score', total_score_format)

    serves = ['C3', 'C20', 'G3', 'G20', 'K3', 'K20']
    for serve in serves:
        worksheet.write(serve, 'Serve', serve_timeout)

    time_outs = ['C4', 'C21', 'G4', 'G21', 'K4', 'K21']
    for time_out in time_outs:
        worksheet.write(time_out, 'Time Outs', serve_timeout)

    serves_y_n = ['D3:E3', 'D20:E20', 'H3:I3', 'H20:I20', 'L3:M3', 'L20:M20']
    for cell in serves_y_n:
        worksheet.merge_range(cell, 'Y          N', center_align)

    one_two = ['D4:E4', 'D21:E21', 'H4:I4', 'H21:I21', 'L4:M4', 'L21:M21']
    for cell in one_two:
        worksheet.merge_range(cell, '1          2', center_align)

    rows = [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33]
    for row in rows:
        worksheet.set_row(row, 17)

    worksheet.merge_range('B1:M1', "CORE - REGULAR SEASON GAME SCORE SHEET", title_format)
    worksheet.merge_range('B2:M2', f"Home Team: {home_team}", game_format)
    worksheet.merge_range('B19:M19', f"Away Team: {away_team}", game_format)
    worksheet.merge_range('A2:A7', f"Court: {venue}", vertical_format)
    worksheet.merge_range('A10:A16', f"Facility: {venue}", vertical_format)
    worksheet.merge_range('A19:A24', f"Time: {time}", vertical_format)
    worksheet.merge_range('A27:A33', f"Date: {date}", vertical_format)
    worksheet.set_column('A:A', 9)
    worksheet.set_column('B:B', 10)
    worksheet.set_column('E:E', 11)
    worksheet.set_column('F:F', 3)
    worksheet.set_column('J:J', 3)
    worksheet.set_column('M:M', 11)
    worksheet.set_row(1, 31.5)
    worksheet.set_row(17, 25)
    worksheet.set_row(18, 31.5)
    worksheet.set_row(34, 25)
    worksheet.set_margins(0.25, 0.25, 0.25, 0.25)
    worksheet.set_landscape()