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
    bg_color_format = writer.book.add_format({'bg_color': '#F2F2F2', 'border': 1, 'valign': 'vcenter', 'align': 'center', 'text_wrap': True, 'bold': True})
    total_score_format = writer.book.add_format({'bg_color': '#F2F2F2', 'bold': True, 'border': 1})
    bold_format = writer.book.add_format({'bold': True})
    center_align = writer.book.add_format({'align': 'center', 'border': 1})

    players = ['B3:B5', 'B19:B21']
    title = "Player #"

    for player in players:
        worksheet.merge_range(player, title, title_format)

    count1 = 1
    count2 = 1

    player_numbers1 = ["B6", "B7", "B8", "B9", "B10", "B11", "B12", "B13", "B14", "B15", "B16", "B17"]
    player_numbers2 = ["B22", "B23", "B24", "B25", "B26", "B27", "B28", "B29", "B30", "B31", "B32", "B33"]
    player_numbers3 = ["G6", "G7", "G8", "G9", "G10", "G11", "G12", "G13", "G14", "G15", "G16", "G17"]
    player_numbers4 = ["K6", "K7", "K8", "K9", "K10", "K11", "K12", "K13", "K14", "K15", "K16", "K17"]
    player_numbers5 = ["G22", "G23", "G24", "G25", "G26", "G27", "G28", "G29", "G30", "G31", "G32", "G33"]
    player_numbers6 = ["K22", "K23", "K24", "K25", "K26", "K27", "K28", "K29", "K30", "K31", "K32", "K33"]

    for player_number in player_numbers1:
        worksheet.write(player_number, count1, number_format)
        count1 += 1

    for player_number in player_numbers2:
        worksheet.write(player_number, count2, number_format)
        count2 += 1
        
    for player_number in player_numbers3:
        worksheet.write(player_number, "#", number_format)
        
    for player_number in player_numbers4:
        worksheet.write(player_number, "#", number_format)
        
    for player_number in player_numbers5:
        worksheet.write(player_number, "#", number_format)
        
    for player_number in player_numbers6:
        worksheet.write(player_number, "#", number_format)

    game1_range = ['C5:E5', 'C21:E21']
    game2_range = ['G5:I5', 'G21:I21']
    game3_range = ['K5:M5', 'K21:M21']

    for game in game1_range:
        worksheet.merge_range(game, "Game 1", title_format)

    for game in game2_range:
        worksheet.merge_range(game, "Game 2", title_format)

    for game in game3_range:
        worksheet.merge_range(game, "Game 3", title_format)

    # blank_cells = ['F3:F17', "J3:J17", "N3:N17", 'F20:F34', 'J20:J34', "N20:N34"]
    #
    # for blank_cell in blank_cells:
    #     worksheet.merge_range(blank_cell, '', bg_color_format)

    scores = ["C6:E6", "C7:E7", "C8:E8", "C9:E9", "C10:E10", "C11:E11", "C12:E12", "C13:E13", "C14:E14",
              "C15:E15", "C16:E16", "C17:E17",
              "H6:I6", "H7:I7", "H8:I8", "H9:I9", "H10:I10", "H11:I11", "H12:I12", "H13:I13", "H14:I14",
              "H15:I15", "H16:I16", "H17:I17",
              "L6:M6", "L7:M7", "L8:M8", "L9:M9", "L10:M10", "L11:M11", "L12:M12", "L13:M13", "L14:M14",
              "L15:M15", "L16:M16", "L17:M17",
              "C22:E22", "C23:E23", "C24:E24", "C25:E25", "C26:E26", "C27:E27", "C28:E28", "C29:E29", "C30:E30",
              "C31:E31", "C32:E32", "C33:E33",
              "H22:I22", "H23:I23", "H24:I24", "H25:I25", "H26:I26", "H27:I27", "H28:I28", "H29:I29", "H30:I30",
              "H31:I31", "H32:I32", "H33:I33",
              "L22:M22", "L23:M23", "L24:M24", "L25:M25", "L26:M26", "L27:M27", "L28:M28", "L29:M29", "L30:M30",
              "L31:M31", "L32:M32", "L33:M33",
              ]
    for score in scores:
        worksheet.merge_range(score, '', border_format)

    # total_scores = ['F10', 'J10']
    # for total_score in total_scores:
    #     worksheet.write(total_score, 'Game 1 Total Score', total_score_format)

    # serves = ['C3', 'C19', 'G3', 'G19', 'K3', 'K19']
    # for serve in serves:
    #     worksheet.write(serve, 'Serve', serve_timeout)

    # time_outs = ['C4', 'C20', 'G4', 'G20', 'K4', 'K20']
    # for time_out in time_outs:
    #     worksheet.write(time_out, 'Time Outs', serve_timeout)

    serves_y_n = ['D3:E3', 'D19:E19', 'G3:I3', 'G19:I19', 'K3:M3', 'K19:M19']
    for cell in serves_y_n:
        worksheet.merge_range(cell, 'Serve        Y          N', center_align)

    one_two = ['D4:E4', 'D20:E20', 'G4:I4', 'G20:I20', 'K4:M4', 'K20:M20']
    for cell in one_two:
        worksheet.merge_range(cell, 'Time Outs        1          2', center_align)

    rows = [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33]
    for row in rows:
        worksheet.set_row(row, 17)
        
    facility_name = venue.split()[-2]   
    court = venue.split()[-1]

    worksheet.merge_range('B1:N1', "CORE - REGULAR SEASON GAME SCORE SHEET", title_format)
    worksheet.merge_range('B2:N2', f"← ← ← Home Team: {home_team}", game_format)
    worksheet.merge_range('B18:N18', f"Away Team: {away_team} → → →", game_format)
    worksheet.merge_range('A2:A7', f"Court: {court}", vertical_format)
    worksheet.merge_range('A10:A16', f"Facility: {facility_name}", vertical_format)
    worksheet.merge_range('A19:A24', f"Time: {time}", vertical_format)
    worksheet.merge_range('A27:A33', f"Date: {date}", vertical_format)
    worksheet.merge_range('F3:F17', "Game 1 Total Score                  ________", bg_color_format)
    worksheet.merge_range('J3:J17', "Game 2 Total Score                  ________", bg_color_format)
    worksheet.merge_range('N3:N17', "Game 3 Total Score                  ________", bg_color_format)
    worksheet.merge_range('F19:F33', "Game 1 Total Score                  ________", bg_color_format)
    worksheet.merge_range('J19:J33', "Game 2 Total Score                  ________", bg_color_format)
    worksheet.merge_range('N19:N33', "Game 3 Total Score                  ________", bg_color_format)
    worksheet.set_column('A:A', 5.3)
    worksheet.set_column('B:B', 10)
    worksheet.set_column('E:E', 11)
    worksheet.set_column('F:F', 8.57)
    worksheet.set_column('G:G', 6)
    worksheet.set_column("I:I", 12)
    worksheet.set_column('K:K', 6)
    worksheet.set_column('J:J', 8.57)
    worksheet.set_column('N:N', 8.57)
    worksheet.set_column('M:M', 12)
    worksheet.set_row(1, 20)
    worksheet.set_row(17, 25)
    worksheet.set_row(18, 20)
    worksheet.set_row(34, 25)
    worksheet.set_margins(0.25, 0.25, 0.25, 0.25)
    worksheet.set_landscape()
