import struct

def encode(n):
    out = []
    while n > 0:
        part = n & 0x7f
        n >>= 7
        part |= (n and 0x80 or 0x00)
        out.append(part)
    return bytes(out)

def decode(varn):
    n = 0
    for b in reversed(varn):
        n <<= 7
        n |= (b & 0x7f)
    return n

if __name__ == '__main__':
    cases = (
        ('1.uint64', b'\x01'),
        ('150.uint64', b'\x96\x01'),
        ('maxint.uint64', b'\xff\xff\xff\xff\xff\xff\xff\xff\xff\x01'),
    )
    for fname, expectation in cases:
        with open(fname, 'rb') as f:
            n = struct.unpack('>Q', f.read())[0]
            assert encode(n) == expectation
            assert decode(encode(n)) == n
    print('ok')
