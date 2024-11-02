import streamlit as st
import pandas as pd

# Sample data for execution times
data = {
    "Test Scenario": ["Single Write", "Concurrent Write", "High Concurrency (10 Reads)"],
    "MySQL Execution Time (s)": [0.0390, 0.0450, 0.0650],
    "MongoDB Execution Time (s)": [0.3027, 0.2901, 0.5502]
}

# Create a DataFrame
df = pd.DataFrame(data)

# Display the DataFrame in the Streamlit app
st.title("Database Concurrency Performance Comparison")
st.subheader("Execution Times for MySQL and MongoDB")
st.dataframe(df)

# Plot using Streamlit's built-in charting tools
st.subheader("Performance Comparison Chart")
st.bar_chart(df.set_index("Test Scenario"))

# Display observations and insights
st.write("""
## Observations:
- **Single Write**: MySQL was faster with an execution time of 0.039 seconds compared to MongoDB's 0.303 seconds.
- **Concurrent Write**: MySQL was slightly faster than MongoDB.
- **High Concurrency (10 Reads)**: Performance dropped for both databases, with MongoDB showing a more significant impact.
""")
