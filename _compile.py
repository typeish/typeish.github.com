import commands

print 'compiling sass'

print commands.getoutput('compass compile -f --sass-dir _src/ --css-dir . -s compressed --no-line-comments')

print 'compiling coffee'

print commands.getoutput('coffee -o . -c _src/*.coffee')

files = [
    'jquery-1.6.2-min.js',
    'modernizer.custom-2.0.6-min.js',
    'pigeonfarm-min.js',
    'behavior.js',
]

data = ''

for f in files:
    data += file(f).read()

file('all.js','w').write(data)

print 'concatenated'

print commands.getoutput('closure --js_output_file all-min.js --js all.js')