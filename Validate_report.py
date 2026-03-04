import json
import pandas as pd
from src.file_loader import validate_workbook

# 1. Run validation
FILE_PATH = 'data/Aura.xlsx'
try:
    ok, results = validate_workbook(FILE_PATH)
    print("--- Validation Report ---")
    print(json.dumps(results, indent=2))
except Exception as e:
    print(f"Error during validation: {e}")
    exit(1)

# 2. Update Excel file (if needed)
# Using 'with' ensures the writer is closed properly in CI
try:
    with pd.ExcelWriter(FILE_PATH, engine="openpyxl", mode="a", if_sheet_exists="replace") as writer:
        # Example: Log the validation timestamp or data to a new sheet
        summary_df = pd.DataFrame([results])
        summary_df.to_excel(writer, sheet_name="ValidationSummary", index=False)
    print(f"Successfully updated {FILE_PATH}")
except Exception as e:
    print(f"Failed to update Excel file: {e}")
