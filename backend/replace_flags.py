import re

path = r"c:\Users\HP\swift\frontend\src\pages\Desktop\pages\Home.jsx"

with open(path, "r", encoding="utf-8") as f:
    content = f.read()

# Match the entire flag-grid block: from the grid-cols-6 div through its closing
pattern = re.compile(
    r'<div className="grid grid-cols-6 gap-3">\s*'
    r'\{\s*\['
    r'.*?'   # all the flag entries (any chars, non-greedy)
    r'\]\.map\(\(flag, i\) => \('
    r'.*?'
    r'\)\)\}\s*</div>',
    re.DOTALL,
)

replacement = '''<div className="grid grid-cols-6 gap-3">
              {[
                { code: "US", name: "United States" },
                { code: "GB", name: "United Kingdom" },
                { code: "DE", name: "Germany" },
                { code: "CA", name: "Canada" },
                { code: "AU", name: "Australia" },
                { code: "JP", name: "Japan" },
                { code: "NG", name: "Nigeria" },
                { code: "KE", name: "Kenya" },
                { code: "GH", name: "Ghana" },
                { code: "ZA", name: "South Africa" },
                { code: "EG", name: "Egypt" },
                { code: "MA", name: "Morocco" },
                { code: "FR", name: "France" },
                { code: "IT", name: "Italy" },
                { code: "ES", name: "Spain" },
                { code: "NL", name: "Netherlands" },
                { code: "CH", name: "Switzerland" },
                { code: "SE", name: "Sweden" },
                { code: "CN", name: "China" },
                { code: "IN", name: "India" },
                { code: "SG", name: "Singapore" },
                { code: "KR", name: "South Korea" },
                { code: "TH", name: "Thailand" },
                { code: "PH", name: "Philippines" },
                { code: "BR", name: "Brazil" },
                { code: "MX", name: "Mexico" },
                { code: "AR", name: "Argentina" },
                { code: "CL", name: "Chile" },
                { code: "CO", name: "Colombia" },
                { code: "PE", name: "Peru" },
              ].map((country) => (
                <div
                  key={country.code}
                  title={country.name}
                  className="aspect-square rounded-xl flex items-center justify-center transition-transform duration-200 hover:scale-110 overflow-hidden"
                  style={{ background: "#111111", border: "1px solid rgba(255,255,255,0.06)" }}
                >
                  <ReactCountryFlag
                    countryCode={country.code}
                    svg
                    style={{ width: "1.75em", height: "1.75em", borderRadius: "4px" }}
                  />
                </div>
              ))}
            </div>'''

new_content, count = pattern.subn(replacement, content)

if count == 0:
    print("No match found")
else:
    with open(path, "w", encoding="utf-8") as f:
        f.write(new_content)
    print(f"Replaced {count} occurrence(s)")
