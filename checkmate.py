def is_checkmate(board):
    # Find the position of the king
    king_position = find_king(board)

    # Check if the king is in check
    if is_in_check(board, king_position):
        # Check if the king has any legal moves to escape check
        if can_escape_check(board, king_position):
            return False  # King is in check but can escape
        else:
            return True  # King is in checkmate
    else:
        return False  # King is not in check

def find_king(board):
    for i in range(8):
        for j in range(8):
            if board[i][j] == 'K':
                return (i, j)

def is_in_check(board, king_position):
    # Check for attacks from opponent's pieces
    for i in range(8):
        for j in range(8):
            piece = board[i][j]
            if piece.islower():
                if is_valid_move(board, (i, j), king_position):
                    return True
    return False

def can_escape_check(board, king_position):
    # Check if the king can move to any adjacent square safely
    for dx in [-1, 0, 1]:
        for dy in [-1, 0, 1]:
            if dx == 0 and dy == 0:
                continue
            new_x = king_position[0] + dx
            new_y = king_position[1] + dy
            if is_valid_move(board, king_position, (new_x, new_y)) and not is_in_check(board, (new_x, new_y)):
                return True
    return False

def is_valid_move(board, start_pos, end_pos):
    # Check if the move is within the board bounds
    if not is_valid_position(start_pos) or not is_valid_position(end_pos):
        return False

    start_x, start_y = start_pos
    end_x, end_y = end_pos

    # Check if the start position contains the king
    if board[start_x][start_y] != 'K':
        return False

    # Check if the end position is empty or contains an opponent's piece
    if board[end_x][end_y] == '-' or board[end_x][end_y].islower():
        return True

    return False

def is_valid_position(position):
    x, y = position
    return 0 <= x < 8 and 0 <= y < 8

# Test the code
board = [
    ['-', '-', '-', '-', '-', '-', '-', '-'],
    ['-', '-', '-', '-', '-', '-', '-', '-'],
    ['-', '-', '-', '-', '-', '-', '-', '-'],
    ['-', '-', '-', '-', '-', '-', '-', '-'],
    ['-', '-', '-', '-', 'K', '-', '-', '-'],
    ['-', '-', '-', '-', '-', '-', '-', '-'],
    ['-', '-', '-', '-', '-', '-', '-', '-'],
    ['-', '-', '-', '-', '-', '-', '-', '-'],
]

if is_checkmate(board):
    print("The king is in checkmate!")
else:
    print("The king is not in checkmate.")

