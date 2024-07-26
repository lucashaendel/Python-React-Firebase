def esta_balanceada(cadena):
    stack = []
    pares = {')': '(', ']': '[', '}': '{'}
    
    for char in cadena:
        if char in '({[':
            stack.append(char)
        elif char in ')}]':
            if not stack:
                return False
            top = stack.pop()
            if top != pares[char]:
                return False
    
    return len(stack) == 0

# Ejemplos de uso
print(esta_balanceada("{[()]}"))  # True
print(esta_balanceada("(abc1234)"))  # True
print(esta_balanceada("{[) — (]}"))  # False
print(esta_balanceada("{([ — )]}"))  # False
