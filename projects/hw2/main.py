import numpy as np
import pandas as pd

## NUMBER 1
a = np.arange(100,113) 

# print("shape:", a.shape)
# print("type:", type(a)) 

x1 = 105 < a 
x2 = a <= 110
print(np.logical_and(x1, x2))