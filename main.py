import pdfkit

# Path to the HTML file
import os

# Path to the HTML file
html_file_path = os.path.abspath('pdf_format/index.html')

# Convert HTML file to PDF
pdfkit.from_file(html_file_path, 'output.pdf')
