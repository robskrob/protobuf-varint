import struct

def encode(n):
    out = []
    while n >0:
        print('n', n)
        part = n % 128
        print('part', part)
        out.append(part)
        n >>= 7
    return bytes(out)

with open('150.uint64', 'rb') as f:
    n = struct.unpack('>Q', f.read())[0]
    print(encode(n))
