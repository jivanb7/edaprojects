
import numpy as np
import pandas as pd

df_uber = pd.read_csv("csv/kaggle-uber-other-federal.csv")
df_status = df_uber[["Date", "Time", "Status"]]
print(type(df_status))
df_status.head(3)