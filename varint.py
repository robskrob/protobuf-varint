import struct

def encode(n):
    out = []
    while n >0:
        part = n % 128
        n >>= 7
        if n > 0:
            part |= 0x80
        out.append(part)
    return bytes(out)

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
    print('ok')
