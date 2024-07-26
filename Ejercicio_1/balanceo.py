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





### Explicación:

# 1. **Uso de una pila (`stack`)**:
#    - Utilizamos una pila para mantener un seguimiento de los símbolos de apertura que aún no tienen su correspondiente símbolo de cierre.
#    - Cuando encontramos un símbolo de apertura (`(`, `{`, `[`), lo agregamos a la pila.
#    - Cuando encontramos un símbolo de cierre (`)`, `}`, `]`), verificamos si la pila no está vacía. Si está vacía, significa que no hay un símbolo de apertura correspondiente y la cadena no está balanceada.
#    - También verificamos si el símbolo de cierre coincide con el último símbolo de apertura en la pila utilizando el diccionario `pares`. Si no coinciden, la cadena no está balanceada.

# 2. **Finalización del proceso**:
#    - Al finalizar de recorrer la cadena, si la pila está vacía, significa que todos los símbolos de apertura tienen su correspondiente cierre y están balanceados. En este caso, retornamos `True`.
#    - Si queda algún símbolo en la pila, significa que hay símbolos de apertura sin su cierre correspondiente, por lo tanto, retornamos `False`.

# Esta solución tiene una complejidad de tiempo de O(n), donde n es la longitud de la cadena, ya que recorremos la cadena una vez y realizamos operaciones de tiempo constante en cada iteración.