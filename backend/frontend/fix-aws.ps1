$f = "src\pages\Desktop\business\payments\Payments.jsx"
$lines = Get-Content $f
# Lines 63-68 (0-indexed: 62-67) contain the AWS SVG block
$start = 62
$end = 67
$newLines = @(
  '  if (kind === "aws")'
  '    return ('
  '      <span className="h-9 w-9 rounded-xl overflow-hidden flex-shrink-0">'
  '        <img src="/img/aws-color.png" alt="AWS" className="h-full w-full object-cover" />'
  '      </span>'
  '    )'
)
$before = $lines[0..($start-1)]
$after = $lines[($end+1)..($lines.Length-1)]
$result = $before + $newLines + $after
$result | Set-Content $f -Encoding UTF8
